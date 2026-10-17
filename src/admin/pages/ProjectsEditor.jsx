import React from 'react';
import SectionEditor from '../components/SectionEditor';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

const ProjectsEditor = () => {
  return (
    <SectionEditor sectionKey="projects" title="Projects" icon={FolderGit2}>
      {(content, setContent) => {
        if (!content || !Array.isArray(content)) return <p className="text-zinc-500 font-mono text-xs">No projects data.</p>;

        const addProject = () => {
          setContent((prev) => [
            ...prev,
            {
              id: `p${Date.now()}`,
              title: '',
              category: '',
              image: '',
              shortDescription: '',
              fullDescription: '',
              technologies: [],
              github: '',
              demo: '',
              date: new Date().getFullYear().toString()
            }
          ]);
        };

        const removeProject = (index) => {
          if (!window.confirm('Delete this project?')) return;
          setContent((prev) => prev.filter((_, i) => i !== index));
        };

        const updateProject = (index, field, value) => {
          setContent((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
          });
        };

        const updateTechs = (index, value) => {
          updateProject(index, 'technologies', value.split(',').map((t) => t.trim()).filter(Boolean));
        };

        return (
          <div className="space-y-6">
            {content.map((project, idx) => (
              <div key={project.id || idx} className="p-4 bg-zinc-800/50 border border-zinc-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-yellow-400 uppercase">Project #{idx + 1}</span>
                  <button onClick={() => removeProject(idx)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Title</label>
                    <input type="text" value={project.title || ''} onChange={(e) => updateProject(idx, 'title', e.target.value)}
                      className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Category</label>
                    <input type="text" value={project.category || ''} onChange={(e) => updateProject(idx, 'category', e.target.value)}
                      className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Image URL</label>
                  <input type="text" value={project.image || ''} onChange={(e) => updateProject(idx, 'image', e.target.value)}
                    className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Short Description</label>
                  <textarea value={project.shortDescription || ''} onChange={(e) => updateProject(idx, 'shortDescription', e.target.value)}
                    rows={2} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y" />
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Full Description</label>
                  <textarea value={project.fullDescription || ''} onChange={(e) => updateProject(idx, 'fullDescription', e.target.value)}
                    rows={3} className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none resize-y" />
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Technologies (comma-separated)</label>
                  <input type="text" value={(project.technologies || []).join(', ')} onChange={(e) => updateTechs(idx, e.target.value)}
                    className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
                    placeholder="React, Node.js, Tailwind CSS" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">GitHub URL</label>
                    <input type="text" value={project.github || ''} onChange={(e) => updateProject(idx, 'github', e.target.value)}
                      className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Demo URL</label>
                    <input type="text" value={project.demo || ''} onChange={(e) => updateProject(idx, 'demo', e.target.value)}
                      className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">Year</label>
                    <input type="text" value={project.date || ''} onChange={(e) => updateProject(idx, 'date', e.target.value)}
                      className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none" />
                  </div>
                </div>
              </div>
            ))}

            <button onClick={addProject}
              className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-400 hover:text-yellow-400 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <Plus className="w-4 h-4" /> ADD NEW PROJECT
            </button>
          </div>
        );
      }}
    </SectionEditor>
  );
};

export default ProjectsEditor;
