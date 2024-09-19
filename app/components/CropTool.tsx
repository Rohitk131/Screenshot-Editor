import React, { useState, useRef, useEffect } from 'react';

interface CropToolProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
}

const CropTool: React.FC<CropToolProps> = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const { left, top } = containerRef.current!.getBoundingClientRect();
    const startX = e.clientX - left;
    const startY = e.clientY - top;
    setCrop({ startX, startY, endX: startX, endY: startY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
    const endX = Math.min(Math.max(e.clientX - left, 0), width);
    const endY = Math.min(Math.max(e.clientY - top, 0), height);
    setCrop(prev => ({ ...prev, endX, endY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (crop.startX !== crop.endX && crop.startY !== crop.endY) {
      cropImage();
    }
  };

  const cropImage = () => {
    const canvas = document.createElement('canvas');
    const img = imageRef.current;
    if (!img) return;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const cropX = Math.min(crop.startX, crop.endX);
    const cropY = Math.min(crop.startY, crop.endY);
    const cropWidth = Math.abs(crop.endX - crop.startX);
    const cropHeight = Math.abs(crop.endY - crop.startY);

    canvas.width = cropWidth * scaleX;
    canvas.height = cropHeight * scaleY;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        img,
        cropX * scaleX,
        cropY * scaleY,
        cropWidth * scaleX,
        cropHeight * scaleY,
        0,
        0,
        cropWidth * scaleX,
        cropHeight * scaleY
      );
      onCropComplete(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img 
        ref={imageRef}
        src={image} 
        alt="Crop preview" 
        className="w-full h-full object-contain"
      />
      {isDragging && (
        <div 
          className="absolute border-2 border-white"
          style={{
            left: `${Math.min(crop.startX, crop.endX)}px`,
            top: `${Math.min(crop.startY, crop.endY)}px`,
            width: `${Math.abs(crop.endX - crop.startX)}px`,
            height: `${Math.abs(crop.endY - crop.startY)}px`,
          }}
        />
      )}
    </div>
  );
};

export default CropTool;