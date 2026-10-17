import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { User } from 'lucide-react';

const PersonalEditor = () => {
  return (
    <SectionEditor sectionKey="personal" title="Personal Information" icon={User}>
      {(content, setContent) => {
        if (!content) return null;

        const update = (field, value) => {
          setContent((prev) => ({ ...prev, [field]: value }));
        };

        const updateInterest = (index, value) => {
          setContent((prev) => {
            const interests = [...(prev.interests || [])];
            interests[index] = value;
            return { ...prev, interests };
          });
        };

        const addInterest = () => {
          setContent((prev) => ({
            ...prev,
            interests: [...(prev.interests || []), '']
          }));
        };

        const removeInterest = (index) => {
          setContent((prev) => ({
            ...prev,
            interests: (prev.interests || []).filter((_, i) => i !== index)
          }));
        };

        return (
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Full Name</label>
              <input
                type="text"
                value={content.name || ''}
                onChange={(e) => update('name', e.target.value)}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                placeholder="Your full name"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Tagline</label>
              <input
                type="text"
                value={content.tagline || ''}
                onChange={(e) => update('tagline', e.target.value)}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                placeholder="e.g., BCA STUDENT • SOFTWARE ENGINEER"
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Headline</label>
              <input
                type="text"
                value={content.headline || ''}
                onChange={(e) => update('headline', e.target.value)}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                placeholder="Main heading on hero section"
              />
            </div>

            {/* Short Intro */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Short Intro</label>
              <textarea
                value={content.shortIntro || ''}
                onChange={(e) => update('shortIntro', e.target.value)}
                rows={3}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
                placeholder="Brief introduction shown on hero"
              />
            </div>

            {/* Profile Image URL */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Profile Image URL</label>
              <input
                type="text"
                value={content.profileImage || ''}
                onChange={(e) => update('profileImage', e.target.value)}
                className="w-full bg-zinc-800 text-white font-mono text-xs px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                placeholder="https://..."
              />
              {content.profileImage && (
                <div className="mt-2 w-24 h-24 border-2 border-zinc-700 overflow-hidden">
                  <img src={content.profileImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* About Bio */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">About Bio</label>
              <textarea
                value={content.aboutBio || ''}
                onChange={(e) => update('aboutBio', e.target.value)}
                rows={4}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
                placeholder="Detailed bio for the About section"
              />
            </div>

            {/* Personal Intro */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Personal Intro Quote</label>
              <input
                type="text"
                value={content.personalIntro || ''}
                onChange={(e) => update('personalIntro', e.target.value)}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                placeholder="A personal quote or intro line"
              />
            </div>

            {/* College / University */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">College</label>
                <input type="text" value={content.college || ''} onChange={(e) => update('college', e.target.value)}
                  className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none" />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">University</label>
                <input type="text" value={content.university || ''} onChange={(e) => update('university', e.target.value)}
                  className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none" />
              </div>
            </div>

            {/* Degree / Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Degree</label>
                <input type="text" value={content.degree || ''} onChange={(e) => update('degree', e.target.value)}
                  className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none" />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Location</label>
                <input type="text" value={content.location || ''} onChange={(e) => update('location', e.target.value)}
                  className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none" />
              </div>
            </div>

            {/* Career Goal */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Career Goal</label>
              <textarea
                value={content.careerGoal || ''}
                onChange={(e) => update('careerGoal', e.target.value)}
                rows={2}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Interests & Passions</label>
              <div className="space-y-2">
                {(content.interests || []).map((interest, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => updateInterest(idx, e.target.value)}
                      className="flex-1 bg-zinc-800 text-white font-sans text-sm px-3 py-2 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                      placeholder={`Interest ${idx + 1}`}
                    />
                    <button
                      onClick={() => removeInterest(idx)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 transition-colors cursor-pointer"
                    >×</button>
                  </div>
                ))}
                <button
                  onClick={addInterest}
                  className="px-3 py-1.5 font-mono text-xs font-bold text-yellow-400 border border-yellow-400/40 hover:bg-yellow-400/10 transition-colors cursor-pointer"
                >+ ADD INTEREST</button>
              </div>
            </div>

            {/* Resume URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Resume URL</label>
                <input type="text" value={content.resumeUrl || ''} onChange={(e) => update('resumeUrl', e.target.value)}
                  className="w-full bg-zinc-800 text-white font-mono text-xs px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  placeholder="/Muhammed_Alfas_Resume.pdf" />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Resume File Name</label>
                <input type="text" value={content.resumeFileName || ''} onChange={(e) => update('resumeFileName', e.target.value)}
                  className="w-full bg-zinc-800 text-white font-mono text-xs px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  placeholder="Resume_Download_Name.pdf" />
              </div>
            </div>
          </div>
        );
      }}
    </SectionEditor>
  );
};

export default PersonalEditor;
