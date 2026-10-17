import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { FileText } from 'lucide-react';

const ResumeEditor = () => (
  <SectionEditor sectionKey="personal" title="Resume / CV" icon={FileText}>
    {(content, setContent) => {
      if (!content) return null;
      const update = (f, v) => setContent((prev) => ({ ...prev, [f]: v }));
      return (
        <div className="space-y-5">
          <div className="p-4 bg-zinc-800/50 border border-zinc-700">
            <p className="font-sans text-sm text-zinc-300 mb-4">
              Configure the resume/CV file that visitors can download or preview from your portfolio.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Resume File URL</label>
                <input type="text" value={content.resumeUrl||''} onChange={(e)=>update('resumeUrl',e.target.value)}
                  className="w-full bg-zinc-900 text-white font-mono text-xs px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  placeholder="/Muhammed_Alfas_Resume.pdf or https://..." />
                <p className="font-mono text-[10px] text-zinc-500 mt-1">Place the PDF in the /public folder or use a URL from Supabase Storage</p>
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">Download File Name</label>
                <input type="text" value={content.resumeFileName||''} onChange={(e)=>update('resumeFileName',e.target.value)}
                  className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                  placeholder="Muhammed_Alfas_Resume.pdf" />
              </div>
            </div>
          </div>
          {content.resumeUrl && (
            <div className="p-4 bg-zinc-800/50 border border-zinc-700">
              <p className="font-mono text-xs font-bold text-zinc-400 uppercase mb-2">Preview</p>
              <a href={content.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-mono text-xs font-bold border-2 border-black hover:bg-white transition-colors">
                <FileText className="w-4 h-4" />
                <span>OPEN RESUME</span>
              </a>
            </div>
          )}
        </div>
      );
    }}
  </SectionEditor>
);

export default ResumeEditor;
