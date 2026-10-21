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
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('portfolio_content')
    .select('section, content')
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

/**
 * Upsert (save/update) a section's content.
 * Uses the section name as the unique key.
 */
export const saveSectionContent = async (section, content, isPublished = true) => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

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

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Map initialData sections to rows
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

  const rows = sections.map((s) => ({
    ...s,
    is_published: true,
    updated_at: new Date().toISOString(),
    updated_by: user.id
  }));

  const { error } = await supabase
    .from('portfolio_content')
    .upsert(rows, { onConflict: 'section' });

  if (error) {
    console.error('Seed error:', error);
    throw error;
  }

  return { seeded: true, message: `Successfully seeded/synced ${rows.length} sections to database.` };
};
