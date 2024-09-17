import React, { useState, useRef, useEffect } from 'react';

interface CropToolProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
}

const CropTool: React.FC<CropToolProps> = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const { left, top } = containerRef.current!.getBoundingClientRect();
    const startX = e.clientX - left;
    const startY = e.clientY - top;
    setCrop({ x: startX, y: startY, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
    const endX = Math.min(Math.max(e.clientX - left, 0), width);
    const endY = Math.min(Math.max(e.clientY - top, 0), height);
    setCrop(prev => ({
      x: Math.min(prev.x, endX),
      y: Math.min(prev.y, endY),
      width: Math.abs(endX - prev.x),
      height: Math.abs(endY - prev.y),
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    cropImage();
  };

  const cropImage = () => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const scaleX = img.width / containerRef.current!.clientWidth;
      const scaleY = img.height / containerRef.current!.clientHeight;
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          img,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
        onCropComplete(canvas.toDataURL('image/png'));
      }
    };
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
      <img src={image} alt="Crop preview" className="w-full h-full object-contain" />
      <div 
        className="absolute border-2 border-white"
        style={{
          left: `${crop.x}px`,
          top: `${crop.y}px`,
          width: `${crop.width}px`,
          height: `${crop.height}px`,
        }}
      />
    </div>
  );
};

export default CropTool;