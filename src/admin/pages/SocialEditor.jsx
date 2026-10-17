import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { Share2 } from 'lucide-react';

const SocialEditor = () => (
  <SectionEditor sectionKey="social" title="Social & Contact Links" icon={Share2}>
    {(content, setContent) => {
      if (!content) return null;
      const update = (f, v) => setContent((prev) => ({ ...prev, [f]: v }));
      const fields = [
        { key: 'linkedin', label: 'LinkedIn URL' },
        { key: 'github', label: 'GitHub URL' },
        { key: 'instagram', label: 'Instagram URL' },
        { key: 'facebook', label: 'Facebook URL' },
        { key: 'twitter', label: 'Twitter / X URL' },
        { key: 'email', label: 'Email Address' },
      ];
      return (
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">{f.label}</label>
              <input type="text" value={content[f.key]||''} onChange={(e) => update(f.key, e.target.value)}
                className="w-full bg-zinc-800 text-white font-mono text-xs px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                placeholder={f.key === 'email' ? 'your@email.com' : 'https://...'} />
            </div>
          ))}
        </div>
      );
    }}
  </SectionEditor>
);

export default SocialEditor;
