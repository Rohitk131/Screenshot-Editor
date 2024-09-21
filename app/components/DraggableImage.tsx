import React, { useState, useRef, useEffect } from 'react';

interface DraggableImageProps {
  src: string;
  initialPosition: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  containerSize: { width: number; height: number };
  imageSize: { width: number; height: number };
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  src,
  initialPosition,
  onPositionChange,
  containerSize,
  imageSize,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const imageRef = useRef<HTMLImageElement>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastPosition.current.x;
    const dy = e.clientY - lastPosition.current.y;

    setPosition((prev) => {
      const newX = Math.max(0, Math.min(prev.x + dx, containerSize.width - imageSize.width));
      const newY = Math.max(0, Math.min(prev.y + dy, containerSize.height - imageSize.height));
      return { x: newX, y: newY };
    });

    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    onPositionChange(position);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt="Draggable"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${imageSize.width}px`,
        height: `${imageSize.height}px`,
        cursor: 'move',
      }}
      onMouseDown={handleMouseDown}
      draggable={false}
    />
  );
};

export default DraggableImage;