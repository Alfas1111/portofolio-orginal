import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

const CTAEditor = () => (
  <SectionEditor sectionKey="ctaSection" title="Call-to-Action Section" icon={MessageSquare}>
    {(content, setContent) => {
      if (!content) return null;
      const update = (f, v) => setContent((prev) => ({ ...prev, [f]: v }));
      const updateSmallLink = (i, v) => setContent((prev) => {
        const links = [...(prev.smallLinks || [])];
        links[i] = v;
        return { ...prev, smallLinks: links };
      });
      const addSmallLink = () => setContent((prev) => ({ ...prev, smallLinks: [...(prev.smallLinks || []), ''] }));
      const removeSmallLink = (i) => setContent((prev) => ({ ...prev, smallLinks: (prev.smallLinks || []).filter((_, idx) => idx !== i) }));

      return (
        <div className="space-y-4">
          <div><label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">CTA Title</label>
            <input type="text" value={content.title||''} onChange={(e)=>update('title',e.target.value)} className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
          <div><label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Body Text</label>
            <textarea value={content.body||''} onChange={(e)=>update('body',e.target.value)} rows={3} className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Primary Button Text</label>
              <input type="text" value={content.primaryBtnText||''} onChange={(e)=>update('primaryBtnText',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
            <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Secondary Btn 1</label>
              <input type="text" value={content.secondaryBtn1Text||''} onChange={(e)=>update('secondaryBtn1Text',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
            <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Secondary Btn 2</label>
              <input type="text" value={content.secondaryBtn2Text||''} onChange={(e)=>update('secondaryBtn2Text',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
          </div>
          <div><label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Closing Statement</label>
            <input type="text" value={content.closingStatement||''} onChange={(e)=>update('closingStatement',e.target.value)} className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
          <div>
            <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Quick Links / Tags</label>
            <div className="space-y-2">
              {(content.smallLinks||[]).map((link, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="text" value={link} onChange={(e)=>updateSmallLink(i,e.target.value)} className="flex-1 bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/>
                  <button onClick={()=>removeSmallLink(i)} className="p-1.5 text-red-400 hover:bg-red-950/40 cursor-pointer">×</button>
                </div>
              ))}
              <button onClick={addSmallLink} className="px-3 py-1.5 font-mono text-xs font-bold text-yellow-400 border border-yellow-400/40 hover:bg-yellow-400/10 cursor-pointer">+ ADD LINK</button>
            </div>
          </div>
        </div>
      );
    }}
  </SectionEditor>
);

export default CTAEditor;
