import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X, Save, RotateCcw, Download, Upload, User, Code, FolderGit2, GraduationCap, Award, Rocket, FileText, Image as ImageIcon, Share2, Mail, Plus, Trash2, Edit2, Layout, BookOpen
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
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(data);

  // Sync state when opening
  React.useEffect(() => {
    if (isAdminOpen) {
      setFormData(data);
    }
  }, [isAdminOpen, data]);

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

  // Certifications handlers
  const handleAddCert = () => {
    const newCert = {
      id: 'c_' + Date.now(),
      name: 'Certification Name',
      organization: 'Issuing Organization',
      date: '2024',
      credentialId: 'CERT-12345',
      image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop',
      verifyLink: 'https://example.com'
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
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'ideas', name: 'Startup Ideas', icon: Rocket },
    { id: 'services', name: 'Services', icon: Layout },
    { id: 'blog', name: 'Blog', icon: BookOpen },
    { id: 'gallery', name: 'Photo Gallery', icon: ImageIcon },
    { id: 'social', name: 'Social & Resume', icon: Share2 },
    { id: 'cta', name: 'Startup CTA', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0A0A0A] text-white border-4 border-yellow-400 w-full max-w-6xl h-[92vh] shadow-[20px_20px_0px_#000] flex flex-col justify-between overflow-hidden relative">
        
        {/* Top Header */}
        <div className="p-4 bg-yellow-400 text-black border-b-4 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-black text-yellow-400 p-1.5 font-mono font-bold text-xs">
              CMS
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase">
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
                <label className="text-zinc-400 block mb-1">PROFILE / HERO PHOTO IMAGE URL</label>
                <input
                  type="text"
                  value={formData.personal?.profileImage || ''}
                  onChange={(e) => updatePersonal('profileImage', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={formData.personal?.location || ''}
                    onChange={(e) => updatePersonal('location', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">CAREER GOAL</label>
                  <input
                    type="text"
                    value={formData.personal?.careerGoal || ''}
                    onChange={(e) => updatePersonal('careerGoal', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                  />
                </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
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
                      <label className="text-zinc-400 block mb-1">IMAGE URL</label>
                      <input
                        type="text"
                        value={proj.image}
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
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">SHORT DESCRIPTION</label>
                      <textarea
                        rows="2"
                        value={proj.shortDescription}
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
                        <label className="text-zinc-400 block mb-1">YEARS (e.g. 2023 - Present)</label>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-heading text-lg font-bold text-yellow-400">
                  MANAGE CERTIFICATIONS ({formData.certifications?.length || 0})
                </h4>
                <button
                  onClick={handleAddCert}
                  className="brutal-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD CERTIFICATION</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.certifications?.map((cert, cIdx) => (
                  <div key={cert.id || cIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-yellow-400 font-bold">{cert.name}</span>
                      <button onClick={() => handleDeleteCert(cert.id)} className="text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-400 block mb-1">CERTIFICATE NAME</label>
                        <input
                          type="text"
                          value={cert.name}
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
                          value={cert.organization}
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: STARTUP IDEAS */}
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
                        value={idea.solution}
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: SOCIAL & RESUME */}
          {activeTab === 'social' && (
            <div className="space-y-4 max-w-3xl font-mono text-xs">
              <h4 className="font-heading text-lg font-bold text-yellow-400 border-b border-zinc-800 pb-2">
                SOCIAL MEDIA & RESUME URLS
              </h4>

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
                <label className="text-zinc-400 block mb-1">EMAIL ADDRESS</label>
                <input
                  type="text"
                  value={formData.social?.email || ''}
                  onChange={(e) => updateSocial('email', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">RESUME PDF FILE / LINK URL</label>
                <input
                  type="text"
                  value={formData.personal?.resumeUrl || ''}
                  onChange={(e) => updatePersonal('resumeUrl', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 outline-none focus:border-yellow-400 font-bold"
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
