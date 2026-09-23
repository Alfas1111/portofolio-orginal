import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ZoomIn, ZoomOut, RotateCw, Move, Upload, Save, Trash2, Check } from 'lucide-react';

export const ImageCropperModal = () => {
  const { data, updateData, isCropperOpen, setIsCropperOpen } = usePortfolio();
  const { personal } = data;

  const [imageUrl, setImageUrl] = useState(personal.profileImage || '');
  const [zoom, setZoom] = useState(personal.imagePosition?.zoom || 1);
  const [posX, setPosX] = useState(personal.imagePosition?.x || 0);
  const [posY, setPosY] = useState(personal.imagePosition?.y || 0);
  const [rotate, setRotate] = useState(personal.imagePosition?.rotate || 0);

  if (!isCropperOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        profileImage: imageUrl,
        imagePosition: { zoom, x: posX, y: posY, rotate }
      }
    }));
    setIsCropperOpen(false);
  };

  const handleResetPosition = () => {
    setZoom(1);
    setPosX(0);
    setPosY(0);
    setRotate(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-black text-white border-4 border-yellow-400 w-full max-w-xl p-6 shadow-[16px_16px_0px_#000] space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h3 className="font-display text-2xl font-bold uppercase text-yellow-400">
            PROFILE PHOTO EDITOR
          </h3>
          <button
            onClick={() => setIsCropperOpen(false)}
            className="p-1 text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Live Preview Frame */}
        <div className="relative aspect-[4/5] max-w-xs mx-auto overflow-hidden border-4 border-yellow-400 bg-zinc-900 shadow-[6px_6px_0px_#000]">
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              transform: `scale(${zoom}) translate(${posX}px, ${posY}px) rotate(${rotate}deg)`,
            }}
            className="w-full h-full object-cover transition-transform duration-100"
          />
        </div>

        {/* Upload File or URL */}
        <div className="space-y-3">
          <label className="font-mono text-xs font-bold text-yellow-400 block uppercase">
            UPLOAD NEW PHOTO OR PASTE IMAGE URL
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-xs file:font-mono file:font-bold file:bg-yellow-400 file:text-black hover:file:bg-white"
            />
          </div>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 font-mono text-xs outline-none focus:border-yellow-400"
          />
        </div>

        {/* Transformation Controls */}
        <div className="space-y-4 pt-2 border-t border-zinc-800 font-mono text-xs">
          {/* Zoom Slider */}
          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>ZOOM SCALE ({zoom.toFixed(2)}x)</span>
              <button onClick={() => setZoom(1)} className="hover:text-yellow-400">RESET</button>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-yellow-400"
            />
          </div>

          {/* Position X & Y Sliders */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-400 block mb-1">PAN HORIZONTAL ({posX}px)</span>
              <input
                type="range"
                min="-150"
                max="150"
                value={posX}
                onChange={(e) => setPosX(parseInt(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">PAN VERTICAL ({posY}px)</span>
              <input
                type="range"
                min="-150"
                max="150"
                value={posY}
                onChange={(e) => setPosY(parseInt(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>
          </div>

          {/* Rotate Slider */}
          <div>
            <span className="text-zinc-400 block mb-1">ROTATION ({rotate} deg)</span>
            <input
              type="range"
              min="-180"
              max="180"
              value={rotate}
              onChange={(e) => setRotate(parseInt(e.target.value))}
              className="w-full accent-yellow-400"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
          <button
            onClick={handleResetPosition}
            className="px-4 py-2 bg-zinc-800 text-zinc-300 font-mono text-xs font-bold hover:bg-zinc-700"
          >
            RESET ALL
          </button>

          <button
            onClick={handleSave}
            className="brutal-btn bg-yellow-400 text-black hover:bg-white px-6 py-2.5 text-xs font-extrabold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE & APPLY PHOTO</span>
          </button>
        </div>

      </div>
    </div>
  );
};
