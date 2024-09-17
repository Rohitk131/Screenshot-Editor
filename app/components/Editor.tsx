'use client'

import { useState, useRef, ChangeEvent } from 'react';
import { EditorState, Filter } from '../types';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import CropTool from './CropTool';

export default function Editor() {
  const [editorState, setEditorState] = useState<EditorState>({
    background: 'none',
    padding: 0,
    inset: 0,
    shadow: 0,
    cornerRadius: 0,
    image: null,
    crop: { x: 0, y: 0, width: 100, height: 100 },
    rotate: 0,
    filter: 'none',
    brightness: 100,
    contrast: 100,
    annotations: [],
    isAnnotating: false,
    penType: 'pen',
    penColor: '#000000',
    penSize: 5,
  });

  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleTabScreenshot = async () => {
    try {
      const screenshot = await takeTabScreenshot();
      setEditorState(prev => ({ ...prev, image: screenshot }));
    } catch (error) {
      console.error('Failed to take tab screenshot:', error);
    }
  };

  const handleDownload = () => {
    if (editorState.image) {
      const link = document.createElement('a');
      link.href = editorState.image;
      link.download = 'edited-image.png';
      link.click();
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setEditorState(prev => ({ ...prev, image: croppedImage }));
    setIsCropping(false);
  };

  const handleAnnotate = () => {
    setEditorState(prev => ({ ...prev, isAnnotating: !prev.isAnnotating }));
  };

  const handleUndo = () => {
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop();
      const lastImage = newHistory[newHistory.length - 1];
      setEditorState(prev => ({ ...prev, image: lastImage || null }));
      return newHistory;
    });
  };

  return (
    <>
      <Sidebar 
        editorState={editorState} 
        setEditorState={setEditorState} 
        onUpload={handleUpload}
        onTabScreenshot={handleTabScreenshot}
        onDownload={handleDownload}
        onCrop={() => setIsCropping(true)}
        onAnnotate={handleAnnotate}
        onUndo={handleUndo} // Pass the onUndo function
      />
      <Canvas editorState={editorState} setEditorState={setEditorState} />
      {editorState.image && isCropping && (
        <CropTool image={editorState.image} onCropComplete={handleCropComplete} />
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </>
  );
}

// Mock function for taking tab screenshot
function takeTabScreenshot(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==');
    }, 1000);
  });
}