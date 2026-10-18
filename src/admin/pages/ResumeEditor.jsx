import React, { useState } from 'react';
import SectionEditor from '../components/SectionEditor';
import { FileText, Upload, Download, ExternalLink, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { compressAndReadFile } from '../../utils/fileHelpers';

const ResumeForm = ({ content, setContent }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);

  if (!content) return null;

  const update = (f, v) => setContent((prev) => ({ ...prev, [f]: v }));

      const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadError(null);

        try {
          const res = await compressAndReadFile(file, {
            maxPdfSizeBytes: 6 * 1024 * 1024 // 6MB limit
          });

          update('resumeUrl', res.dataUrl);
          update('resumeFileName', res.fileName || file.name);
        } catch (err) {
          console.error('Resume upload error:', err);
          setUploadError(err.message || 'Failed to upload PDF resume.');
        } finally {
          setUploading(false);
          e.target.value = '';
        }
      };

      const handleResetToDefault = () => {
        if (window.confirm('Reset to standard bundled resume (/Muhammed_Alfas_Resume.pdf)?')) {
          update('resumeUrl', '/Muhammed_Alfas_Resume.pdf');
          update('resumeFileName', 'Muhammed_Alfas_Resume.pdf');
        }
      };

      return (
        <div className="space-y-5">
          <div className="p-4 bg-zinc-800/50 border border-zinc-700 space-y-4">
            <p className="font-sans text-sm text-zinc-300">
              Upload your official Resume / CV PDF document. Visitors can preview it directly in the interactive viewer modal or download it to their device.
            </p>

            {uploadError && (
              <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 font-mono text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Direct File Upload Zone */}
            <div className="p-4 bg-zinc-900 border-2 border-yellow-400/40 space-y-3">
              <span className="font-mono text-xs font-bold text-yellow-400 uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Upload New Resume (PDF)
              </span>

              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-700 hover:border-yellow-400 bg-zinc-950 text-zinc-300 hover:text-yellow-400 cursor-pointer transition-all">
                <Upload className="w-8 h-8 mb-2 text-yellow-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-center">
                  {uploading ? 'Processing Resume Document...' : 'CLICK TO UPLOAD RESUME PDF'}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 mt-1">
                  Supports PDF format up to 6MB
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Current Active Resume Details */}
            {content.resumeUrl && (
              <div className="p-4 bg-zinc-900 border-2 border-yellow-400 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2.5 bg-red-600 text-white rounded shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        <span className="font-mono text-xs font-bold text-white truncate max-w-[220px] sm:max-w-md block">
                          {content.resumeFileName || 'Muhammed_Alfas_Resume.pdf'}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {content.resumeUrl.startsWith('data:') ? 'Custom Uploaded Document (Stored in Portfolio Data)' : 'Hosted Asset / Public File'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <a
                      href={content.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-yellow-400 text-black hover:bg-yellow-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>PREVIEW</span>
                    </a>
                    <a
                      href={content.resumeUrl}
                      download={content.resumeFileName || 'Muhammed_Alfas_Resume.pdf'}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs flex items-center gap-1.5 transition-colors border border-zinc-700"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD</span>
                    </a>
                  </div>
                </div>

                {/* Reset button if custom */}
                {content.resumeUrl.startsWith('data:') && (
                  <div className="pt-2 border-t border-zinc-800 flex justify-end">
                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      className="text-[11px] font-mono text-zinc-400 hover:text-red-400 underline cursor-pointer"
                    >
                      Reset to default bundled PDF
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Custom Download File Name */}
            <div>
              <label className="block font-mono text-xs font-bold text-yellow-400 uppercase mb-1.5">
                Download File Name for Visitors
              </label>
              <input
                type="text"
                value={content.resumeFileName || ''}
                onChange={(e) => update('resumeFileName', e.target.value)}
                className="w-full bg-zinc-900 text-white font-sans text-sm px-4 py-2.5 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                placeholder="Muhammed_Alfas_BCA_SoftwareEngineer_Resume.pdf"
              />
            </div>

            {/* URL Toggle Alternative */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-xs font-mono text-zinc-400 hover:text-yellow-400 underline cursor-pointer"
              >
                {showUrlInput ? 'Hide URL input' : 'Or enter custom external URL manually'}
              </button>
              {showUrlInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={content.resumeUrl || ''}
                    onChange={(e) => update('resumeUrl', e.target.value)}
                    className="w-full bg-zinc-900 text-white font-mono text-xs px-4 py-2 border-2 border-zinc-700 focus:border-yellow-400 focus:outline-none"
                    placeholder="/Muhammed_Alfas_Resume.pdf or https://..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
  );
};

const ResumeEditor = () => (
  <SectionEditor sectionKey="personal" title="Resume / CV Document" icon={FileText}>
    {(content, setContent) => <ResumeForm content={content} setContent={setContent} />}
  </SectionEditor>
);

export default ResumeEditor;
