/**
 * File helper utilities for client-side image compression and document handling.
 * Converts uploaded files (images & PDFs) to optimized Data URLs for local storage.
 */

export const compressAndReadFile = (file, options = {}) => {
  const {
    maxWidth = 1400,
    maxHeight = 1400,
    quality = 0.85,
    maxPdfSizeBytes = 4 * 1024 * 1024 // 4 MB safety limit for localStorage
  } = options;

  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided.'));
    }

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isImage && !isPdf) {
      return reject(new Error('Please upload an image file (PNG, JPG, WEBP) or a PDF certificate document.'));
    }

    if (isPdf && file.size > maxPdfSizeBytes) {
      return reject(new Error(`PDF file size is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Please upload a PDF under 4MB.`));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    if (isPdf) {
      reader.onload = (e) => {
        resolve({
          dataUrl: e.target.result,
          fileType: 'pdf',
          fileName: file.name,
          sizeBytes: file.size
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    // It's an image - let's optimize & compress to avoid blowing local storage limits
    reader.onload = (e) => {
      const rawDataUrl = e.target.result;

      // If SVG or small gif, don't re-compress on canvas
      if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
        return resolve({
          dataUrl: rawDataUrl,
          fileType: 'image',
          fileName: file.name,
          sizeBytes: file.size
        });
      }

      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data url if image failed to load in element
        resolve({
          dataUrl: rawDataUrl,
          fileType: 'image',
          fileName: file.name,
          sizeBytes: file.size
        });
      };

      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale down if exceeds max bounds
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve({
              dataUrl: rawDataUrl,
              fileType: 'image',
              fileName: file.name,
              sizeBytes: file.size
            });
          }

          // Use white background for transparent images converted to JPEG
          if (file.type === 'image/png') {
            // Check if user uploaded PNG - if small, keep PNG
            if (file.size < 500 * 1024) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedUrl = canvas.toDataURL('image/png');
              return resolve({
                dataUrl: compressedUrl,
                fileType: 'image',
                fileName: file.name,
                sizeBytes: compressedUrl.length
              });
            }
          }

          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Output as JPEG
          const compressedUrl = canvas.toDataURL('image/jpeg', quality);

          resolve({
            dataUrl: compressedUrl,
            fileType: 'image',
            fileName: file.name,
            sizeBytes: compressedUrl.length
          });
        } catch (err) {
          console.warn('Canvas compression error, falling back to original data URL', err);
          resolve({
            dataUrl: rawDataUrl,
            fileType: 'image',
            fileName: file.name,
            sizeBytes: file.size
          });
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
};
