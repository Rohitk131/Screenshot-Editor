import React, { useState, useEffect, useRef } from 'react';

interface ThreeDImageProps {
  children: React.ReactNode;
  className?: string;
  effect3D: boolean;
  effect3DIntensity: number;
  style?: React.CSSProperties;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function ThreeDImage({
  children,
  className = '',
  effect3D,
  effect3DIntensity,
  style,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave
}: ThreeDImageProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!effect3D) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * 20 * (effect3DIntensity / 100);
    const rotateY = (x / rect.width - 0.5) * 20 * (effect3DIntensity / 100);
    setRotation({ x: rotateX, y: rotateY });
    onMouseMove && onMouseMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setRotation({ x: 0, y: 0 });
    onMouseLeave && onMouseLeave(e);
  };

  return (
    <div
      ref={containerRef}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      <div
        style={{
          transform: effect3D ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
          transition: 'transform 0.2s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
}