'use client';
import React, { useState, useRef } from 'react';
import { EditorState } from '../types';
import { Upload, Camera, Pen, Square, Crop, Grid, Undo, Download } from 'lucide-react';
import Sidebar from './Sidebar'; // Import Sidebar component

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    background: 'none', // This will be updated with color or gradient
    padding:0,
    inset: 0,
    shadow: 10,
    cornerRadius: 20,
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
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="h-screen w-full flex items-center justify-center p-8 bg-gray-900">
      <div className="w-full max-w-7xl h-[90vh] bg-transparent rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left sidebar */}
        <Sidebar editorState={editorState} setEditorState={setEditorState} />
  
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <div className="bg-gray-800 p-4 flex justify-between items-center text-gray-300">
            {/* File upload */}
            <div className="flex items-center space-x-4">
              <button
                className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none"
                onClick={handleUpload}
              >
                <Upload size={18} />
              </button>
              <button className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none">
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
  
            {/* Drawing tools */}
            <div className="flex items-center space-x-4">
              <button className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none">
                <Pen size={18} />
              </button>
              <button className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none">
                <Square size={18} />
              </button>
              <button className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none">
                <Crop size={18} />
              </button>
              <button className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none">
                <Grid size={18} />
              </button>
            </div>
  
            {/* Undo and download buttons */}
            <div className="flex items-center space-x-4">
              <button className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none">
                <Undo size={18} />
              </button>
              <button className="bg-gray-600 p-2 rounded-lg hover:bg-gray-500 focus:outline-none">
                <Download size={18} />
              </button>
            </div>
          </div>
  
          {/* Editor canvas area */}
          <div
            className="flex-1 relative flex justify-center items-center overflow-hidden"
            style={{
              background: editorState.background,
              padding: editorState.padding,
            }}
          >
            {editorState.image ? (
              <img
                src={editorState.image}
                alt="Uploaded content"
                style={{
                  background: editorState.background, // Ensure background is applied only here
              
                  borderRadius: editorState.cornerRadius,
                  boxShadow: `0 0 ${editorState.shadow}px rgba(0,0,0,0.5)`,
                  filter: `${editorState.filter}(${editorState[editorState.filter] || ''})`,
                  transform: `rotate(${editorState.rotate}deg)`,
                }}
              />
            ) : (
              <p className="text-gray-500">Upload an image to start editing</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Editor;
