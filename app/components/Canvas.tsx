'use client'

import { useEffect, useRef, useState } from 'react';
import { EditorState } from '../types';

interface CanvasProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export default function Canvas({ editorState, setEditorState }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && editorState.image) {
      const img = new Image();
      img.src = editorState.image;
      img.onload = () => {
        canvas.width = img.width + editorState.padding * 2;
        canvas.height = img.height + editorState.padding * 2;
  
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Apply background
        if (editorState.background !== 'none') {
          if (editorState.background.startsWith('linear-gradient')) {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const colors = editorState.background.match(/#[0-9a-fA-F]{6}/g);
            if (colors) {
              const step = 1 / (colors.length - 1);
              colors.forEach((color, index) => {
                gradient.addColorStop(index * step, color);
              });
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
          } else {
            ctx.fillStyle = editorState.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        }
  
        // Apply padding and draw the image
        ctx.drawImage(img, editorState.padding, editorState.padding, img.width, img.height);
  
        // Apply inset
        if (editorState.inset > 0) {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.lineWidth = editorState.inset;
          ctx.strokeRect(
            editorState.padding + editorState.inset / 2,
            editorState.padding + editorState.inset / 2,
            img.width - editorState.inset,
            img.height - editorState.inset
          );
        }
  
        // Apply shadow
        if (editorState.shadow > 0) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = editorState.shadow;
          ctx.drawImage(img, editorState.padding, editorState.padding, img.width, img.height);
        }
  
        // Apply corner radius
        if (editorState.cornerRadius > 0) {
          ctx.globalCompositeOperation = 'destination-in';
          ctx.beginPath();
          ctx.moveTo(editorState.padding + editorState.cornerRadius, editorState.padding);
          ctx.arcTo(
            editorState.padding + img.width,
            editorState.padding,
            editorState.padding + img.width,
            editorState.padding + img.height,
            editorState.cornerRadius
          );
          ctx.arcTo(
            editorState.padding + img.width,
            editorState.padding + img.height,
            editorState.padding,
            editorState.padding + img.height,
            editorState.cornerRadius
          );
          ctx.arcTo(
            editorState.padding,
            editorState.padding + img.height,
            editorState.padding,
            editorState.padding,
            editorState.cornerRadius
          );
          ctx.arcTo(
            editorState.padding,
            editorState.padding,
            editorState.padding + img.width,
            editorState.padding,
            editorState.cornerRadius
          );
          ctx.closePath();
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }
  
        // Apply filters
        if (editorState.filter !== 'none') {
          ctx.filter = getFilterString(editorState);
          ctx.drawImage(canvas, 0, 0);
        }
  
        // Save the edited image to the editor state
        const editedImage = canvas.toDataURL('image/png');
        setEditorState(prev => ({ ...prev, image: editedImage }));
      };
    }
  }, [editorState]);
  
  

  const getFilterString = (state: EditorState) => {
    const filters = [];
    if (state.filter === 'grayscale') filters.push('grayscale(100%)');
    if (state.filter === 'sepia') filters.push('sepia(100%)');
    if (state.filter === 'blur') filters.push('blur(5px)');
    if (state.filter === 'invert') filters.push('invert(100%)');
    if (state.filter === 'brightness') filters.push(`brightness(${state.brightness}%)`);
    if (state.filter === 'contrast') filters.push(`contrast(${state.contrast}%)`);
    return filters.join(' ');
  };

  const startDrawing = (e: React.MouseEvent) => {
    isDrawing.current = true;
    draw(e);
  };

  const endDrawing = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      const img = canvas.toDataURL('image/png');
      setEditorState(prev => ({ ...prev, image: img }));
      setHistory(prev => [...prev, img]);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.strokeStyle = editorState.penColor;
      ctx.lineWidth = editorState.penSize;
      ctx.lineCap = 'round';

      if (editorState.penType === 'marker') {
        ctx.globalAlpha = 0.5;
      } else {
        ctx.globalAlpha = 1.0;
      }

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center h-screen bg-slate-900  overflow-hidden">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        className=" "
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
