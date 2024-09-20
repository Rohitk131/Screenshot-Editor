import React, { useState, useEffect, useRef } from 'react';

interface ImageSizerProps {
  src: string;
  onUpdate: (size: { width: number; height: number }) => void;
  initialSize: { width: number; height: number };
  containerSize: { width: number; height: number };
  onFinishResize: () => void;
}

const ImageSizer: React.FC<ImageSizerProps> = ({ src, onUpdate, initialSize, containerSize, onFinishResize }) => {
  const [size, setSize] = useState(initialSize);
  const isResizingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && !isResizingRef.current) {
        onFinishResize();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onFinishResize]);

  const handleResize = (e: React.MouseEvent, corner: string) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    isResizingRef.current = true;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (corner.includes('e')) newWidth += dx;
      if (corner.includes('s')) newHeight += dy;
      if (corner.includes('w')) newWidth -= dx;
      if (corner.includes('n')) newHeight -= dy;

      newWidth = Math.max(50, Math.min(newWidth, containerSize.width));
      newHeight = Math.max(50, Math.min(newHeight, containerSize.height));

      setSize({ width: newWidth, height: newHeight });
      onUpdate({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      isResizingRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <img src={src} alt="Resizable" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {['nw', 'ne', 'sw', 'se'].map((corner) => (
        <div
          key={corner}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: 'white',
            border: '1px solid black',
            cursor: `${corner}-resize`,
            top: corner.includes('n') ? '-5px' : 'auto',
            bottom: corner.includes('s') ? '-5px' : 'auto',
            left: corner.includes('w') ? '-5px' : 'auto',
            right: corner.includes('e') ? '-5px' : 'auto',
          }}
          onMouseDown={(e) => handleResize(e, corner)}
        />
      ))}
    </div>
  );
};

export default ImageSizer;