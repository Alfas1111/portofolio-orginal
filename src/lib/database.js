/**
 * Supabase Database Service
 * Handles all CRUD operations for portfolio content with proper auth checks.
 */
import { supabase, isSupabaseConfigured } from './supabase';

// ============================================================
// Portfolio Content CRUD
// ============================================================

/**
 * Fetch all published portfolio content (for public site).
 * Returns an object keyed by section name.
 */
export const fetchPublishedContent = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('portfolio_content')
      .select('section, content, updated_at')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching published content:', error);
      return null;
    }

    // Convert array to object keyed by section
    const contentMap = {};
    data?.forEach((row) => {
      contentMap[row.section] = row.content;
    });
    return contentMap;
  } catch (err) {
    console.error('Network or fetch error loading published content:', err);
    return null;
  }
};

/**
 * Fetch a single published section (fast refresh for specific components like certificates).
 */
export const fetchPublishedSection = async (section) => {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('portfolio_content')
      .select('content, updated_at')
      .eq('section', section)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching section "${section}":`, error);
      return null;
    }

    return data?.content || null;
  } catch (err) {
    console.error(`Network error fetching section "${section}":`, err);
    return null;
  }
};

/**
 * Fetch ALL portfolio content (for admin dashboard — includes drafts).
 */
export const fetchAllContent = async () => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('portfolio_content')
    .select('*')
    .order('section');

  if (error) {
    console.error('Error fetching all content:', error);
    throw error;
  }

  return data;
};

/**
 * Fetch a single section's content.
 */
export const fetchSectionContent = async (section) => {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('section', section)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching section "${section}":`, error);
    throw error;
  }

  return data;
};

// Admin authentication passcode hash (matches owner configuration)
const ADMIN_SECURITY_PASSCODE = '715d53d9f796a320a3a1033949bc92163940f21f3571dd305bab165f5ea6f4ff';

/**
 * Realtime cross-device subscription for live portfolio updates.
 * When changes are saved on one device, all other open devices receive the updates in real-time.
 */
export const subscribeToLiveContentUpdates = (onUpdate) => {
  if (!isSupabaseConfigured || !supabase) return () => {};

  const channelId = `live_sync_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const channel = supabase
    .channel(channelId)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'portfolio_content'
      },
      (payload) => {
        console.log('⚡ [Live Sync] Postgres change received:', payload);
        if (onUpdate) {
          onUpdate(payload);
        }
      }
    )
    .subscribe((status) => {
      console.log('⚡ [Live Sync] Connection status:', status);
    });

  return () => {
    try {
      supabase.removeChannel(channel);
    } catch (e) {}
  };
};

/**
 * Upsert (save/update) a section's content.
 * Uses RPC save_portfolio_content when available, with standard upsert fallback.
 */
export const saveSectionContent = async (section, content, isPublished = true) => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  // 1. Try secure RPC function (runs seamlessly with auth or passcode)
  try {
    const { data: rpcData, error: rpcError } = await supabase.rpc('save_portfolio_content', {
      p_section: section,
      p_content: content,
      p_is_published: isPublished,
      p_admin_passcode: ADMIN_SECURITY_PASSCODE
    });

    if (!rpcError && rpcData) {
      return rpcData;
    }
  } catch (rpcErr) {
    // Continue to standard upsert if RPC is not installed yet
  }

  // 2. Fall back to standard session-based upsert
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated in Supabase. Run the SQL setup in Supabase SQL editor to enable instant cloud sync.');

  const { data, error } = await supabase
    .from('portfolio_content')
    .upsert(
      {
        section,
        content,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
        updated_by: user.id
      },
      { onConflict: 'section' }
    )
    .select()
    .single();

  if (error) {
    console.error(`Error saving section "${section}":`, error);
    throw error;
  }

  return data;
};

/**
 * Update published status of a section.
 */
export const togglePublishStatus = async (section, isPublished) => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured');

  // 1. Try RPC save
  try {
    const current = await fetchSectionContent(section);
    if (current && current.content) {
      const res = await saveSectionContent(section, current.content, isPublished);
      if (res) return res;
    }
  } catch (e) {}

  // 2. Direct session update
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('portfolio_content')
    .update({
      is_published: isPublished,
      updated_at: new Date().toISOString(),
      updated_by: user.id
    })
    .eq('section', section)
    .select()
    .single();

  if (error) {
    console.error(`Error toggling publish for "${section}":`, error);
    throw error;
  }

  return data;
};

/**
 * Delete a section's content.
 */
export const deleteSectionContent = async (section) => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('portfolio_content')
    .delete()
    .eq('section', section);

  if (error) {
    console.error(`Error deleting section "${section}":`, error);
    throw error;
  }
};

// ============================================================
// File Uploads (Supabase Storage)
// ============================================================

/**
 * Upload a file to Supabase storage.
 */
export const uploadFile = async (file, bucket = 'portfolio-assets', folder = '') => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const fileExt = file.name.split('.').pop();
  const fileName = `${folder ? folder + '/' : ''}${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    path: data.path,
    publicUrl: urlData.publicUrl,
    fileName: file.name
  };
};

/**
 * Delete a file from Supabase storage.
 */
export const deleteFile = async (filePath, bucket = 'portfolio-assets') => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured');

  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    console.error('Delete file error:', error);
    throw error;
  }
};

// ============================================================
// Seed initial data (admin only, one-time)
// ============================================================

/**
 * Seed the database with initial portfolio data from initialData.js.
 * Only works if the portfolio_content table is empty.
 */
export const seedInitialData = async (initialData) => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured');

  // 1. Try secure RPC function (can seed directly even before auth is finalized)
  try {
    const { data: rpcData, error: rpcError } = await supabase.rpc('seed_portfolio_data', {
      p_sections: initialData,
      p_admin_passcode: ADMIN_SECURITY_PASSCODE
    });

    if (!rpcError && rpcData) {
      return { seeded: true, message: `Successfully seeded ${rpcData.count || 'all'} sections to database via cloud RPC.` };
    }
  } catch (rpcErr) {}

  // 2. Fall back to saving each section using saveSectionContent (RPC + session fallback)
  const sections = [
    { section: 'personal', content: initialData.personal },
    { section: 'stats', content: initialData.stats },
    { section: 'skills', content: initialData.skills },
    { section: 'projects', content: initialData.projects },
    { section: 'education', content: initialData.education },
    { section: 'experience', content: initialData.experience },
    { section: 'internships', content: initialData.internships },
    { section: 'certifications', content: initialData.certifications },
    { section: 'achievements', content: initialData.achievements },
    { section: 'startupIdeas', content: initialData.startupIdeas },
    { section: 'services', content: initialData.services },
    { section: 'blog', content: initialData.blog },
    { section: 'gallery', content: initialData.gallery },
    { section: 'social', content: initialData.social },
    { section: 'ctaSection', content: initialData.ctaSection }
  ];

  let successCount = 0;
  for (const s of sections) {
    try {
      await saveSectionContent(s.section, s.content, true);
      successCount++;
    } catch (err) {
      console.warn(`Could not seed section ${s.section}:`, err);
    }
  }

  return { seeded: true, message: `Successfully seeded/synced ${successCount} sections to Supabase cloud.` };
};
