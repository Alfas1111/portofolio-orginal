import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Award, Download, Edit2, FileText, CheckCircle } from 'lucide-react';

export const CertModal = () => {
  const { certModalData, setCertModalData, openAdminTab } = usePortfolio();

  if (!certModalData) return null;

  const isPdf = certModalData.image?.startsWith('data:application/pdf') ||
    certModalData.image?.toLowerCase().endsWith('.pdf') ||
    certModalData.fileType === 'pdf';

  const hasFile = Boolean(certModalData.image);

  const handleEditClick = () => {
    setCertModalData(null);
    openAdminTab('certifications');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-3xl p-4 sm:p-6 shadow-[6px_6px_0px_#000] sm:shadow-[16px_16px_0px_#000] space-y-4 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 bg-yellow-400 text-black shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading text-base sm:text-xl font-bold uppercase text-white truncate">
                {certModalData.name}
              </h3>
              <span className="font-mono text-[11px] text-yellow-400 font-bold block truncate">
                ISSUED BY: {certModalData.organization} {certModalData.date ? `(${certModalData.date})` : ''}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleEditClick}
              className="p-1.5 bg-zinc-900 border border-zinc-700 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors text-xs font-mono font-bold flex items-center gap-1"
              title="Edit this certificate in CMS"
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">EDIT</span>
            </button>
            <button
              onClick={() => setCertModalData(null)}
              className="p-1.5 bg-zinc-800 text-zinc-300 hover:bg-yellow-400 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display (PDF or Image) */}
        {hasFile ? (
          isPdf ? (
            <div className="w-full h-[60vh] min-h-[380px] bg-zinc-950 border-2 border-yellow-400 overflow-hidden relative rounded flex flex-col">
              <div className="bg-zinc-900 px-3 py-2 border-b border-zinc-800 flex items-center justify-between font-mono text-xs text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-yellow-400" />
                  <span>PDF CERTIFICATE DOCUMENT</span>
                </span>
                <a
                  href={certModalData.image}
                  download={certModalData.fileName || `${certModalData.name.replace(/\s+/g, '_')}_Certificate.pdf`}
                  className="text-yellow-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD PDF</span>
                </a>
              </div>
              <iframe
                src={certModalData.image}
                title={certModalData.name}
                className="w-full flex-1 border-none bg-zinc-900"
              />
            </div>
          ) : (
            <div className="max-h-[60vh] border-2 border-yellow-400 overflow-hidden bg-zinc-950 flex items-center justify-center">
              <img
                src={certModalData.image}
                alt={certModalData.name}
                className="w-full max-h-[58vh] object-contain"
              />
            </div>
          )
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-zinc-800 bg-zinc-950 space-y-3 font-mono text-xs text-zinc-400">
            <Award className="w-12 h-12 text-zinc-600 mx-auto" />
            <p className="font-bold text-zinc-300">NO CERTIFICATE FILE HAS BEEN UPLOADED YET.</p>
            <button
              onClick={handleEditClick}
              className="brutal-btn bg-yellow-400 text-black px-4 py-2 font-bold inline-flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>UPLOAD YOUR CERTIFICATE NOW</span>
            </button>
          </div>
        )}

        {/* Certificate Metadata & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-zinc-300 pt-3 border-t border-zinc-800">
          <div className="space-y-1">
            {certModalData.credentialId && (
              <div>
                CREDENTIAL ID: <strong className="text-white bg-zinc-900 px-2 py-0.5 border border-zinc-800">{certModalData.credentialId}</strong>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {hasFile && (
              <a
                href={certModalData.image}
                download={certModalData.fileName || `${certModalData.name.replace(/\s+/g, '_')}_Certificate${isPdf ? '.pdf' : '.jpg'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn bg-yellow-400 text-black hover:bg-white hover:text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD FILE</span>
              </a>
            )}

            {certModalData.verifyLink && (
              <a
                href={certModalData.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn bg-white text-black hover:bg-yellow-400 hover:text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
              >
                <span>VERIFY ISSUER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
