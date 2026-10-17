import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { BarChart3 } from 'lucide-react';

const StatsEditor = () => (
  <SectionEditor sectionKey="stats" title="Stats & Metrics" icon={BarChart3}>
    {(content, setContent) => {
      if (!content) return null;
      const update = (field, value) => setContent((prev) => ({ ...prev, [field]: value }));
      const fields = [
        { key: 'learningYears', label: 'Years Learning', placeholder: '02+' },
        { key: 'projectsCount', label: 'Projects Count', placeholder: '10+' },
        { key: 'certsCount', label: 'Certifications Count', placeholder: '05+' },
        { key: 'ideasCount', label: 'Ideas Count', placeholder: '∞' },
      ];
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">{f.label}</label>
              <input type="text" value={content[f.key] || ''} onChange={(e) => update(f.key, e.target.value)} placeholder={f.placeholder}
                className="w-full bg-zinc-800 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none" />
            </div>
          ))}
        </div>
      );
    }}
  </SectionEditor>
);

export default StatsEditor;
