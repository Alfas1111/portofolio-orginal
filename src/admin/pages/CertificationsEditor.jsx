import React, { useState } from 'react';
import SectionEditor from '../components/SectionEditor';
import { Award, Plus, Trash2, Upload, FileText, Download, ExternalLink, X, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import { compressAndReadFile } from '../../utils/fileHelpers';

const CertItem = ({ item, idx, update, remove }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(!item.image || item.image.startsWith('http'));

  const isPdf = item.fileType === 'pdf' ||
    item.image?.startsWith('data:application/pdf') ||
    item.image?.toLowerCase().endsWith('.pdf');

  const hasFile = Boolean(item.image);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const res = await compressAndReadFile(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.88,
        maxPdfSizeBytes: 4 * 1024 * 1024 // 4MB
      });

      update(idx, 'image', res.dataUrl);
      update(idx, 'fileName', res.fileName);
      update(idx, 'fileType', res.fileType);
      if (!item.name && file.name) {
        // Auto-fill cert name from file name if empty
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        update(idx, 'name', cleanName);
      }
    } catch (err) {
      console.error('File upload error:', err);
      setUploadError(err.message || 'Failed to process document file.');
    } finally {
      setUploading(false);
      // Reset input value so same file can be re-selected if needed
      e.target.value = '';
    }
  };

  const handleRemoveFile = () => {
    if (window.confirm('Remove this attached certificate document?')) {
      update(idx, 'image', '');
      update(idx, 'fileName', '');
      update(idx, 'fileType', '');
    }
  };

  return (
    <div className="p-4 sm:p-5 bg-zinc-800/60 border-2 border-zinc-700 hover:border-zinc-500 transition-colors space-y-4">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-yellow-400 text-black font-mono text-xs font-bold px-2">
            #{idx + 1}
          </span>
          <span className="font-mono text-xs font-bold text-white uppercase truncate max-w-[200px] sm:max-w-xs">
            {item.name || 'Untitled Certification'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => remove(idx)}
          className="px-2 py-1 text-red-400 hover:bg-red-950/60 border border-red-900/60 font-mono text-xs flex items-center gap-1 cursor-pointer transition-colors"
          title="Delete certification"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">DELETE</span>
        </button>
      </div>

      {/* Main Metadata Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[11px] font-bold text-yellow-400 uppercase mb-1">
            Certification Name *
          </label>
          <input
            type="text"
            value={item.name || ''}
            onChange={(e) => update(idx, 'name', e.target.value)}
            placeholder="e.g. AWS Certified Cloud Practitioner"
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] font-bold text-yellow-400 uppercase mb-1">
            Issuing Organization *
          </label>
          <input
            type="text"
            value={item.organization || ''}
            onChange={(e) => update(idx, 'organization', e.target.value)}
            placeholder="e.g. Amazon Web Services / Google Cloud"
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[11px] font-bold text-zinc-300 uppercase mb-1">
            Issue Date / Year
          </label>
          <input
            type="text"
            value={item.date || ''}
            onChange={(e) => update(idx, 'date', e.target.value)}
            placeholder="e.g. Aug 2024"
            className="w-full bg-zinc-900 text-white font-sans text-sm px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] font-bold text-zinc-300 uppercase mb-1">
            Credential ID
          </label>
          <input
            type="text"
            value={item.credentialId || ''}
            onChange={(e) => update(idx, 'credentialId', e.target.value)}
            placeholder="e.g. AWS-CCP-982147"
            className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      {/* DOCUMENT & CERTIFICATE UPLOAD SECTION */}
      <div className="p-3.5 bg-zinc-900/90 border border-yellow-400/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-yellow-400 uppercase flex items-center gap-1.5">
            <Award className="w-4 h-4 text-yellow-400" />
            Certificate Document / File
          </span>
          <span className="font-mono text-[10px] text-zinc-400">PDF, JPG, PNG, WEBP (Max 4MB)</span>
        </div>

        {uploadError && (
          <div className="p-2 bg-red-950/80 border border-red-800 text-red-300 font-mono text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Upload State / Attached File Display */}
        {hasFile ? (
          <div className="p-3 bg-zinc-950 border-2 border-yellow-400 space-y-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {isPdf ? (
                  <div className="p-2 bg-red-600 text-white rounded">
                    <FileText className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0">
                    <img src={item.image} alt="Certificate preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="font-mono text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs block">
                      {item.fileName || (isPdf ? 'Certificate_Document.pdf' : 'Certificate_Image')}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">
                    Format: {isPdf ? 'PDF Document' : 'Image File'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 bg-yellow-400 text-black hover:bg-yellow-300 font-mono text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>VIEW</span>
                </a>
                <a
                  href={item.image}
                  download={item.fileName || `${(item.name || 'Certificate').replace(/\s+/g, '_')}${isPdf ? '.pdf' : '.jpg'}`}
                  className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs flex items-center gap-1 transition-colors border border-zinc-700"
                >
                  <Download className="w-3 h-3" />
                  <span>DOWNLOAD</span>
                </a>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="px-2.5 py-1.5 bg-red-950/80 hover:bg-red-800 text-red-300 hover:text-white font-mono text-xs flex items-center gap-1 transition-colors border border-red-800"
                >
                  <X className="w-3 h-3" />
                  <span>REMOVE</span>
                </button>
              </div>
            </div>

            {/* Replace Button */}
            <div className="pt-2 border-t border-zinc-800 flex justify-end">
              <label className="text-[11px] font-mono text-yellow-400 hover:underline cursor-pointer flex items-center gap-1 font-bold">
                <Upload className="w-3 h-3" />
                <span>Replace with another file</span>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-700 hover:border-yellow-400 bg-zinc-950/60 hover:bg-zinc-950 text-zinc-300 hover:text-yellow-400 cursor-pointer transition-all">
              <Upload className="w-8 h-8 mb-2 text-yellow-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-center">
                {uploading ? 'Processing Document...' : 'CLICK TO UPLOAD CERTIFICATE DOCUMENT'}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 mt-1">
                Upload PDF document or Image (PNG, JPG, WEBP)
              </span>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-zinc-400 hover:text-yellow-400 underline cursor-pointer"
              >
                {showUrlInput ? 'Hide direct URL input' : 'Or enter direct URL instead'}
              </button>
            </div>
          </div>
        )}

        {/* Optional Direct URL Input */}
        {showUrlInput && (
          <div className="pt-2 border-t border-zinc-800">
            <label className="block font-mono text-[10px] font-bold text-zinc-400 uppercase mb-1">
              Direct File/Image URL (Optional Alternative)
            </label>
            <input
              type="text"
              value={item.image || ''}
              onChange={(e) => {
                update(idx, 'image', e.target.value);
                if (e.target.value.toLowerCase().endsWith('.pdf')) {
                  update(idx, 'fileType', 'pdf');
                }
              }}
              placeholder="https://... (or leave empty if uploaded above)"
              className="w-full bg-zinc-950 text-white font-mono text-xs px-3 py-1.5 border border-zinc-800 focus:border-yellow-400 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Online Verification Link */}
      <div>
        <label className="block font-mono text-[11px] font-bold text-zinc-300 uppercase mb-1">
          Online Verification Link (Credly / Issuer Portal)
        </label>
        <div className="relative">
          <input
            type="text"
            value={item.verifyLink || ''}
            onChange={(e) => update(idx, 'verifyLink', e.target.value)}
            placeholder="https://www.credly.com/badges/..."
            className="w-full bg-zinc-900 text-white font-mono text-xs px-3 py-2 pr-8 border border-zinc-700 focus:border-yellow-400 focus:outline-none"
          />
          {item.verifyLink && (
            <a
              href={item.verifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-yellow-400"
              title="Test verification link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const CertificationsEditor = () => (
  <SectionEditor sectionKey="certifications" title="Certifications & Documents" icon={Award}>
    {(content, setContent) => {
      if (!Array.isArray(content)) return <p className="text-zinc-500 font-mono text-xs">No certifications data.</p>;

      const add = () =>
        setContent((prev) => [
          ...prev,
          {
            id: `c_${Date.now()}`,
            name: '',
            organization: '',
            date: '',
            credentialId: '',
            image: '',
            fileName: '',
            fileType: '',
            verifyLink: ''
          }
        ]);

      const remove = (i) => {
        if (window.confirm('Delete this certification item?')) {
          setContent((prev) => prev.filter((_, idx) => idx !== i));
        }
      };

      const update = (i, f, v) =>
        setContent((prev) => {
          const u = [...prev];
          u[i] = { ...u[i], [f]: v };
          return u;
        });

      return (
        <div className="space-y-6">
          <div className="p-3.5 bg-yellow-400/10 border border-yellow-400/40 text-yellow-300 font-mono text-xs flex items-start gap-2.5">
            <Award className="w-4 h-4 shrink-0 text-yellow-400 mt-0.5" />
            <div>
              <strong className="text-white uppercase block">DOCUMENT UPLOAD ENABLED:</strong>
              You can now upload actual certification documents (PDFs, credentials, or certificate badge images) directly. They will be previewable and downloadable by visitors in high-contrast display.
            </div>
          </div>

          <div className="space-y-5">
            {content.map((item, idx) => (
              <CertItem
                key={item.id || idx}
                item={item}
                idx={idx}
                update={update}
                remove={remove}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={add}
            className="w-full p-4 border-2 border-dashed border-zinc-700 hover:border-yellow-400 text-zinc-300 hover:text-yellow-400 bg-zinc-900/40 hover:bg-zinc-900 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" /> ADD NEW CERTIFICATION
          </button>
        </div>
      );
    }}
  </SectionEditor>
);

export default CertificationsEditor;
