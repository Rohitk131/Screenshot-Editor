'use client'
import React, { useState, useRef, useEffect } from 'react';
import { EditorState } from '../types';
import { Upload, Camera, Pen, Square, Crop, Grid, Undo, Redo, Download, Type, Circle, Triangle, Image as ImageIcon, Scissors, Layers, Sliders, Smile, Eraser, Move, ZoomIn, RotateCw, Eye, Share } from 'lucide-react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

const Editor = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const defaultInset = 5; // Default inset value (5%)

  const [editorState, setEditorState] = useState<EditorState>({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: 20,
    inset: defaultInset,
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
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const imgAspectRatio = img.width / img.height;
            const containerAspectRatio = containerWidth / containerHeight;

            let newWidth, newHeight;

            if (imgAspectRatio > containerAspectRatio) {
              newWidth = containerWidth * 0.8; // Reduced from 0.9 to 0.8
              newHeight = newWidth / imgAspectRatio;
            } else {
              newHeight = containerHeight * 0.8; // Reduced from 0.9 to 0.8
              newWidth = newHeight * imgAspectRatio;
            }

            // Add padding to canvas size
            const canvasWidth = newWidth + editorState.padding * 2;
            const canvasHeight = newHeight + editorState.padding * 2;

            // Set canvas size
            setCanvasSize({ width: canvasWidth, height: canvasHeight });
            canvasRef.current.width = canvasWidth;
            canvasRef.current.height = canvasHeight;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();

            // Apply inset and padding
            const totalInsetX = (editorState.inset / 100) * newWidth + editorState.padding;
            const totalInsetY = (editorState.inset / 100) * newHeight + editorState.padding;
            const insetWidth = newWidth - 2 * (editorState.inset / 100) * newWidth;
            const insetHeight = newHeight - 2 * (editorState.inset / 100) * newHeight;

            // Apply rotation
            ctx.translate(canvasWidth / 2, canvasHeight / 2);
            ctx.rotate((editorState.rotate * Math.PI) / 180);
            ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

            // Apply 3D effects
            applyEffect3D(ctx, editorState.effect3D, insetWidth, insetHeight);

            // Draw image
            ctx.drawImage(img, totalInsetX, totalInsetY, insetWidth, insetHeight);

            // Apply corner radius to the image
            ctx.globalCompositeOperation = 'destination-in';
            roundedRect(ctx, totalInsetX, totalInsetY, insetWidth, insetHeight, editorState.cornerRadius);

            // Apply frame if selected
            if (editorState.frame) {
              ctx.globalCompositeOperation = 'source-over';
              const frame = new Image();
              frame.onload = () => {
                ctx.drawImage(frame, 0, 0, canvasWidth, canvasHeight);
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

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditorState((prev) => ({ 
          ...prev, 
          image: e.target?.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const applyEffect3D = (ctx: CanvasRenderingContext2D, effect: string, width: number, height: number) => {
    switch (effect) {
      case 'Rotate':
        ctx.transform(1, 0.2, 0, 1, 0, 0);
        break;
      case 'Flip':
        ctx.scale(-1, 1);
        ctx.translate(-width, 0);
        break;
      case 'Tilt':
        ctx.transform(1, 0, 0.2, 1, 0, 0);
        break;
      case 'Perspective':
        ctx.transform(1, 0, 0.2, 1, 0, 0);
        break;
      case 'Skew':
        ctx.transform(1, 0.2, 0.2, 1, 0, 0);
        break;
      case 'Extrude':
        ctx.transform(1.1, 0, 0, 1.1, -width * 0.05, -height * 0.05);
        break;
      default:
        break;
    }
  };

  const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  };

  return (
    <div className="h-screen w-full flex items-center justify-start p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="h-[95vh] bg-white rounded-3xl overflow-hidden flex shadow-2xl"
           style={{ width: 'calc(100% - 16px)' }}>
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-200 flex-shrink-0 overflow-y-auto hide-scrollbar">
          <Sidebar editorState={editorState} setEditorState={setEditorState} />
        </div>
  
        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <button
                onClick={handleUpload}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center space-x-1"
              >
                <Upload size={16} />
                <span>Upload</span>
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <ImageIcon size={20} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                <Camera size={20} />
              </button>

              <span className="text-gray-300">|</span>

              <div className="flex items-center space-x-2">
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
              </div>

              <span className="text-gray-300">|</span>

              <div className="flex items-center space-x-2">
                <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                  <Square size={20} />
                </button>
                <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                  <Circle size={20} />
                </button>
                <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300 ease-in-out">
                  <Triangle size={20} />
                </button>
              </div>

              <span className="text-gray-300">|</span>

              <div className="flex items-center space-x-2">
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
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center space-x-1">
                <Share size={16} />
                <span>Share</span>
              </button>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out flex items-center space-x-1">
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
  
          {/* Editor canvas area */}
          <div className="flex-1 p-4 bg-gray-50 overflow-hidden flex items-center justify-center relative" ref={containerRef}>
            {editorState.image ? (
              <div
                className="overflow-hidden flex justify-center items-center"
                style={{
                  background: editorState.background,
                  boxShadow: `0 ${editorState.shadow}px ${editorState.shadow * 2}px rgba(0,0,0,0.3)`,
                  width: `${canvasSize.width}px`,
                  height: `${canvasSize.height}px`,
                  borderRadius: `${editorState.cornerRadius}px`,
                }}
              >
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
                  style={{
                    filter: `${editorState.filter}(${editorState[editorState.filter as keyof EditorState] || ''})`,
                  }}
                />
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-500 mb-4">Upload an image to start editing</p>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center space-x-2 justify-center"
                >
                  <Upload size={20} />
                  <span>Upload Image</span>
                </button>
              </div>
            )}
            {/* Bottom right corner icons */}
            {editorState.image && (
              <div className="absolute bottom-4 right-4 flex space-x-2 bg-black bg-opacity-50 rounded-full p-1">
                <button className="p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 ease-in-out">
                  <Undo size={20} className="text-gray-700" />
                </button>
                <button className="p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 ease-in-out">
                  <Redo size={20} className="text-gray-700" />
                </button>
                <button className="p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 ease-in-out">
                  <Eye size={20} className="text-gray-700" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-gray-100 border-l border-gray-200 flex-shrink-0 overflow-y-auto hide-scrollbar">
          <RightSidebar editorState={editorState} setEditorState={setEditorState} />
        </div>
      </div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

export default Editor;