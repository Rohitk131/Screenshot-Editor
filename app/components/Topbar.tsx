import React from 'react';
import { Tool } from '../types';
import { Upload, Camera, Pen, Square, Crop, Grid, Undo, Download } from 'lucide-react';

interface TopbarProps {
  onUpload: () => void;
  onTabScreenshot: () => void;
  onToolChange: (tool: Tool) => void;
  activeTool: Tool;
  onUndo: () => void;
  onDownload: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  onUpload,
  onTabScreenshot,
  onToolChange,
  activeTool,
  onUndo,
  onDownload,
}) => {
  const tools: { name: Tool; icon: React.ReactNode }[] = [
    { name: 'upload', icon: <Upload size={24} /> },
    { name: 'screenshot', icon: <Camera size={24} /> },
    { name: 'annotate', icon: <Pen size={24} /> },
    { name: 'shape', icon: <Square size={24} /> },
    { name: 'crop', icon: <Crop size={24} /> },
    { name: 'mosaic', icon: <Grid size={24} /> },
  ];

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => {
              if (tool.name === 'upload') {
                onUpload();
              } else if (tool.name === 'screenshot') {
                onTabScreenshot();
              } else {
                onToolChange(tool.name);
              }
            }}
            className={`p-2 rounded-full ${
              activeTool === tool.name ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {tool.icon}
          </button>
        ))}
      </div>
      <div className="flex space-x-4">
        <button onClick={onUndo} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
          <Undo size={24} />
        </button>
        <button onClick={onDownload} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
          <Download size={24} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;