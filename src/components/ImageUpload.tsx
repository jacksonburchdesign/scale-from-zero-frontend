import { useState, useRef } from 'react';
import { Camera, Spinner } from '@phosphor-icons/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { ImageCropperModal } from './ImageCropperModal';

interface ImageUploadProps {
  currentUrl?: string;
  projectId: string;
  type: 'banner' | 'logo';
  onUpload: (url: string) => Promise<void>;
  className?: string;
}

export default function ImageUpload({ currentUrl, projectId, type, onUpload, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large (max 5MB).");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImageSrc(reader.result?.toString() || null);
    });
    reader.readAsDataURL(file);
    
    // Clear the input so selecting the same file again works
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setSelectedImageSrc(null);
    setUploading(true);
    
    try {
      // Create a unique filename
      const fileName = `${type}_${Date.now()}.jpg`;
      const storageRef = ref(storage, `projects/${projectId}/${fileName}`);
      
      // Upload to Firebase Storage
      await uploadBytes(storageRef, croppedBlob);
      
      // Get download URL
      const downloadUrl = await getDownloadURL(storageRef);
      
      // Save URL to project doc
      await onUpload(downloadUrl);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div 
        className={`relative group overflow-hidden cursor-pointer ${className}`}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp" 
          onChange={handleFileChange}
        />
        
        {currentUrl ? (
          <img src={currentUrl} alt={type} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Camera size={type === 'logo' ? 24 : 32} className="text-zinc-600" />
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {uploading ? (
            <Spinner size={type === 'logo' ? 24 : 32} className="text-zinc-50 animate-spin" />
          ) : (
            <span className="text-zinc-50 font-medium flex items-center gap-2 text-sm shadow-sm">
              <Camera size={type === 'logo' ? 18 : 20} />
              {type === 'banner' ? 'Change Cover' : ''}
            </span>
          )}
        </div>
      </div>

      {selectedImageSrc && (
        <ImageCropperModal
          imageSrc={selectedImageSrc}
          type={type}
          onClose={() => setSelectedImageSrc(null)}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
}
