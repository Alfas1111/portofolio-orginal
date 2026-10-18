import React, { useState } from 'react';
import SectionEditor from '../components/SectionEditor';
import { Briefcase, Plus, Trash2, Upload, FileText, Download, ExternalLink, X, CheckCircle } from 'lucide-react';
import { compressAndReadFile } from '../../utils/fileHelpers';

const InternshipItem = ({ item, idx, update, remove }) => {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(!item.certificateLink || item.certificateLink.startsWith('http'));

  const isPdf = item.certificateLink?.startsWith('data:application/pdf') ||
    item.certificateLink?.toLowerCase().endsWith('.pdf');

  const hasCertificate = Boolean(item.certificateLink);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await compressAndReadFile(file, {
        maxPdfSizeBytes: 4 * 1024 * 1024
      });
      update(idx, 'certificateLink', res.dataUrl);
      update(idx, 'certificateFileName', res.fileName);
    } catch (err) {
      alert(err.message || 'Failed to upload certificate document.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="p-4 bg-zinc-800/50 border border-zinc-700 space-y-3">
      <div className="flex justify-between items-center border-b border-zinc-700 pb-2">
        <span className="font-mono text-xs font-bold text-yellow-400">Internship #{idx + 1}</span>
        <button
          type="button"
          onClick={() => remove(idx)}
          className="p-1.5 text-red-400 hover:bg-red-950/40 border border-red-900/40 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Role *</label>
          <input
            type="text"
            value={item.role || ''}
            onChange={(e) => update(idx, 'role', e.target.value)}
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Company *</label>
          <input
            type="text"
            value={item.company || ''}
            onChange={(e) => update(idx, 'company', e.target.value)}
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Location</label>
          <input
            type="text"
            value={item.location || ''}
            onChange={(e) => update(idx, 'location', e.target.value)}
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Duration</label>
          <input
            type="text"
            value={item.duration || ''}
            onChange={(e) => update(idx, 'duration', e.target.value)}
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Status</label>
          <select
            value={item.status || 'Ongoing'}
            onChange={(e) => update(idx, 'status', e.target.value)}
            className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none cursor-pointer"
          >
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Type</label>
          <input
            type="text"
            value={item.type || ''}
            onChange={(e) => update(idx, 'type', e.target.value)}
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Stipend</label>
          <input
            type="text"
            value={item.stipend || ''}
            onChange={(e) => update(idx, 'stipend', e.target.value)}
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Description</label>
        <textarea
          value={item.description || ''}
          onChange={(e) => update(idx, 'description', e.target.value)}
          rows={2}
          className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Responsibilities (one per line)</label>
        <textarea
          value={(item.responsibilities || []).join('\n')}
          onChange={(e) => update(idx, 'responsibilities', e.target.value.split('\n').filter(Boolean))}
          rows={3}
          className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"
          placeholder="One responsibility per line"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Technologies (comma-separated)</label>
        <input
          type="text"
          value={(item.technologies || []).join(', ')}
          onChange={(e) => update(idx, 'technologies', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
          className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
        />
      </div>

      {/* INTERNSHIP CERTIFICATE / DOCUMENT ATTACHMENT */}
      <div className="p-3 bg-zinc-900 border border-zinc-700 space-y-2">
        <label className="block font-mono text-[10px] font-bold text-yellow-400 uppercase">
          Internship Completion Document / Certificate
        </label>

        {hasCertificate ? (
          <div className="p-2.5 bg-zinc-950 border border-yellow-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <span className="font-mono text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs block">
                {item.certificateFileName || (isPdf ? 'Internship_Certificate.pdf' : 'Attached Document')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={item.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 bg-yellow-400 text-black font-mono text-[11px] font-bold flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>VIEW</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Remove attached document?')) {
                    update(idx, 'certificateLink', '');
                    update(idx, 'certificateFileName', '');
                  }
                }}
                className="px-2 py-1 bg-red-950 text-red-300 border border-red-800 font-mono text-[11px] flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>REMOVE</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <label className="flex-1 w-full flex items-center justify-center gap-2 p-2.5 border border-dashed border-zinc-700 hover:border-yellow-400 bg-zinc-950 text-zinc-300 hover:text-yellow-400 cursor-pointer font-mono text-xs transition-colors">
              <Upload className="w-3.5 h-3.5 text-yellow-400" />
              <span>{uploading ? 'Processing Document...' : 'UPLOAD INTERNSHIP CERTIFICATE (PDF/IMG)'}</span>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-[10px] font-mono text-zinc-400 hover:text-yellow-400 underline whitespace-nowrap"
            >
              {showUrlInput ? 'Hide link' : 'Or enter link'}
            </button>
          </div>
        )}

        {showUrlInput && (
          <div className="pt-1">
            <input
              type="text"
              value={item.certificateLink || ''}
              onChange={(e) => update(idx, 'certificateLink', e.target.value)}
              placeholder="https://... (or leave empty if uploaded above)"
              className="w-full bg-zinc-950 text-white font-mono text-xs px-3 py-1.5 border border-zinc-800 focus:border-yellow-400 focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const InternshipsEditor = () => (
  <SectionEditor sectionKey="internships" title="Internships" icon={Briefcase}>
    {(content, setContent) => {
      if (!Array.isArray(content)) return <p className="text-zinc-500 font-mono text-xs">No internships data.</p>;

      const add = () =>
        setContent((prev) => [
          ...prev,
          {
            id: `in${Date.now()}`,
            role: '',
            company: '',
            location: '',
            duration: '',
            type: '',
            stipend: '',
            description: '',
            responsibilities: [],
            technologies: [],
            certificateLink: '',
            certificateFileName: '',
            status: 'Ongoing'
          }
        ]);

      const remove = (i) => {
        if (window.confirm('Delete this internship?')) setContent((prev) => prev.filter((_, idx) => idx !== i));
      };

      const update = (i, f, v) =>
        setContent((prev) => {
          const u = [...prev];
          u[i] = { ...u[i], [f]: v };
          return u;
        });

      return (
        <div className="space-y-6">
          {content.map((item, idx) => (
            <InternshipItem
              key={item.id || idx}
              item={item}
              idx={idx}
              update={update}
              remove={remove}
            />
          ))}
          <button
            type="button"
            onClick={add}
            className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" /> ADD INTERNSHIP
          </button>
        </div>
      );
    }}
  </SectionEditor>
);

export default InternshipsEditor;
