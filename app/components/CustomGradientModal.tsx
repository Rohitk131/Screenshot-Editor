import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CustomGradientModalProps {
  onClose: () => void;
  onApply: (gradient: string) => void;
}

const CustomGradientModal: React.FC<CustomGradientModalProps> = ({ onClose, onApply }) => {
  const [color1, setColor1] = useState('#ffffff');
  const [color2, setColor2] = useState('#000000');
  const [angle, setAngle] = useState(0);

  const handleApply = () => {
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    onApply(gradient);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Custom Gradient</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Color 1</label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color 2</label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Angle</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="mt-1 block w-full"
            />
            <span className="text-sm text-gray-500">{angle}°</span>
          </div>
          <div className="h-20 rounded-lg" style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})` }} />
          <button
            onClick={handleApply}
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Apply Gradient
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomGradientModal;