import React, { useEffect, useRef, useState } from 'react';
import { EditorState, Tool } from '../types';

interface CanvasProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  activeTool: Tool;
}

export default function Canvas({ editorState, setEditorState, activeTool }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && editorState.image) {
      const img = new Image();
      img.src = editorState.image;
      img.onload = () => {
        canvas.width = img.width + editorState.padding * 2;
        canvas.height = img.height + editorState.padding * 2;
        drawImage(ctx, img);
      };
    }
  }, [editorState.image, editorState.padding, editorState.background, editorState.filter]);

  const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const { padding, background, inset, shadow, cornerRadius, rotate, filter } = editorState;
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Apply background
    if (background !== 'none') {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    // Save context for rotation
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    
    // Apply shadow
    if (shadow > 0) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = shadow;
      ctx.shadowOffsetX = shadow / 2;
      ctx.shadowOffsetY = shadow / 2;
    }
    
    // Draw image with padding
    ctx.drawImage(
      img,
      -img.width / 2 + padding,
      -img.height / 2 + padding,
      img.width,
      img.height
    );
    
    // Apply inset
    if (inset > 0) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = inset;
      ctx.strokeRect(
        -img.width / 2 + padding + inset / 2,
        -img.height / 2 + padding + inset / 2,
        img.width - inset,
        img.height - inset
      );
    }
    
    // Apply corner radius
    if (cornerRadius > 0) {
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.moveTo(-img.width / 2 + padding + cornerRadius, -img.height / 2 + padding);
      ctx.arcTo(
        img.width / 2 + padding,
        -img.height / 2 + padding,
        img.width / 2 + padding,
        img.height / 2 + padding,
        cornerRadius
      );
      ctx.arcTo(
        img.width / 2 + padding,
        img.height / 2 + padding,
        -img.width / 2 + padding,
        img.height / 2 + padding,
        cornerRadius
      );
      ctx.arcTo(
        -img.width / 2 + padding,
        img.height / 2 + padding,
        -img.width / 2 + padding,
        -img.height / 2 + padding,
        cornerRadius
      );
      ctx.arcTo(
        -img.width / 2 + padding,
        -img.height / 2 + padding,
        img.width / 2 + padding,
        -img.height / 2 + padding,
        cornerRadius
      );
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
    
    // Restore context after rotation
    ctx.restore();
    
    // Apply filter
    if (filter !== 'none') {
      ctx.filter = getFilterString(editorState);
      ctx.drawImage(ctx.canvas, 0, 0);
      ctx.filter = 'none';
    }
    
    // Draw annotations
    drawAnnotations(ctx);
  };

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

  const drawAnnotations = (ctx: CanvasRenderingContext2D) => {
    editorState.annotations.forEach((annotation) => {
      ctx.beginPath();
      ctx.moveTo(annotation.path[0].x, annotation.path[0].y);
      for (let i = 1; i < annotation.path.length; i++) {
        ctx.lineTo(annotation.path[i].x, annotation.path[i].y);
      }
      ctx.strokeStyle = annotation.color;
      ctx.lineWidth = annotation.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    });
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'annotate') {
      setIsDrawing(true);
      const { offsetX, offsetY } = e.nativeEvent;
      setLastX(offsetX);
      setLastY(offsetY);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool !== 'annotate') return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const { offsetX, offsetY } = e.nativeEvent;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = editorState.penColor;
      ctx.lineWidth = editorState.penSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      setLastX(offsetX);
      setLastY(offsetY);

      // Update annotations in state
      setEditorState((prev) => ({
        ...prev,
        annotations: [
          ...prev.annotations,
          {
            path: [{ x: lastX, y: lastY }, { x: offsetX, y: offsetY }],
            color: editorState.penColor,
            size: editorState.penSize,
            tool: editorState.currentTool,
          },
        ],
      }));
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
      className="max-w-full max-h-full object-contain"
    />
  );
}