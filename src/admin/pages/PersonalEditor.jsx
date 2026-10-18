import React, { useState } from 'react';
import SectionEditor from '../components/SectionEditor';
import {
  User,
  Upload,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { compressAndReadFile } from '../../utils/fileHelpers';

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";

const PersonalForm = ({ content, setContent }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showPositionControls, setShowPositionControls] = useState(true);

  if (!content) return null;

        const imgPos = content.imagePosition || { zoom: 1, x: 0, y: 0, rotate: 0 };

        const update = (field, value) => {
          setContent((prev) => ({ ...prev, [field]: value }));
        };

        const updatePosition = (prop, val) => {
          setContent((prev) => ({
            ...prev,
            imagePosition: {
              ...(prev.imagePosition || { zoom: 1, x: 0, y: 0, rotate: 0 }),
              [prop]: val
            }
          }));
        };

        const handleImageUpload = async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setUploading(true);
          setUploadError(null);

          try {
            const res = await compressAndReadFile(file, {
              maxWidth: 1400,
              maxHeight: 1400,
              quality: 0.88
            });

            setContent((prev) => ({
              ...prev,
              profileImage: res.dataUrl,
              imagePosition: { zoom: 1, x: 0, y: 0, rotate: 0 }
            }));
          } catch (err) {
            console.error('Profile image upload error:', err);
            setUploadError(err.message || 'Failed to process image file.');
          } finally {
            setUploading(false);
            e.target.value = '';
          }
        };

        const handleResetPosition = () => {
          update('imagePosition', { zoom: 1, x: 0, y: 0, rotate: 0 });
        };

        const handleResetDefaultImage = () => {
          if (window.confirm('Reset profile photo to default?')) {
            update('profileImage', DEFAULT_PROFILE_IMAGE);
            update('imagePosition', { zoom: 1, x: 0, y: 0, rotate: 0 });
          }
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
          <div className="space-y-6">
            {/* PROFILE PHOTO & HEADSHOT STUDIO */}
            <div className="p-4 sm:p-6 bg-zinc-900 border-2 border-yellow-400 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                <div>
                  <h3 className="font-mono text-sm font-bold text-yellow-400 uppercase flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Profile Picture & Framing Studio
                  </h3>
                  <p className="font-mono text-[11px] text-zinc-400 mt-0.5">
                    Upload your headshot and position it to look perfect on your homepage Hero section.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPositionControls(!showPositionControls)}
                    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 border border-zinc-700 font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{showPositionControls ? 'Hide Controls' : 'Adjust Frame & Zoom'}</span>
                  </button>
                </div>
              </div>

              {uploadError && (
                <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 font-mono text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Live Preview Box (Hero card aspect 4/5) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-2 block">
                    LIVE HERO CARD PREVIEW (ASPECT 4:5)
                  </span>

                  <div className="relative w-full max-w-[240px] aspect-[4/5] bg-zinc-950 border-4 border-yellow-400 shadow-[6px_6px_0px_#000] overflow-hidden">
                    {content.profileImage ? (
                      <img
                        src={content.profileImage}
                        alt="Profile preview"
                        style={{
                          transform: `scale(${imgPos.zoom || 1}) translate(${imgPos.x || 0}px, ${imgPos.y || 0}px) rotate(${imgPos.rotate || 0}deg)`,
                          transformOrigin: 'center center'
                        }}
                        className="w-full h-full object-cover transition-transform duration-75"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 font-mono text-xs p-4 text-center">
                        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                        <span>NO PHOTO UPLOADED</span>
                      </div>
                    )}

                    {/* Yellow Overlay Badge Preview */}
                    <div className="absolute bottom-2 left-2 right-2 bg-yellow-400 border border-black p-1.5 shadow-[2px_2px_0px_#000]">
                      <p className="font-heading font-bold text-[11px] text-black uppercase truncate">
                        {content.name || 'MUHAMMED ALFAS'}
                      </p>
                      <p className="font-mono text-[9px] font-bold text-black/80 truncate">
                        BCA CANDIDATE
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-zinc-500 mt-2 text-center">
                    Zoom: {Math.round((imgPos.zoom || 1) * 100)}% | X: {imgPos.x || 0}px | Y: {imgPos.y || 0}px
                  </span>
                </div>

                {/* Upload & Fine-Tuning Controls */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Upload Button */}
                  <div>
                    <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-zinc-700 hover:border-yellow-400 bg-zinc-950/80 hover:bg-zinc-950 text-zinc-300 hover:text-yellow-400 cursor-pointer transition-all">
                      <Upload className="w-7 h-7 mb-2 text-yellow-400" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-center">
                        {uploading ? 'Processing Image...' : 'CLICK TO UPLOAD NEW PROFILE PHOTO'}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 mt-1">
                        Supports PNG, JPG, JPEG, WEBP (Auto-optimized for instant loading)
                      </span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Positioning & Zoom Sliders */}
                  {showPositionControls && (
                    <div className="p-3.5 bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
                      {/* Zoom Slider */}
                      <div>
                        <div className="flex justify-between items-center text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-yellow-400 font-bold">
                            <ZoomIn className="w-3.5 h-3.5" /> ZOOM
                          </span>
                          <span>{Math.round((imgPos.zoom || 1) * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="2.5"
                          step="0.05"
                          value={imgPos.zoom || 1}
                          onChange={(e) => updatePosition('zoom', parseFloat(e.target.value))}
                          className="w-full accent-yellow-400 cursor-pointer"
                        />
                      </div>

                      {/* Pan Horizontal (X) */}
                      <div>
                        <div className="flex justify-between items-center text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Move className="w-3.5 h-3.5 text-yellow-400" /> HORIZONTAL POSITION (X)
                          </span>
                          <span>{imgPos.x || 0}px</span>
                        </div>
                        <input
                          type="range"
                          min="-120"
                          max="120"
                          step="2"
                          value={imgPos.x || 0}
                          onChange={(e) => updatePosition('x', parseInt(e.target.value))}
                          className="w-full accent-yellow-400 cursor-pointer"
                        />
                      </div>

                      {/* Pan Vertical (Y) */}
                      <div>
                        <div className="flex justify-between items-center text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Move className="w-3.5 h-3.5 text-yellow-400 rotate-90" /> VERTICAL POSITION (Y)
                          </span>
                          <span>{imgPos.y || 0}px</span>
                        </div>
                        <input
                          type="range"
                          min="-120"
                          max="120"
                          step="2"
                          value={imgPos.y || 0}
                          onChange={(e) => updatePosition('y', parseInt(e.target.value))}
                          className="w-full accent-yellow-400 cursor-pointer"
                        />
                      </div>

                      {/* Rotation */}
                      <div>
                        <div className="flex justify-between items-center text-zinc-400 mb-1">
                          <span className="flex items-center gap-1 text-zinc-300">
                            <RotateCw className="w-3.5 h-3.5 text-yellow-400" /> ROTATION
                          </span>
                          <span>{imgPos.rotate || 0}°</span>
                        </div>
                        <input
                          type="range"
                          min="-45"
                          max="45"
                          step="1"
                          value={imgPos.rotate || 0}
                          onChange={(e) => updatePosition('rotate', parseInt(e.target.value))}
                          className="w-full accent-yellow-400 cursor-pointer"
                        />
                      </div>

                      {/* Reset position button */}
                      <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                        <button
                          type="button"
                          onClick={handleResetPosition}
                          className="text-[11px] text-zinc-400 hover:text-yellow-400 flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reset alignment to center</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetDefaultImage}
                          className="text-[11px] text-zinc-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Reset to default photo</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Manual URL input toggle */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="text-[11px] font-mono text-zinc-400 hover:text-yellow-400 underline cursor-pointer"
                    >
                      {showUrlInput ? 'Hide URL input' : 'Or paste direct image URL manually'}
                    </button>
                    {showUrlInput && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={content.profileImage || ''}
                          onChange={(e) => update('profileImage', e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-zinc-950 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Personal Details */}
            <div className="p-4 sm:p-5 bg-zinc-800/40 border border-zinc-700 space-y-4">
              <span className="font-mono text-xs font-bold text-yellow-400 uppercase tracking-wider block border-b border-zinc-700 pb-2">
                Personal Identification & Headings
              </span>

              {/* Name */}
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={content.name || ''}
                  onChange={(e) => update('name', e.target.value)}
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
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
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
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
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
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
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
                  placeholder="Brief introduction shown on hero"
                />
              </div>

              {/* About Bio */}
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">About Bio</label>
                <textarea
                  value={content.aboutBio || ''}
                  onChange={(e) => update('aboutBio', e.target.value)}
                  rows={4}
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
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
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  placeholder="A personal quote or intro line"
                />
              </div>

              {/* College / University */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">College</label>
                  <input
                    type="text"
                    value={content.college || ''}
                    onChange={(e) => update('college', e.target.value)}
                    className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">University</label>
                  <input
                    type="text"
                    value={content.university || ''}
                    onChange={(e) => update('university', e.target.value)}
                    className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Degree / Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Degree</label>
                  <input
                    type="text"
                    value={content.degree || ''}
                    onChange={(e) => update('degree', e.target.value)}
                    className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Location</label>
                  <input
                    type="text"
                    value={content.location || ''}
                    onChange={(e) => update('location', e.target.value)}
                    className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Career Goal */}
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Career Goal</label>
                <textarea
                  value={content.careerGoal || ''}
                  onChange={(e) => update('careerGoal', e.target.value)}
                  rows={2}
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
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
                        className="flex-1 bg-zinc-900 text-white font-sans text-sm px-3 py-2 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                        placeholder={`Interest ${idx + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeInterest(idx)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 transition-colors cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addInterest}
                    className="px-3 py-1.5 font-mono text-xs font-bold text-yellow-400 border border-yellow-400/40 hover:bg-yellow-400/10 transition-colors cursor-pointer"
                  >
                    + ADD INTEREST
                  </button>
                </div>
              </div>
            </div>
          </div>
  );
};

const PersonalEditor = () => (
  <SectionEditor sectionKey="personal" title="Personal Information & Profile Photo" icon={User}>
    {(content, setContent) => <PersonalForm content={content} setContent={setContent} />}
  </SectionEditor>
);

export default PersonalEditor;
