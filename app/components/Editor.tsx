'use client'
import React, { useState, useRef } from 'react';
import { EditorState } from '../types';
import { Upload, Camera, Pen, Square, Crop, Grid, Undo, Redo, Download } from 'lucide-react';
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
    <div className="h-screen w-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-xl overflow-hidden flex">
        {/* Light-themed sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-200 p-4 flex-shrink-0">
          <Sidebar editorState={editorState} setEditorState={setEditorState} />
        </div>
  
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center text-gray-700">
            {/* File upload */}
            <div className="flex items-center space-x-4">
              <button
                className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out"
                onClick={handleUpload}
              >
                <Upload size={18} className="text-blue-600" />
              </button>
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Camera size={18} className="text-blue-600" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
  
            {/* Drawing tools */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Pen size={18} className="text-blue-600" />
              </button>
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Square size={18} className="text-blue-600" />
              </button>
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Crop size={18} className="text-blue-600" />
              </button>
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Grid size={18} className="text-blue-600" />
              </button>
            </div>
  
            {/* Undo, Redo and download buttons */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Undo size={18} className="text-blue-600" />
              </button>
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Redo size={18} className="text-blue-600" />
              </button>
              <button className="bg-blue-50 p-2 rounded-lg hover:bg-blue-100 focus:outline-none transition duration-300 ease-in-out">
                <Download size={18} className="text-blue-600" />
              </button>
            </div>
          </div>
  
          {/* Editor canvas area */}
          <div className="flex-1 p-8 bg-gray-50 overflow-hidden">
            <div
              className="w-full h-full rounded-xl overflow-hidden flex justify-center items-center"
              style={{
                background: editorState.background,
                boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`,
              }}
            >
              <div
                className="relative"
                style={{
                  padding: `${editorState.padding}px`,
                }}
              >
                {editorState.image ? (
                  <img
                    src={editorState.image}
                    alt="Uploaded content"
                    className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
                    style={{
                      borderRadius: `${editorState.cornerRadius}px`,
                      boxShadow: `0 ${editorState.shadow}px ${editorState.shadow * 2}px rgba(0,0,0,0.2)`,
                      filter: `${editorState.filter}(${editorState[editorState.filter] || ''})`,
                      transform: `rotate(${editorState.rotate}deg)`,
                    }}
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