import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { Rocket, Plus, Trash2 } from 'lucide-react';

const IdeasEditor = () => (
  <SectionEditor sectionKey="startupIdeas" title="Startup Ideas" icon={Rocket}>
    {(content, setContent) => {
      if (!Array.isArray(content)) return <p className="text-zinc-500 font-mono text-xs">No ideas data.</p>;
      const add = () => setContent((prev) => [...prev, { id: `i${Date.now()}`, name: '', problem: '', solution: '', concept: '', currentStage: '', futureVision: '' }]);
      const remove = (i) => { if (window.confirm('Delete?')) setContent((prev) => prev.filter((_, idx) => idx !== i)); };
      const update = (i, f, v) => setContent((prev) => { const u = [...prev]; u[i] = { ...u[i], [f]: v }; return u; });
      return (
        <div className="space-y-6">
          {content.map((item, idx) => (
            <div key={item.id||idx} className="p-4 bg-zinc-800/50 border border-zinc-700 space-y-3">
              <div className="flex justify-between"><span className="font-mono text-xs font-bold text-yellow-400">Idea #{idx+1}</span>
                <button onClick={() => remove(idx)} className="p-1.5 text-red-400 hover:bg-red-950/40 border border-red-900/40 cursor-pointer"><Trash2 className="w-3.5 h-3.5"/></button></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Name</label>
                <input type="text" value={item.name||''} onChange={(e)=>update(idx,'name',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Problem</label>
                <textarea value={item.problem||''} onChange={(e)=>update(idx,'problem',e.target.value)} rows={2} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Solution</label>
                <textarea value={item.solution||''} onChange={(e)=>update(idx,'solution',e.target.value)} rows={2} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Concept / Analogy</label>
                <input type="text" value={item.concept||''} onChange={(e)=>update(idx,'concept',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Current Stage</label>
                  <input type="text" value={item.currentStage||''} onChange={(e)=>update(idx,'currentStage',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Future Vision</label>
                  <input type="text" value={item.futureVision||''} onChange={(e)=>update(idx,'futureVision',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              </div>
            </div>
          ))}
          <button onClick={add} className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4"/> ADD IDEA
          </button>
        </div>
      );
    }}
  </SectionEditor>
);

export default IdeasEditor;
