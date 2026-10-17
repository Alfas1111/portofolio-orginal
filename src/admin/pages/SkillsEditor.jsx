import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { Code, Plus, Trash2 } from 'lucide-react';

const SkillsEditor = () => (
  <SectionEditor sectionKey="skills" title="Skills & Capabilities" icon={Code}>
    {(content, setContent) => {
      if (!content || typeof content !== 'object') return <p className="text-zinc-500 font-mono text-xs">No skills data.</p>;

      const addCategory = () => {
        const name = window.prompt('Enter new category name (e.g., "DevOps"):');
        if (!name?.trim()) return;
        setContent((prev) => ({ ...prev, [name.trim()]: [] }));
      };

      const removeCategory = (cat) => {
        if (!window.confirm(`Delete the entire "${cat}" category?`)) return;
        setContent((prev) => {
          const next = { ...prev };
          delete next[cat];
          return next;
        });
      };

      const addSkill = (cat) => {
        setContent((prev) => ({
          ...prev,
          [cat]: [...(prev[cat] || []), { name: '', level: 'Intermediate', badge: '' }]
        }));
      };

      const removeSkill = (cat, idx) => {
        setContent((prev) => ({
          ...prev,
          [cat]: (prev[cat] || []).filter((_, i) => i !== idx)
        }));
      };

      const updateSkill = (cat, idx, field, value) => {
        setContent((prev) => {
          const updated = [...(prev[cat] || [])];
          updated[idx] = { ...updated[idx], [field]: value };
          return { ...prev, [cat]: updated };
        });
      };

      return (
        <div className="space-y-6">
          {Object.entries(content).map(([category, skills]) => (
            <div key={category} className="p-4 bg-zinc-800/50 border border-zinc-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-sm font-bold text-white uppercase">{category}</h3>
                <button onClick={() => removeCategory(category)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {(skills || []).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 flex-wrap">
                    <input type="text" value={skill.name || ''} onChange={(e) => updateSkill(category, idx, 'name', e.target.value)} placeholder="Skill name"
                      className="flex-1 min-w-[120px] bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                    <select value={skill.level || 'Intermediate'} onChange={(e) => updateSkill(category, idx, 'level', e.target.value)}
                      className="bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none cursor-pointer">
                      <option>Expert</option><option>Advanced</option><option>Proficient</option><option>Intermediate</option><option>Beginner</option>
                    </select>
                    <input type="text" value={skill.badge || ''} onChange={(e) => updateSkill(category, idx, 'badge', e.target.value)} placeholder="Badge text"
                      className="flex-1 min-w-[100px] bg-zinc-900 text-white font-sans text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                    <button onClick={() => removeSkill(category, idx)} className="p-1.5 text-red-400 hover:bg-red-950/40 cursor-pointer">×</button>
                  </div>
                ))}
                <button onClick={() => addSkill(category)}
                  className="px-3 py-1.5 font-mono text-[10px] font-bold text-yellow-400 border border-yellow-400/40 hover:bg-yellow-400/10 cursor-pointer">+ ADD SKILL</button>
              </div>
            </div>
          ))}
          <button onClick={addCategory}
            className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Plus className="w-4 h-4" /> ADD CATEGORY
          </button>
        </div>
      );
    }}
  </SectionEditor>
);

export default SkillsEditor;
