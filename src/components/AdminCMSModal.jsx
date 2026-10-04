import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { compressAndReadFile } from '../utils/fileHelpers';
import {
  X, Save, RotateCcw, Download, Upload, User, Code, FolderGit2, GraduationCap, Award, Rocket, FileText, Image as ImageIcon, Share2, Mail, Plus, Trash2, Edit2, Layout, BookOpen, Briefcase, Instagram, ExternalLink, Eye, Check, FileCheck, AlertCircle
} from 'lucide-react';

export const AdminCMSModal = () => {
  const {
    data,
    updateData,
    resetData,
    exportJSON,
    importJSON,
    isAdminOpen,
    setIsAdminOpen,
    adminActiveTab,
    setAdminActiveTab
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState(adminActiveTab || 'personal');
  const [formData, setFormData] = useState(data);

  // Sync state and active tab when opening
  React.useEffect(() => {
    if (isAdminOpen) {
      setFormData(data);
      if (adminActiveTab) {
        setActiveTab(adminActiveTab);
      }
    }
  }, [isAdminOpen, data, adminActiveTab]);

  if (!isAdminOpen) return null;

  const handleSaveAll = () => {
    updateData(formData);
    alert('Portfolio content updated live and saved to local storage!');
    setIsAdminOpen(false);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          importJSON(event.target.result);
          setIsAdminOpen(false);
        }
      };
      reader.readAsText(file);
    }
  };

  // Helper updaters
  const updatePersonal = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const updateStats = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: val }
    }));
  };

  const updateCTA = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      ctaSection: { ...prev.ctaSection, [field]: val }
    }));
  };

  const updateSocial = (field, val) => {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [field]: val }
    }));
  };

  // Skills handlers
  const handleUpdateSkill = (category, index, key, val) => {
    setFormData((prev) => {
      const updatedCat = [...(prev.skills[category] || [])];
      updatedCat[index] = { ...updatedCat[index], [key]: val };
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: updatedCat
        }
      };
    });
  };

  const handleAddSkill = (category) => {
    setFormData((prev) => {
      const updatedCat = [...(prev.skills[category] || []), { name: 'New Skill', level: 'Proficient', badge: 'Core Skill' }];
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: updatedCat
        }
      };
    });
  };

  const handleDeleteSkill = (category, index) => {
    setFormData((prev) => {
      const updatedCat = (prev.skills[category] || []).filter((_, i) => i !== index);
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: updatedCat
        }
      };
    });
  };

  // Projects handlers
  const handleAddProject = () => {
    const newProj = {
      id: 'p_' + Date.now(),
      title: 'New Software Project',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      shortDescription: 'Short project summary goes here.',
      fullDescription: 'Detailed features and technical architecture explanation.',
      technologies: ['React', 'JavaScript', 'CSS'],
      github: 'https://github.com',
      demo: 'https://example.com',
      date: '2024'
    };
    setFormData((prev) => ({
      ...prev,
      projects: [newProj, ...(prev.projects || [])]
    }));
  };

  const handleDeleteProject = (id) => {
    setFormData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((p) => p.id !== id)
    }));
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu = {
      id: 'e_' + Date.now(),
      degree: 'Degree / Certificate',
      institution: 'College / Institute Name',
      university: 'University Name',
      years: '2023 – Present',
      grade: 'CGPA: 9.0 / 10.0',
      subjects: 'Data Structures, OOP, Web Architecture',
      achievements: 'Department Ranker'
    };
    setFormData((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }));
  };

  const handleDeleteEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: (prev.education || []).filter((e) => e.id !== id)
    }));
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp = {
      id: 'ex_' + Date.now(),
      position: 'Software Developer',
      organization: 'Tech Innovators / Company',
      duration: '2024 – Present',
      description: 'Built scalable web applications and integrated modern APIs.',
      technologies: ['React', 'JavaScript', 'Node.js', 'Git'],
      achievements: 'Improved application performance and developer workflow.'
    };
    setFormData((prev) => ({
      ...prev,
      experience: [newExp, ...(prev.experience || [])]
    }));
  };

  const handleDeleteExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: (prev.experience || []).filter((e) => e.id !== id)
    }));
  };

  // Internships handlers
  const handleAddInternship = () => {
    const newInternship = {
      id: 'in_' + Date.now(),
      role: 'Software Engineering Intern',
      company: 'Tech Solutions Inc.',
      location: 'Remote / Hybrid',
      duration: 'Jun 2024 – Aug 2024',
      type: 'Full-Time Internship',
      stipend: 'Paid Internship',
      description: 'Developed scalable web applications and integrated REST APIs.',
      responsibilities: [
        'Built responsive frontend components using React and Tailwind CSS.',
        'Collaborated with senior engineers on backend optimization and code reviews.'
      ],
      technologies: ['React', 'JavaScript', 'Node.js', 'Git'],
      certificateLink: '',
      status: 'Completed'
    };
    setFormData((prev) => ({
      ...prev,
      internships: [newInternship, ...(prev.internships || [])]
    }));
  };

  const handleDeleteInternship = (id) => {
    setFormData((prev) => ({
      ...prev,
      internships: (prev.internships || []).filter((i) => i.id !== id)
    }));
  };

  // Certifications handlers
  const handleAddCert = () => {
    const newCert = {
      id: 'c_' + Date.now(),
      name: 'Certification Name',
      organization: 'Issuing Organization',
      date: '2024',
      credentialId: 'CERT-' + Math.floor(10000 + Math.random() * 90000),
      image: '',
      fileName: '',
      verifyLink: ''
    };
    setFormData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
  };

  const handleDeleteCert = (id) => {
    setFormData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((c) => c.id !== id)
    }));
  };

  // Generic File Upload Handlers with compression
  const handleCertFileUpload = async (certId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await compressAndReadFile(file);
      setFormData((prev) => ({
        ...prev,
        certifications: (prev.certifications || []).map((item) =>
          item.id === certId
            ? { ...item, image: res.dataUrl, fileName: res.fileName, fileType: res.fileType }
            : item
        )
      }));
    } catch (err) {
      alert(err.message || 'Failed to upload certificate file.');
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await compressAndReadFile(file);
      updatePersonal('profileImage', res.dataUrl);
    } catch (err) {
      alert(err.message || 'Failed to upload profile image.');
    }
  };

  const handleProjectImageUpload = async (projId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await compressAndReadFile(file);
      setFormData((prev) => ({
        ...prev,
        projects: (prev.projects || []).map((p) =>
          p.id === projId ? { ...p, image: res.dataUrl } : p
        )
      }));
    } catch (err) {
      alert(err.message || 'Failed to upload project image.');
    }
  };

  const handleGalleryPhotoUpload = async (photoId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await compressAndReadFile(file);
      setFormData((prev) => ({
        ...prev,
        gallery: (prev.gallery || []).map((g) =>
          g.id === photoId ? { ...g, url: res.dataUrl } : g
        )
      }));
    } catch (err) {
      alert(err.message || 'Failed to upload photo.');
    }
  };

  const handleResumeFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await compressAndReadFile(file);
      setFormData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          resumeUrl: res.dataUrl,
          resumeFileName: res.fileName || prev.personal.resumeFileName
        }
      }));
    } catch (err) {
      alert(err.message || 'Failed to upload resume file.');
    }
  };

  // Achievements handlers
  const handleAddAchievement = () => {
    const newAch = {
      id: 'a_' + Date.now(),
      title: 'Achievement / Award Title',
      category: 'Hackathon',
      description: 'Summary of the award or competition outcome.',
      date: '2024'
    };
    setFormData((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAch]
    }));
  };

  const handleDeleteAchievement = (id) => {
    setFormData((prev) => ({
      ...prev,
      achievements: (prev.achievements || []).filter((a) => a.id !== id)
    }));
  };

  // Ideas handlers
  const handleAddIdea = () => {
    const newIdea = {
      id: 'i_' + Date.now(),
      name: 'New Startup Venture Concept',
      problem: 'Core problem faced by users or market.',
      solution: 'Innovative tech solution proposed.',
      concept: 'Elevator pitch statement.',
      currentStage: 'Prototyping',
      futureVision: 'Scale vision for 3 years.'
    };
    setFormData((prev) => ({
      ...prev,
      startupIdeas: [...(prev.startupIdeas || []), newIdea]
    }));
  };

  const handleDeleteIdea = (id) => {
    setFormData((prev) => ({
      ...prev,
      startupIdeas: (prev.startupIdeas || []).filter((i) => i.id !== id)
    }));
  };

  // Services handlers
  const handleAddService = () => {
    const newServ = {
      id: 's_' + Date.now(),
      title: 'New Technical Service',
      description: 'Service description and deliverables provided.'
    };
    setFormData((prev) => ({
      ...prev,
      services: [...(prev.services || []), newServ]
    }));
  };

  const handleDeleteService = (id) => {
    setFormData((prev) => ({
      ...prev,
      services: (prev.services || []).filter((s) => s.id !== id)
    }));
  };

  // Blog handlers
  const handleAddBlog = () => {
    const newBlog = {
      id: 'b_' + Date.now(),
      title: 'New Technical Article Title',
      date: 'Aug 2024',
      readTime: '4 min read',
      summary: 'Short article summary for preview.',
      content: 'Full article body text goes here...'
    };
    setFormData((prev) => ({
      ...prev,
      blog: [...(prev.blog || []), newBlog]
    }));
  };

  const handleDeleteBlog = (id) => {
    setFormData((prev) => ({
      ...prev,
      blog: (prev.blog || []).filter((b) => b.id !== id)
    }));
  };

  // Gallery handlers
  const handleAddGalleryPhoto = () => {
    const newPhoto = {
      id: 'g_' + Date.now(),
      title: 'New Gallery Snapshot',
      category: 'Tech Events',
      caption: 'Photo description caption.',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
    };
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), newPhoto]
    }));
  };

  const handleDeleteGalleryPhoto = (id) => {
    setFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((g) => g.id !== id)
    }));
  };

  const tabs = [
    { id: 'personal', name: 'Personal & Hero', icon: User },
    { id: 'stats', name: 'Metrics / Stats', icon: Award },
    { id: 'skills', name: 'Skills Stack', icon: Code },
    { id: 'projects', name: 'Projects', icon: FolderGit2 },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'internships', name: 'Internships', icon: Briefcase },
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'ideas', name: 'Startup Ideas', icon: Rocket },
    { id: 'services', name: 'Services', icon: Layout },
    { id: 'blog', name: 'Blog', icon: BookOpen },
    { id: 'gallery', name: 'Gallery & Photos', icon: ImageIcon },
    { id: 'social', name: 'Social & Resume', icon: Share2 },
    { id: 'cta', name: 'Startup CTA', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0A0A0A] text-white border-4 border-yellow-400 w-full max-w-6xl h-[92vh] shadow-[6px_6px_0px_#000] sm:shadow-[20px_20px_0px_#000] flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Header */}
        <div className="p-3 sm:p-4 bg-yellow-400 text-black border-b-4 border-black flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="bg-black text-yellow-400 p-1 sm:p-1.5 font-mono font-bold text-xs shrink-0">
              CMS
            </span>
            <h3 className="font-display text-sm sm:text-2xl font-extrabold uppercase truncate">
              PORTFOLIO CONTENT MANAGER
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportJSON}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-white hover:text-black font-mono text-xs font-bold border border-black"
              title="Export Portfolio Backup JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT JSON</span>
            </button>

            <label className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-white hover:text-black font-mono text-xs font-bold border border-black cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>IMPORT JSON</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>

            <button
              onClick={resetData}
              className="p-1.5 bg-red-600 text-white hover:bg-black font-mono text-xs font-bold border border-black"
              title="Reset Content to Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 bg-black text-yellow-400 hover:bg-white hover:text-black border border-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Selector Nav */}
        <div className="bg-zinc-900 border-b border-zinc-800 p-2 flex overflow-x-auto gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 font-mono text-xs font-bold uppercase whitespace-nowrap flex items-center gap-2 border transition-all ${
                  isActive
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-[2px_2px_0px_#FFF]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: PERSONAL & HERO */}
          {activeTab === 'personal' && (
            <div className="space-y-4 max-w-4xl">
              <h4 className="font-heading text-lg font-bold text-yellow-400 border-b border-zinc-800 pb-2">
                PERSONAL IDENTITY & HERO SECTION
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">FULL NAME</label>
                  <input
                    type="text"
                    value={formData.personal?.name || ''}
                    onChange={(e) => updatePersonal('name', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">TAGLINE / ROLES</label>
                  <input
                    type="text"
                    value={formData.personal?.tagline || ''}
                    onChange={(e) => updatePersonal('tagline', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="font-mono text-xs">
                <label className="text-zinc-400 block mb-1">HERO MAIN HEADLINE</label>
                <input
                  type="text"
                  value={formData.personal?.headline || ''}
                  onChange={(e) => updatePersonal('headline', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400 font-bold"
                />
              </div>

              <div className="font-mono text-xs">
                <label className="text-zinc-400 block mb-1">HERO SHORT INTRO</label>
                <textarea
                  rows="2"
                  value={formData.personal?.shortIntro || ''}
                  onChange={(e) => updatePersonal('shortIntro', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                ></textarea>
              </div>

              <div className="font-mono text-xs">
                <label className="text-zinc-400 block mb-1">PROFILE / HERO PHOTO</label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="w-16 h-16 rounded border-2 border-yellow-400 overflow-hidden bg-black shrink-0">
                    {formData.personal?.profileImage ? (
                      <img src={formData.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-[10px]">NO PIC</div>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      placeholder="Paste Image URL..."
                      value={formData.personal?.profileImage || ''}
                      onChange={(e) => updatePersonal('profileImage', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 outline-none focus:border-yellow-400"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-black hover:bg-white font-mono text-xs font-bold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>UPLOAD NEW PHOTO FROM DEVICE</span>
                      <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">DEGREE / PROGRAM</label>
                  <input
                    type="text"
                    value={formData.personal?.degree || ''}
                    onChange={(e) => updatePersonal('degree', e.target.value)}
                    placeholder="e.g. Bachelor of Computer Applications (BCA)"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={formData.personal?.location || ''}
                    onChange={(e) => updatePersonal('location', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">COLLEGE / SCHOOL</label>
                  <input
                    type="text"
                    value={formData.personal?.college || ''}
                    onChange={(e) => updatePersonal('college', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">UNIVERSITY</label>
                  <input
                    type="text"
                    value={formData.personal?.university || ''}
                    onChange={(e) => updatePersonal('university', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="font-mono text-xs">
                <label className="text-zinc-400 block mb-1">CAREER GOAL</label>
                <input
                  type="text"
                  value={formData.personal?.careerGoal || ''}
                  onChange={(e) => updatePersonal('careerGoal', e.target.value)}
                  placeholder="e.g. To build impactful software products and launch a tech startup."
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div className="font-mono text-xs">
                <label className="text-zinc-400 block mb-1">PERSONAL QUOTE / INTRO LINE</label>
                <input
                  type="text"
                  value={formData.personal?.personalIntro || ''}
                  onChange={(e) => updatePersonal('personalIntro', e.target.value)}
                  placeholder="e.g. Technology is more than my field of study — it's my creative playground."
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div className="font-mono text-xs">
                <label className="text-zinc-400 block mb-1">KEY INTERESTS & PASSIONS (Comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.personal?.interests) ? formData.personal.interests.join(', ') : (formData.personal?.interests || '')}
                  onChange={(e) => {
                    const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    updatePersonal('interests', list);
                  }}
                  placeholder="Full-Stack Engineering, Cloud Computing, SaaS Architecture, AI Integration"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div className="font-mono text-xs">
                <label className="text-zinc-400 block mb-1">DETAILED ABOUT BIO</label>
                <textarea
                  rows="4"
                  value={formData.personal?.aboutBio || ''}
                  onChange={(e) => updatePersonal('aboutBio', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                ></textarea>
              </div>
            </div>
          )}

          {/* TAB 2: METRICS / STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-4 max-w-2xl font-mono text-xs">
              <h4 className="font-heading text-lg font-bold text-yellow-400 border-b border-zinc-800 pb-2">
                EDITABLE PORTFOLIO NUMBERS & COUNTERS
              </h4>

              <div>
                <label className="text-zinc-400 block mb-1">YEARS LEARNING VALUE (e.g. 02+)</label>
                <input
                  type="text"
                  value={formData.stats?.learningYears || ''}
                  onChange={(e) => updateStats('learningYears', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">PROJECTS COUNT (e.g. 10+)</label>
                <input
                  type="text"
                  value={formData.stats?.projectsCount || ''}
                  onChange={(e) => updateStats('projectsCount', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">CERTIFICATIONS COUNT (e.g. 05+)</label>
                <input
                  type="text"
                  value={formData.stats?.certsCount || ''}
                  onChange={(e) => updateStats('certsCount', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">IDEAS COUNT (e.g. ∞)</label>
                <input
                  type="text"
                  value={formData.stats?.ideasCount || ''}
                  onChange={(e) => updateStats('ideasCount', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS STACK */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h4 className="font-heading text-lg font-bold text-yellow-400 border-b border-zinc-800 pb-2">
                EDIT SKILLS & TECHNOLOGIES BY CATEGORY
              </h4>

              {Object.entries(formData.skills || {}).map(([category, skillList]) => (
                <div key={category} className="bg-zinc-900 border-2 border-zinc-800 p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h5 className="font-heading text-base font-bold text-yellow-400 uppercase">
                      CATEGORY: {category} ({skillList.length})
                    </h5>
                    <button
                      onClick={() => handleAddSkill(category)}
                      className="px-3 py-1 bg-yellow-400 text-black font-mono text-xs font-bold hover:bg-white flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD SKILL</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skillList.map((sk, skIdx) => (
                      <div key={skIdx} className="bg-black border border-zinc-700 p-3 space-y-2 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400 font-bold">SKILL #{skIdx + 1}</span>
                          <button
                            onClick={() => handleDeleteSkill(category, skIdx)}
                            className="text-red-400 hover:text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <label className="text-zinc-500 block mb-0.5">NAME</label>
                          <input
                            type="text"
                            value={sk.name}
                            onChange={(e) => handleUpdateSkill(category, skIdx, 'name', e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-1.5"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-zinc-500 block mb-0.5">LEVEL</label>
                            <select
                              value={sk.level}
                              onChange={(e) => handleUpdateSkill(category, skIdx, 'level', e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-700 text-white p-1.5"
                            >
                              <option value="Expert">Expert</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Proficient">Proficient</option>
                              <option value="Intermediate">Intermediate</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-zinc-500 block mb-0.5">BADGE / FOCUS</label>
                            <input
                              type="text"
                              value={sk.badge || ''}
                              onChange={(e) => handleUpdateSkill(category, skIdx, 'badge', e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-700 text-white p-1.5"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE PROJECTS SHOWCASE ({formData.projects?.length || 0})
                </h4>
                <button
                  onClick={handleAddProject}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW PROJECT</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.projects?.map((proj, pIdx) => (
                  <div
                    key={proj.id || pIdx}
                    className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3 relative font-mono text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">
                        PROJECT #{pIdx + 1}: {proj.title}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-red-400 hover:text-white p-1"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="text-zinc-400 block mb-1">TITLE</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, title: val } : p
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">CATEGORY</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, category: val } : p
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">PROJECT COVER IMAGE</label>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="w-20 h-14 bg-black border border-zinc-700 overflow-hidden shrink-0 flex items-center justify-center">
                          {proj.image ? (
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-zinc-600">NO IMAGE</span>
                          )}
                        </div>
                        <div className="flex-1 w-full space-y-1.5">
                          <input
                            type="text"
                            placeholder="Image URL..."
                            value={proj.image || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                projects: prev.projects.map((p) =>
                                  p.id === proj.id ? { ...p, image: val } : p
                                )
                              }));
                            }}
                            className="w-full bg-black border border-zinc-700 text-white p-2"
                          />
                          <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black hover:bg-white font-mono text-[11px] font-bold cursor-pointer transition-colors">
                            <Upload className="w-3 h-3" />
                            <span>UPLOAD PROJECT SCREENSHOT</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProjectImageUpload(proj.id, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">YEAR / DATE (e.g. 2024)</label>
                        <input
                          type="text"
                          value={proj.date || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, date: val } : p
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">TECH STACK (Comma-separated)</label>
                        <input
                          type="text"
                          placeholder="React, Node.js, Tailwind CSS"
                          value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || '')}
                          onChange={(e) => {
                            const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setFormData((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, technologies: list } : p
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">SHORT DESCRIPTION (CARD PREVIEW)</label>
                      <textarea
                        rows="2"
                        value={proj.shortDescription || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p) =>
                              p.id === proj.id ? { ...p, shortDescription: val } : p
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">FULL PROJECT DESCRIPTION & ARCHITECTURE</label>
                      <textarea
                        rows="3"
                        placeholder="Detailed features, architecture, and background of the project..."
                        value={proj.fullDescription || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p) =>
                              p.id === proj.id ? { ...p, fullDescription: val } : p
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">GITHUB LINK</label>
                        <input
                          type="text"
                          value={proj.github || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, github: val } : p
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">LIVE DEMO LINK</label>
                        <input
                          type="text"
                          value={proj.demo || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, demo: val } : p
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE EDUCATION TIMELINE ({formData.education?.length || 0})
                </h4>
                <button
                  onClick={handleAddEducation}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD EDUCATION</span>
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {formData.education?.map((edu, eIdx) => (
                  <div key={edu.id || eIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold">{edu.degree}</span>
                      <button onClick={() => handleDeleteEducation(edu.id)} className="text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">DEGREE TITLE</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              education: prev.education.map((item) => item.id === edu.id ? { ...item, degree: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">GRADE / CGPA</label>
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              education: prev.education.map((item) => item.id === edu.id ? { ...item, grade: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">INSTITUTION</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              education: prev.education.map((item) => item.id === edu.id ? { ...item, institution: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">UNIVERSITY / BOARD</label>
                        <input
                          type="text"
                          value={edu.university || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              education: prev.education.map((item) => item.id === edu.id ? { ...item, university: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">YEARS (e.g. 2023 – Present)</label>
                      <input
                        type="text"
                        value={edu.years}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) => item.id === edu.id ? { ...item, years: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">KEY SUBJECTS & COURSEWORK</label>
                      <textarea
                        rows="2"
                        value={edu.subjects || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) => item.id === edu.id ? { ...item, subjects: val } : item)
                          }));
                        }}
                        placeholder="Data Structures, Java OOP, DBMS, Web Development..."
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">ACADEMIC ACHIEVEMENTS / HONORS</label>
                      <input
                        type="text"
                        value={edu.achievements || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) => item.id === edu.id ? { ...item, achievements: val } : item)
                          }));
                        }}
                        placeholder="e.g. Department Rank 1, Hackathon Finalist..."
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5.5: CAREER EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h4 className="font-heading text-lg font-bold text-yellow-400">
                    MANAGE CAREER EXPERIENCE & ROLES ({formData.experience?.length || 0})
                  </h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Jobs, internships, freelance contracts & tech leadership roles.
                  </p>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD EXPERIENCE</span>
                </button>
              </div>

              {/* Fallback Message Setting */}
              <div className="bg-zinc-900 border border-zinc-700 p-3 space-y-1">
                <label className="text-zinc-400 block font-bold">FALLBACK STATEMENT (DISPLAYED WHEN NO ROLES ARE ADDED)</label>
                <input
                  type="text"
                  value={formData.experienceFallbackMessage || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, experienceFallbackMessage: e.target.value }))}
                  placeholder="Currently building experience through projects, internships, certifications and independent learning."
                  className="w-full bg-black border border-zinc-700 text-white p-2"
                />
              </div>

              <div className="space-y-4">
                {formData.experience?.map((exp, expIdx) => (
                  <div key={exp.id || expIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">
                        ROLE #{expIdx + 1}: {exp.position} @ {exp.organization}
                      </span>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-red-400 hover:text-white p-1"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">POSITION / JOB TITLE</label>
                        <input
                          type="text"
                          value={exp.position || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              experience: (prev.experience || []).map((item) =>
                                item.id === exp.id ? { ...item, position: val } : item
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">ORGANIZATION / COMPANY</label>
                        <input
                          type="text"
                          value={exp.organization || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              experience: (prev.experience || []).map((item) =>
                                item.id === exp.id ? { ...item, organization: val } : item
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">DURATION (e.g. Jun 2024 – Present)</label>
                        <input
                          type="text"
                          value={exp.duration || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              experience: (prev.experience || []).map((item) =>
                                item.id === exp.id ? { ...item, duration: val } : item
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">KEY TECHNOLOGIES (Comma-separated)</label>
                        <input
                          type="text"
                          placeholder="React, JavaScript, Node.js, Git"
                          value={Array.isArray(exp.technologies) ? exp.technologies.join(', ') : (exp.technologies || '')}
                          onChange={(e) => {
                            const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setFormData((prev) => ({
                              ...prev,
                              experience: (prev.experience || []).map((item) =>
                                item.id === exp.id ? { ...item, technologies: list } : item
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">DESCRIPTION SUMMARY</label>
                      <textarea
                        rows="2"
                        value={exp.description || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            experience: (prev.experience || []).map((item) =>
                              item.id === exp.id ? { ...item, description: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">KEY OUTCOME / ACHIEVEMENT (OPTIONAL)</label>
                      <input
                        type="text"
                        placeholder="e.g. Improved web app page load speed by 35% through component code-splitting"
                        value={exp.achievements || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            experience: (prev.experience || []).map((item) =>
                              item.id === exp.id ? { ...item, achievements: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5.5: INTERNSHIPS */}
          {activeTab === 'internships' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE INTERNSHIPS & PRACTICAL TRAINING ({formData.internships?.length || 0})
                </h4>
                <button
                  onClick={handleAddInternship}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD INTERNSHIP</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.internships?.map((intern, iIdx) => (
                  <div key={intern.id || iIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">
                        INTERNSHIP #{iIdx + 1}: {intern.role} @ {intern.company}
                      </span>
                      <button onClick={() => handleDeleteInternship(intern.id)} className="text-red-400 hover:text-white p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">ROLE / POSITION TITLE</label>
                        <input
                          type="text"
                          value={intern.role || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, role: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">COMPANY / ORGANIZATION</label>
                        <input
                          type="text"
                          value={intern.company || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, company: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">DURATION (e.g. Jan 2024 – Apr 2024)</label>
                        <input
                          type="text"
                          value={intern.duration || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, duration: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">LOCATION / WORK MODE</label>
                        <input
                          type="text"
                          value={intern.location || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, location: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">STATUS</label>
                        <select
                          value={intern.status || 'Completed'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, status: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        >
                          <option value="Completed">Completed</option>
                          <option value="Ongoing">Ongoing</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">INTERNSHIP TYPE (e.g. Full-Time Internship)</label>
                        <input
                          type="text"
                          value={intern.type || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, type: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">STIPEND / COMPENSATION</label>
                        <input
                          type="text"
                          value={intern.stipend || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, stipend: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">DESCRIPTION SUMMARY</label>
                      <textarea
                        rows="2"
                        value={intern.description || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            internships: prev.internships.map((item) => item.id === intern.id ? { ...item, description: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">KEY RESPONSIBILITIES (One per line)</label>
                      <textarea
                        rows="3"
                        value={Array.isArray(intern.responsibilities) ? intern.responsibilities.join('\n') : (intern.responsibilities || '')}
                        onChange={(e) => {
                          const lines = e.target.value.split('\n');
                          setFormData((prev) => ({
                            ...prev,
                            internships: prev.internships.map((item) => item.id === intern.id ? { ...item, responsibilities: lines } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                        placeholder="e.g. Developed REST API endpoints&#10;Configured CI/CD pipelines"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">TECHNOLOGIES (Comma-separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(intern.technologies) ? intern.technologies.join(', ') : (intern.technologies || '')}
                          onChange={(e) => {
                            const list = e.target.value.split(',').map(s => s.trim());
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, technologies: list } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                          placeholder="React, Java, MySQL, AWS"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">CERTIFICATE / VERIFICATION LINK URL</label>
                        <input
                          type="text"
                          value={intern.certificateLink || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              internships: prev.internships.map((item) => item.id === intern.id ? { ...item, certificateLink: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h4 className="font-heading text-lg font-bold text-yellow-400">
                    MANAGE CERTIFICATIONS & CREDENTIALS ({formData.certifications?.length || 0})
                  </h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Upload your own certificate files (PNG, JPG, PDF) or paste certificate image URLs.
                  </p>
                </div>
                <button
                  onClick={handleAddCert}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD CERTIFICATION</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.certifications?.map((cert, cIdx) => {
                  const isPdf = cert.image?.startsWith('data:application/pdf') || cert.image?.toLowerCase().endsWith('.pdf') || cert.fileType === 'pdf';
                  const hasFile = Boolean(cert.image);

                  return (
                    <div key={cert.id || cIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 sm:p-5 space-y-4">
                      {/* Certificate Header */}
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-bold uppercase text-sm">
                            CERTIFICATE #{cIdx + 1}: {cert.name || 'Untitled Certificate'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteCert(cert.id)}
                          className="text-red-400 hover:text-white p-1"
                          title="Delete Certificate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Main Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-zinc-400 block mb-1">CERTIFICATE TITLE / NAME</label>
                          <input
                            type="text"
                            placeholder="e.g. AWS Certified Cloud Practitioner"
                            value={cert.name || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                certifications: prev.certifications.map((item) => item.id === cert.id ? { ...item, name: val } : item)
                              }));
                            }}
                            className="w-full bg-black border border-zinc-700 text-white p-2"
                          />
                        </div>
                        <div>
                          <label className="text-zinc-400 block mb-1">ISSUING ORGANIZATION</label>
                          <input
                            type="text"
                            placeholder="e.g. Amazon Web Services (AWS), Meta, Coursera"
                            value={cert.organization || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                certifications: prev.certifications.map((item) => item.id === cert.id ? { ...item, organization: val } : item)
                              }));
                            }}
                            className="w-full bg-black border border-zinc-700 text-white p-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-zinc-400 block mb-1">ISSUE DATE / YEAR</label>
                          <input
                            type="text"
                            placeholder="e.g. 2024 or Aug 2024"
                            value={cert.date || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                certifications: prev.certifications.map((item) => item.id === cert.id ? { ...item, date: val } : item)
                              }));
                            }}
                            className="w-full bg-black border border-zinc-700 text-white p-2"
                          />
                        </div>
                        <div>
                          <label className="text-zinc-400 block mb-1">CREDENTIAL ID / LICENSE # (OPTIONAL)</label>
                          <input
                            type="text"
                            placeholder="e.g. AWS-CCP-9982031"
                            value={cert.credentialId || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                certifications: prev.certifications.map((item) => item.id === cert.id ? { ...item, credentialId: val } : item)
                              }));
                            }}
                            className="w-full bg-black border border-zinc-700 text-white p-2"
                          />
                        </div>
                      </div>

                      {/* Certificate Upload & Preview Section */}
                      <div className="bg-black/70 border border-zinc-800 p-4 space-y-3">
                        <label className="text-yellow-400 font-bold block">
                          CERTIFICATE DOCUMENT / IMAGE ATTACHMENT
                        </label>

                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {/* Live Preview Box */}
                          <div className="w-32 h-20 bg-zinc-950 border-2 border-zinc-700 overflow-hidden shrink-0 flex items-center justify-center relative">
                            {hasFile ? (
                              isPdf ? (
                                <div className="text-center p-1">
                                  <FileText className="w-6 h-6 text-yellow-400 mx-auto" />
                                  <span className="text-[9px] text-zinc-300 block truncate font-bold uppercase mt-0.5">
                                    PDF DOC
                                  </span>
                                </div>
                              ) : (
                                <img
                                  src={cert.image}
                                  alt={cert.name}
                                  className="w-full h-full object-cover"
                                />
                              )
                            ) : (
                              <div className="text-center text-zinc-600 text-[10px] p-1 font-mono">
                                NO FILE
                              </div>
                            )}
                          </div>

                          {/* Upload Buttons & Options */}
                          <div className="flex-1 w-full space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-yellow-400 text-black hover:bg-white font-mono text-xs font-extrabold cursor-pointer transition-colors shadow-[2px_2px_0px_#FFF]">
                                <Upload className="w-4 h-4" />
                                <span>UPLOAD OWN CERTIFICATE (IMG / PDF)</span>
                                <input
                                  type="file"
                                  accept="image/*,application/pdf"
                                  onChange={(e) => handleCertFileUpload(cert.id, e)}
                                  className="hidden"
                                />
                              </label>

                              {hasFile && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      certifications: prev.certifications.map((item) =>
                                        item.id === cert.id ? { ...item, image: '', fileName: '' } : item
                                      )
                                    }));
                                  }}
                                  className="px-2.5 py-1.5 bg-red-950/80 text-red-300 hover:bg-red-800 hover:text-white border border-red-800 text-[11px] font-mono transition-colors"
                                >
                                  Remove File
                                </button>
                              )}
                            </div>

                            {hasFile && (
                              <div className="flex items-center gap-1.5 text-[11px] text-green-400 font-bold">
                                <Check className="w-3.5 h-3.5" />
                                <span className="truncate">
                                  {isPdf ? 'PDF certificate document attached' : 'Certificate image loaded'}
                                  {cert.fileName ? ` (${cert.fileName})` : ''}
                                </span>
                              </div>
                            )}

                            <div>
                              <label className="text-zinc-500 block mb-0.5 text-[10px]">
                                OR SPECIFY IMAGE / DOCUMENT URL:
                              </label>
                              <input
                                type="text"
                                placeholder="https://example.com/certificate.jpg"
                                value={cert.image || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFormData((prev) => ({
                                    ...prev,
                                    certifications: prev.certifications.map((item) =>
                                      item.id === cert.id ? { ...item, image: val } : item
                                    )
                                  }));
                                }}
                                className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Online Verification Link */}
                      <div>
                        <label className="text-zinc-400 block mb-1">VERIFICATION / ISSUER LINK URL (OPTIONAL)</label>
                        <input
                          type="text"
                          placeholder="https://aws.amazon.com/verification or Coursera URL"
                          value={cert.verifyLink || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              certifications: prev.certifications.map((item) => item.id === cert.id ? { ...item, verifyLink: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 8: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE ACHIEVEMENTS & AWARDS ({formData.achievements?.length || 0})
                </h4>
                <button
                  onClick={handleAddAchievement}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD ACHIEVEMENT</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.achievements?.map((ach, aIdx) => (
                  <div key={ach.id || aIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">{ach.title || 'Untitled Achievement'}</span>
                      <button onClick={() => handleDeleteAchievement(ach.id)} className="text-red-400 hover:text-white p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">ACHIEVEMENT TITLE</label>
                        <input
                          type="text"
                          value={ach.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              achievements: prev.achievements.map((item) => item.id === ach.id ? { ...item, title: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">CATEGORY (e.g. Hackathon, Award, Academic)</label>
                        <input
                          type="text"
                          value={ach.category || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              achievements: prev.achievements.map((item) => item.id === ach.id ? { ...item, category: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">DESCRIPTION</label>
                      <textarea
                        rows="2"
                        value={ach.description || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            achievements: prev.achievements.map((item) => item.id === ach.id ? { ...item, description: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">DATE / YEAR</label>
                      <input
                        type="text"
                        value={ach.date || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            achievements: prev.achievements.map((item) => item.id === ach.id ? { ...item, date: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: STARTUP IDEAS */}
          {activeTab === 'ideas' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE STARTUP & PRODUCT IDEAS ({formData.startupIdeas?.length || 0})
                </h4>
                <button
                  onClick={handleAddIdea}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW IDEA</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.startupIdeas?.map((idea, iIdx) => (
                  <div
                    key={idea.id || iIdx}
                    className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">
                        VENTURE #{iIdx + 1}: {idea.name}
                      </span>
                      <button
                        onClick={() => handleDeleteIdea(idea.id)}
                        className="text-red-400 hover:text-white p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">VENTURE NAME</label>
                        <input
                          type="text"
                          value={idea.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              startupIdeas: prev.startupIdeas.map((item) =>
                                item.id === idea.id ? { ...item, name: val } : item
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>

                      <div>
                        <label className="text-zinc-400 block mb-1">STAGE (e.g. Prototyping MVP)</label>
                        <input
                          type="text"
                          value={idea.currentStage || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              startupIdeas: prev.startupIdeas.map((item) =>
                                item.id === idea.id ? { ...item, currentStage: val } : item
                              )
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">THE PROBLEM</label>
                      <textarea
                        rows="2"
                        value={idea.problem}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            startupIdeas: prev.startupIdeas.map((item) =>
                              item.id === idea.id ? { ...item, problem: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">THE SOLUTION</label>
                      <textarea
                        rows="2"
                        value={idea.solution || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            startupIdeas: prev.startupIdeas.map((item) =>
                              item.id === idea.id ? { ...item, solution: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">PRODUCT CONCEPT / ELEVATOR PITCH</label>
                      <input
                        type="text"
                        placeholder="e.g. Notion meets VS Code tailored for computer science undergrads."
                        value={idea.concept || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            startupIdeas: prev.startupIdeas.map((item) =>
                              item.id === idea.id ? { ...item, concept: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">FUTURE VISION / SCALE STRATEGY</label>
                      <textarea
                        rows="2"
                        placeholder="e.g. Expand into a worldwide collaborative ecosystem for CS/IT universities..."
                        value={idea.futureVision || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            startupIdeas: prev.startupIdeas.map((item) =>
                              item.id === idea.id ? { ...item, futureVision: val } : item
                            )
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE TECHNICAL SERVICES ({formData.services?.length || 0})
                </h4>
                <button
                  onClick={handleAddService}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD SERVICE</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.services?.map((serv, sIdx) => (
                  <div key={serv.id || sIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">{serv.title}</span>
                      <button onClick={() => handleDeleteService(serv.id)} className="text-red-400 hover:text-white p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">SERVICE TITLE</label>
                      <input
                        type="text"
                        value={serv.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            services: prev.services.map((item) => item.id === serv.id ? { ...item, title: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">DESCRIPTION</label>
                      <textarea
                        rows="2"
                        value={serv.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            services: prev.services.map((item) => item.id === serv.id ? { ...item, description: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: BLOG */}
          {activeTab === 'blog' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE BLOG POSTS & ARTICLES ({formData.blog?.length || 0})
                </h4>
                <button
                  onClick={handleAddBlog}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD ARTICLE</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.blog?.map((post, bIdx) => (
                  <div key={post.id || bIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">{post.title}</span>
                      <button onClick={() => handleDeleteBlog(post.id)} className="text-red-400 hover:text-white p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <label className="text-zinc-400 block mb-1">ARTICLE TITLE</label>
                        <input
                          type="text"
                          value={post.title || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              blog: prev.blog.map((item) => item.id === post.id ? { ...item, title: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">PUBLISH DATE (e.g. Aug 12, 2024)</label>
                        <input
                          type="text"
                          value={post.date || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              blog: prev.blog.map((item) => item.id === post.id ? { ...item, date: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-400 block mb-1">READ TIME (e.g. 5 min read)</label>
                        <input
                          type="text"
                          value={post.readTime || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              blog: prev.blog.map((item) => item.id === post.id ? { ...item, readTime: val } : item)
                            }));
                          }}
                          className="w-full bg-black border border-zinc-700 text-white p-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">SUMMARY / PREVIEW</label>
                      <textarea
                        rows="2"
                        value={post.summary}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            blog: prev.blog.map((item) => item.id === post.id ? { ...item, summary: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">FULL ARTICLE CONTENT</label>
                      <textarea
                        rows="4"
                        value={post.content}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            blog: prev.blog.map((item) => item.id === post.id ? { ...item, content: val } : item)
                          }));
                        }}
                        className="w-full bg-black border border-zinc-700 text-white p-2"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: GALLERY & INSTAGRAM */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 font-mono text-xs">
              
              {/* Instagram Profile Quick-Connect Card */}
              <div className="bg-zinc-900 border-2 border-yellow-400 p-4 space-y-3">
                <div className="flex items-center gap-2 text-yellow-400 font-bold border-b border-zinc-800 pb-2">
                  <Instagram className="w-5 h-5 text-yellow-400" />
                  <span className="font-heading text-sm uppercase">INSTAGRAM PROFILE & SHOWCASE SETTINGS</span>
                </div>
                <p className="text-zinc-300 text-xs font-sans">
                  Connect your Instagram profile so visitors can visit your account directly from your gallery, snapshots, and contact section.
                </p>
                <div>
                  <label className="text-yellow-400 font-bold block mb-1">INSTAGRAM URL</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="https://instagram.com/your_handle"
                      value={formData.social?.instagram || ''}
                      onChange={(e) => updateSocial('instagram', e.target.value)}
                      className="w-full bg-black border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400 font-bold"
                    />
                    {formData.social?.instagram && (
                      <a
                        href={formData.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-yellow-400 text-black font-bold flex items-center gap-1 shrink-0"
                        title="Open Instagram"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Gallery Photos List */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE PHOTO SNAPSHOTS & VISUALS ({formData.gallery?.length || 0})
                </h4>
                <button
                  onClick={handleAddGalleryPhoto}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD PHOTO</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.gallery?.map((item, gIdx) => (
                  <div key={item.id || gIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold uppercase">{item.title}</span>
                      <button onClick={() => handleDeleteGalleryPhoto(item.id)} className="text-red-400 hover:text-white p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="md:col-span-1 aspect-[4/3] bg-black border border-zinc-700 overflow-hidden relative flex items-center justify-center">
                        {item.url ? (
                          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-zinc-500 font-mono text-[10px]">NO IMAGE</span>
                        )}
                      </div>

                      <div className="md:col-span-3 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-zinc-400 block mb-1">PHOTO TITLE</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  gallery: prev.gallery.map((g) => g.id === item.id ? { ...g, title: val } : g)
                                }));
                              }}
                              className="w-full bg-black border border-zinc-700 text-white p-2"
                            />
                          </div>

                          <div>
                            <label className="text-zinc-400 block mb-1">CATEGORY (e.g. Hackathons, Workspace, Events, Instagram)</label>
                            <input
                              type="text"
                              value={item.category || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  gallery: prev.gallery.map((g) => g.id === item.id ? { ...g, category: val } : g)
                                }));
                              }}
                              className="w-full bg-black border border-zinc-700 text-white p-2"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-zinc-400 block mb-1">IMAGE URL / OR UPLOAD FROM DEVICE</label>
                          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                            <input
                              type="text"
                              value={item.url || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  gallery: prev.gallery.map((g) => g.id === item.id ? { ...g, url: val } : g)
                                }));
                              }}
                              placeholder="Image URL or upload..."
                              className="w-full bg-black border border-zinc-700 text-white p-2"
                            />
                            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-yellow-400 text-black hover:bg-white font-mono text-[11px] font-bold cursor-pointer transition-colors shrink-0">
                              <Upload className="w-3.5 h-3.5" />
                              <span>UPLOAD PHOTO</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleGalleryPhotoUpload(item.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="text-zinc-400 block mb-1">CAPTION</label>
                          <input
                            type="text"
                            value={item.caption || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                gallery: prev.gallery.map((g) => g.id === item.id ? { ...g, caption: val } : g)
                              }));
                            }}
                            className="w-full bg-black border border-zinc-700 text-white p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: SOCIAL & RESUME */}
          {activeTab === 'social' && (
            <div className="space-y-4 max-w-3xl font-mono text-xs">
              <h4 className="font-heading text-lg font-bold text-yellow-400 border-b border-zinc-800 pb-2">
                SOCIAL MEDIA & RESUME URLS
              </h4>

              {/* Instagram URL Editor */}
              <div className="bg-zinc-900 border-2 border-yellow-400/80 p-4 space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                  <Instagram className="w-4 h-4" />
                  <span>INSTAGRAM PROFILE URL</span>
                </div>
                <input
                  type="text"
                  placeholder="https://instagram.com/your_handle"
                  value={formData.social?.instagram || ''}
                  onChange={(e) => updateSocial('instagram', e.target.value)}
                  className="w-full bg-black border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400 font-bold"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">LINKEDIN URL</label>
                <input
                  type="text"
                  value={formData.social?.linkedin || ''}
                  onChange={(e) => updateSocial('linkedin', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">GITHUB URL</label>
                <input
                  type="text"
                  value={formData.social?.github || ''}
                  onChange={(e) => updateSocial('github', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">TWITTER / X URL</label>
                <input
                  type="text"
                  value={formData.social?.twitter || ''}
                  onChange={(e) => updateSocial('twitter', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">FACEBOOK URL</label>
                <input
                  type="text"
                  value={formData.social?.facebook || ''}
                  onChange={(e) => updateSocial('facebook', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">EMAIL ADDRESS</label>
                <input
                  type="text"
                  value={formData.social?.email || ''}
                  onChange={(e) => updateSocial('email', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <label className="text-yellow-400 font-bold block">RESUME DOCUMENT (PDF)</label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    placeholder="Resume URL or upload file below..."
                    value={formData.personal?.resumeUrl || ''}
                    onChange={(e) => updatePersonal('resumeUrl', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400 font-bold"
                  />
                  <label className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-yellow-400 text-black hover:bg-white font-mono text-xs font-bold cursor-pointer transition-colors shrink-0 shadow-[2px_2px_0px_#FFF]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>UPLOAD RESUME PDF</span>
                    <input type="file" accept="application/pdf" onChange={handleResumeFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">RESUME DOWNLOAD FILE NAME</label>
                <input
                  type="text"
                  value={formData.personal?.resumeFileName || ''}
                  onChange={(e) => updatePersonal('resumeFileName', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          )}

          {/* TAB 13: STARTUP CTA */}
          {activeTab === 'cta' && (
            <div className="space-y-4 max-w-3xl font-mono text-xs">
              <h4 className="font-heading text-lg font-bold text-yellow-400 border-b border-zinc-800 pb-2">
                STARTUP-FOCUSED CALL TO ACTION SECTION
              </h4>

              <div>
                <label className="text-zinc-400 block mb-1">CTA TITLE</label>
                <input
                  type="text"
                  value={formData.ctaSection?.title || ''}
                  onChange={(e) => updateCTA('title', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400 font-bold"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">SUPPORTING BODY TEXT</label>
                <textarea
                  rows="3"
                  value={formData.ctaSection?.body || ''}
                  onChange={(e) => updateCTA('body', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                ></textarea>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">PRIMARY BUTTON TEXT</label>
                <input
                  type="text"
                  value={formData.ctaSection?.primaryBtnText || ''}
                  onChange={(e) => updateCTA('primaryBtnText', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">CLOSING STATEMENT</label>
                <input
                  type="text"
                  value={formData.ctaSection?.closingStatement || ''}
                  onChange={(e) => updateCTA('closingStatement', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400 font-bold"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Apply Button */}
        <div className="p-4 bg-zinc-950 border-t-4 border-yellow-400 flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-400 uppercase hidden sm:inline">
            EDIT → SAVE → UPDATE LIVE SITE
          </span>

          <button
            onClick={handleSaveAll}
            className="brutal-btn bg-yellow-400 text-black hover:bg-white px-8 py-3 text-sm font-extrabold flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>SAVE & UPDATE LIVE PORTFOLIO</span>
          </button>
        </div>

      </div>
    </div>
  );
};
