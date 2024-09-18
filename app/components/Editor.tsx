'use client'
import React, { useState, useRef } from 'react';
import { EditorState } from '../types';
import { Upload, Camera, Pen, Square, Crop, Grid, Undo, Download, Plus } from 'lucide-react';

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    background: 'none',
    padding: 20,
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
        setEditorState(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 p-8">
      <div className="w-full max-w-6xl h-[90vh] bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left sidebar */}
        <div className="w-80 bg-gray-800 p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-gray-400 font-medium mb-2">None</h3>
            <div className="grid grid-cols-5 gap-2">
              {['#FF6B6B', '#4ECDC4', '#45B7D1', '#9055FF', '#FF8C42'].map((color, index) => (
                <button
                  key={index}
                  className="w-12 h-12 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}88)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 font-medium">Wallpapers</h3>
              <div className="flex space-x-1">
                <button className="text-gray-400 hover:text-white">&lt;</button>
                <button className="text-gray-400 hover:text-white">&gt;</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="w-20 h-20 rounded-2xl bg-blue-500" />
              <div className="w-20 h-20 rounded-2xl bg-purple-500" />
              <button className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-400 hover:text-white">
                <Plus size={24} />
              </button>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-gray-400 font-medium mb-2">Blurred</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="w-20 h-20 rounded-2xl bg-blue-500 filter blur-sm" />
              <div className="w-20 h-20 rounded-2xl bg-purple-500 filter blur-sm" />
            </div>
          </div>
          <div>
            <h3 className="text-gray-400 font-medium mb-2">Plain color</h3>
            <div className="grid grid-cols-8 gap-2">
              {['white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'].map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 font-medium">Padding</h3>
              <span className="text-gray-400">{editorState.padding}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={editorState.padding}
              onChange={(e) => setEditorState(prev => ({ ...prev, padding: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 font-medium">Inset</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">{editorState.inset}</span>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="text-gray-400 text-sm">Auto-balance</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={editorState.inset}
              onChange={(e) => setEditorState(prev => ({ ...prev, inset: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <div className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button onClick={handleUpload} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Upload size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Camera size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Pen size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Square size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Crop size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Grid size={20} className="text-gray-300" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Undo size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <Download size={20} className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center p-8">
            <div 
              className="w-full h-full rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                background: editorState.background !== 'none' ? editorState.background : 'linear-gradient(135deg, #43cea2, #185a9d)',
                padding: `${editorState.padding}px`,
                boxShadow: `0 0 ${editorState.shadow}px rgba(0,0,0,0.5)`,
              }}
            >
              {editorState.image ? (
                <img
                  src={editorState.image}
                  alt="Edited image"
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  style={{
                    boxShadow: `0 0 ${editorState.inset}px rgba(0,0,0,0.5) inset`,
                  }}
                />
              ) : (
                <div className="text-white text-center">
                  <p className="text-lg font-semibold mb-2">Started using CleanShot today and it's</p>
                  <p className="text-lg font-semibold mb-4">so much better than default the</p>
                  <p className="text-lg font-semibold">screenshots app 😎</p>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Jordan Chavis</p>
                      <p className="text-xs text-gray-400">@djforge</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default Editor;