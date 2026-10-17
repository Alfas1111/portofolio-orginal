import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

const ExperienceEditor = () => (
  <SectionEditor sectionKey="experience" title="Work Experience" icon={Briefcase}>
    {(content, setContent) => {
      if (!Array.isArray(content)) return <p className="text-zinc-500 font-mono text-xs">No experience data.</p>;
      const add = () => setContent((prev) => [...prev, { id: `ex${Date.now()}`, organization: '', position: '', duration: '', description: '', technologies: [], achievements: '' }]);
      const remove = (i) => { if (window.confirm('Delete this entry?')) setContent((prev) => prev.filter((_, idx) => idx !== i)); };
      const update = (i, f, v) => setContent((prev) => { const u = [...prev]; u[i] = { ...u[i], [f]: v }; return u; });
      return (
        <div className="space-y-6">
          {content.map((item, idx) => (
            <div key={item.id || idx} className="p-4 bg-zinc-800/50 border border-zinc-700 space-y-3">
              <div className="flex justify-between"><span className="font-mono text-xs font-bold text-yellow-400">Experience #{idx+1}</span>
                <button onClick={() => remove(idx)} className="p-1.5 text-red-400 hover:bg-red-950/40 border border-red-900/40 cursor-pointer"><Trash2 className="w-3.5 h-3.5"/></button></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Organization</label>
                  <input type="text" value={item.organization||''} onChange={(e)=>update(idx,'organization',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Position</label>
                  <input type="text" value={item.position||''} onChange={(e)=>update(idx,'position',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              </div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Duration</label>
                <input type="text" value={item.duration||''} onChange={(e)=>update(idx,'duration',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Description</label>
                <textarea value={item.description||''} onChange={(e)=>update(idx,'description',e.target.value)} rows={3} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Technologies (comma-separated)</label>
                <input type="text" value={(item.technologies||[]).join(', ')} onChange={(e)=>update(idx,'technologies',e.target.value.split(',').map(t=>t.trim()).filter(Boolean))} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Key Achievements</label>
                <textarea value={item.achievements||''} onChange={(e)=>update(idx,'achievements',e.target.value)} rows={2} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"/></div>
            </div>
          ))}
          <button onClick={add} className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4"/> ADD EXPERIENCE
          </button>
        </div>
      );
    }}
  </SectionEditor>
);

export default ExperienceEditor;
