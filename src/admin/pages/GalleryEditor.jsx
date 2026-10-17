import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const GalleryEditor = () => (
  <SectionEditor sectionKey="gallery" title="Photo Gallery" icon={ImageIcon}>
    {(content, setContent) => {
      if (!Array.isArray(content)) return <p className="text-zinc-500 font-mono text-xs">No gallery data.</p>;
      const add = () => setContent((prev) => [...prev, { id: `g${Date.now()}`, title: '', category: '', caption: '', url: '' }]);
      const remove = (i) => { if (window.confirm('Delete?')) setContent((prev) => prev.filter((_, idx) => idx !== i)); };
      const update = (i, f, v) => setContent((prev) => { const u = [...prev]; u[i] = { ...u[i], [f]: v }; return u; });
      return (
        <div className="space-y-6">
          {content.map((item, idx) => (
            <div key={item.id||idx} className="p-4 bg-zinc-800/50 border border-zinc-700 space-y-3">
              <div className="flex justify-between"><span className="font-mono text-xs font-bold text-yellow-400">Photo #{idx+1}</span>
                <button onClick={() => remove(idx)} className="p-1.5 text-red-400 hover:bg-red-950/40 border border-red-900/40 cursor-pointer"><Trash2 className="w-3.5 h-3.5"/></button></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Title</label>
                  <input type="text" value={item.title||''} onChange={(e)=>update(idx,'title',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Category</label>
                  <input type="text" value={item.category||''} onChange={(e)=>update(idx,'category',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              </div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Caption</label>
                <input type="text" value={item.caption||''} onChange={(e)=>update(idx,'caption',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Image URL</label>
                <input type="text" value={item.url||''} onChange={(e)=>update(idx,'url',e.target.value)} className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/>
                {item.url && <div className="mt-2 w-32 h-20 border border-zinc-700 overflow-hidden"><img src={item.url} alt="" className="w-full h-full object-cover"/></div>}
              </div>
            </div>
          ))}
          <button onClick={add} className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4"/> ADD PHOTO
          </button>
        </div>
      );
    }}
  </SectionEditor>
);

export default GalleryEditor;
