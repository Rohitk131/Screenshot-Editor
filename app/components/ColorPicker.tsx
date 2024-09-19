import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ColorPickerProps {
  onClose: () => void;
  onColorSelect: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onClose, onColorSelect }) => {
  const [color, setColor] = useState('#000000');

  const handleApply = () => {
    onColorSelect(color);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-72">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Custom Color</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-40 mb-4"
        />
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Apply Color
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;