import React, { useState, useRef, useEffect } from 'react';

interface DraggableResizableImageProps {
  src: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  containerSize: { width: number; height: number };
}

const DraggableResizableImage: React.FC<DraggableResizableImageProps> = ({
  src,
  initialPosition,
  initialSize,
  onPositionChange,
  onSizeChange,
  containerSize,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const imageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === imageRef.current) {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;

      setPosition((prev) => {
        const newX = Math.max(0, Math.min(prev.x + dx, containerSize.width - size.width));
        const newY = Math.max(0, Math.min(prev.y + dy, containerSize.height - size.height));
        return { x: newX, y: newY };
      });

      lastPosition.current = { x: e.clientX, y: e.clientY };
    } else if (isResizing.current) {
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;

      setSize((prev) => {
        const newWidth = Math.max(50, Math.min(prev.width + dx, containerSize.width - position.x));
        const newHeight = Math.max(50, Math.min(prev.height + dy, containerSize.height - position.y));
        return { width: newWidth, height: newHeight };
      });

      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      onPositionChange(position);
    } else if (isResizing.current) {
      onSizeChange(size);
    }
    isDragging.current = false;
    isResizing.current = false;
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    isResizing.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
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
    <div
      ref={imageRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: 'move',
      }}
      onMouseDown={handleMouseDown}
    >
      <img src={src} alt="Draggable" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
      <div
        style={{
          position: 'absolute',
          right: '-5px',
          bottom: '-5px',
          width: '10px',
          height: '10px',
          background: 'white',
          border: '1px solid black',
          cursor: 'se-resize',
        }}
        onMouseDown={handleResizeStart}
      />
    </div>
  );
};

export default DraggableResizableImage;