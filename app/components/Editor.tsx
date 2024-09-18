'use client'
import React, { useState, useRef, useEffect } from 'react';
import { EditorState } from '../types';
import { Upload, Camera, Pen, Square, Crop, Grid, Undo, Redo, Download, Type, Circle, Triangle, Image as ImageIcon, Scissors, Layers, Sliders, Smile, Eraser, Move, ZoomIn, RotateCw } from 'lucide-react';
import Sidebar from './Sidebar';

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: 20,
    inset: 0,
    shadow: 20,
    cornerRadius: 12,
    image: null,
    crop: { x: 0, y: 0, width: 0, height: 0 },
    rotate: 0,
    filter: 'none',
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    opacity: 100,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    isAnnotating: false,
    currentTool: 'pen',
    penColor: '#000000',
    penSize: 5,
    frame: '',
    effect3D: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorState.image) {
      const img = new window.Image();
      img.onload = () => {
        if (canvasRef.current && containerRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            const containerWidth = containerRef.current.clientWidth - editorState.padding * 2;
            const containerHeight = containerRef.current.clientHeight - editorState.padding * 2;
            const imgAspectRatio = img.width / img.height;
            const containerAspectRatio = containerWidth / containerHeight;

            let newWidth, newHeight;

            if (imgAspectRatio > containerAspectRatio) {
              newWidth = containerWidth;
              newHeight = containerWidth / imgAspectRatio;
            } else {
              newHeight = containerHeight;
              newWidth = containerHeight * imgAspectRatio;
            }

            canvasRef.current.width = newWidth;
            canvasRef.current.height = newHeight;

            ctx.clearRect(0, 0, newWidth, newHeight);
            ctx.save();

            // Apply inset
            const insetX = editorState.inset * (newWidth / 100);
            const insetY = editorState.inset * (newHeight / 100);
            ctx.translate(insetX, insetY);
            newWidth -= insetX * 2;
            newHeight -= insetY * 2;

            // Apply rotation
            ctx.translate(newWidth / 2, newHeight / 2);
            ctx.rotate((editorState.rotate * Math.PI) / 180);
            ctx.translate(-newWidth / 2, -newHeight / 2);

            // Apply 3D effects
            applyEffect3D(ctx, editorState.effect3D, newWidth, newHeight);

            // Draw image
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Apply corner radius
            ctx.globalCompositeOperation = 'destination-in';
            roundedRect(ctx, 0, 0, newWidth, newHeight, editorState.cornerRadius);

            // Apply frame if selected
            if (editorState.frame) {
              ctx.globalCompositeOperation = 'source-over';
              const frame = new Image();
              frame.onload = () => {
                ctx.drawImage(frame, -insetX, -insetY, newWidth + insetX * 2, newHeight + insetY * 2);
              };
              frame.src = editorState.frame;
            }

            ctx.restore();
          }
        }
      };
      img.src = editorState.image;
    }
  }, [editorState]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditorState((prev) => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const applyEffect3D = (ctx: CanvasRenderingContext2D, effect: string | null, width: number, height: number) => {
    if (!effect) return;

    ctx.translate(width / 2, height / 2);

    switch (effect) {
      case 'Rotate':
        ctx.rotate((editorState.rotate * Math.PI) / 180);
        break;
      case 'Flip':
        ctx.scale(-1, 1);
        break;
      case 'Tilt':
        ctx.transform(1, 0.2, 0.2, 1, 0, 0);
        break;
      case 'Perspective':
        ctx.transform(1, 0, 0.2, 1, 0, 0);
        break;
      case 'Skew':
        ctx.transform(1, 0.2, 0.2, 1, 0, 0);
        break;
      case 'Extrude':
        ctx.transform(1.2, 0.2, 0.2, 1.2, 0, 0);
        break;
    }

    ctx.translate(-width / 2, -height / 2);
  };

  // Helper function to draw rounded rectangles
  const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-200 p-4 flex-shrink-0">
          <Sidebar editorState={editorState} setEditorState={setEditorState} />
        </div>
  
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* File operations */}
              <button
                className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out flex items-center"
                onClick={handleUpload}
              >
                <Upload size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Download size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* Divider */}
              <span className="text-gray-300">|</span>

              {/* Editing tools */}
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <ImageIcon size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Camera size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Crop size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <RotateCw size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Sliders size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Layers size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Pen size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Eraser size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Type size={20} />
              </button>

              {/* Divider */}
              <span className="text-gray-300">|</span>

              {/* Shapes */}
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Square size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Circle size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Triangle size={20} />
              </button>

              {/* Divider */}
              <span className="text-gray-300">|</span>

              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Scissors size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Smile size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Grid size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Move size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <ZoomIn size={20} />
              </button>

              {/* Divider */}
              <span className="text-gray-300">|</span>

              {/* Undo and Redo buttons */}
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Undo size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Redo size={20} />
              </button>
            </div>
          </div>
  
          {/* Editor canvas area */}
          <div className="flex-1 p-8 bg-gray-50 overflow-hidden" ref={containerRef}>
            <div
              className="w-full h-full rounded-xl overflow-hidden flex justify-center items-center"
              style={{
                background: editorState.background,
                boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`,
                padding: `${editorState.padding}px`,
              }}
            >
              <div
                className="relative"
                style={{
                  boxShadow: `0 ${editorState.shadow}px ${editorState.shadow * 2}px rgba(0,0,0,0.2)`,
                  filter: `${editorState.filter}(${editorState[editorState.filter as keyof EditorState] || ''})`,
                }}
              >
                {editorState.image ? (
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
                  />
                ) : (
                  <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 mb-4">Upload an image to start editing</p>
                    <button
                      onClick={handleUpload}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                      Select Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;

