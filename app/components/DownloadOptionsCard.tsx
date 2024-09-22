import React, { useState } from 'react';

interface DownloadOptionsCardProps {
  defaultOptions: {
    width: number;
    height: number;
    pixelDensity: number;
  };
  onDownload: (options: { width: number; height: number; pixelDensity: number }) => void;
  onCancel: () => void;
}

const DownloadOptionsCard: React.FC<DownloadOptionsCardProps> = ({
  defaultOptions,
  onDownload,
  onCancel
}) => {
  const [width, setWidth] = useState(defaultOptions.width);
  const [height, setHeight] = useState(defaultOptions.height);
  const [pixelDensity, setPixelDensity] = useState(defaultOptions.pixelDensity);

  const handleDownload = () => {
    onDownload({ width, height, pixelDensity });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-black">Download Options</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Pixel Density</label>
          <input
            type="number"
            value={pixelDensity}
            onChange={(e) => setPixelDensity(Number(e.target.value))}
            step="0.1"
            min="0.1"
            max="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadOptionsCard;
