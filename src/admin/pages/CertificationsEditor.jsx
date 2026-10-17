import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { Award, Plus, Trash2 } from 'lucide-react';

const CertificationsEditor = () => (
  <SectionEditor sectionKey="certifications" title="Certifications" icon={Award}>
    {(content, setContent) => {
      if (!Array.isArray(content)) return <p className="text-zinc-500 font-mono text-xs">No certifications data.</p>;
      const add = () => setContent((prev) => [...prev, { id: `c${Date.now()}`, name: '', organization: '', date: '', credentialId: '', image: '', verifyLink: '' }]);
      const remove = (i) => { if (window.confirm('Delete this certification?')) setContent((prev) => prev.filter((_, idx) => idx !== i)); };
      const update = (i, f, v) => setContent((prev) => { const u = [...prev]; u[i] = { ...u[i], [f]: v }; return u; });
      return (
        <div className="space-y-6">
          {content.map((item, idx) => (
            <div key={item.id || idx} className="p-4 bg-zinc-800/50 border border-zinc-700 space-y-3">
              <div className="flex justify-between"><span className="font-mono text-xs font-bold text-yellow-400">Cert #{idx+1}</span>
                <button onClick={() => remove(idx)} className="p-1.5 text-red-400 hover:bg-red-950/40 border border-red-900/40 cursor-pointer"><Trash2 className="w-3.5 h-3.5"/></button></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Name</label>
                  <input type="text" value={item.name||''} onChange={(e)=>update(idx,'name',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Organization</label>
                  <input type="text" value={item.organization||''} onChange={(e)=>update(idx,'organization',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Date</label>
                  <input type="text" value={item.date||''} onChange={(e)=>update(idx,'date',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
                <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Credential ID</label>
                  <input type="text" value={item.credentialId||''} onChange={(e)=>update(idx,'credentialId',e.target.value)} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              </div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Image URL</label>
                <input type="text" value={item.image||''} onChange={(e)=>update(idx,'image',e.target.value)} className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
              <div><label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Verify Link</label>
                <input type="text" value={item.verifyLink||''} onChange={(e)=>update(idx,'verifyLink',e.target.value)} className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"/></div>
            </div>
          ))}
          <button onClick={add} className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4"/> ADD CERTIFICATION
          </button>
        </div>
      );
    }}
  </SectionEditor>
);

export default CertificationsEditor;
