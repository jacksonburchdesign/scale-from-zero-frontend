import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check } from '@phosphor-icons/react';
import getCroppedImg from '../utils/cropImage';

export type CropType = 'banner' | 'logo';

interface ImageCropperModalProps {
  imageSrc: string;
  type: CropType;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob) => void;
}

export function ImageCropperModal({ imageSrc, type, onClose, onCropComplete }: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const aspect = type === 'banner' ? 3 / 1 : 1 / 1;
  const recommendedText = type === 'banner' ? 'Recommended Size: 1500x500 (3:1 Ratio)' : 'Recommended Size: 400x400 (1:1 Ratio)';

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const handleCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
      if (croppedImageBlob) {
        onCropComplete(croppedImageBlob);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-zinc-50">Crop {type === 'banner' ? 'Cover Image' : 'Logo'}</h3>
            <p className="text-xs text-purple-400 mt-1 font-medium">{recommendedText}</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-50 transition-colors bg-zinc-800/50 hover:bg-zinc-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative w-full h-[400px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={handleCropComplete}
            onZoomChange={onZoomChange}
            cropShape={type === 'logo' ? 'round' : 'rect'}
            showGrid={false}
          />
        </div>

        {/* Footer / Controls */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm text-zinc-400 font-medium whitespace-nowrap">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(Number(e.target.value));
              }}
              className="w-full sm:w-48 accent-purple-500"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button 
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleApplyCrop}
              disabled={isProcessing}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-zinc-50 bg-purple-600 hover:bg-purple-500 transition-colors rounded-lg shadow-sm disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : (
                <>
                  <Check size={16} weight="bold" />
                  Apply Crop
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
