import React, { useState } from 'react';
import { Square, Layout } from 'lucide-react';

interface ArtboardSizeSelectorProps {
  size: { width: number; height: number };
  isPortrait: boolean;
  onSizeChange: (width: number, height: number) => void;
  onOrientationChange: (isPortrait: boolean) => void;
}

const sizeOptions = [
  { name: 'Custom', size: '960px × 960px' },
  { name: 'Standard', size: '1200px × 1200px' },
  { name: 'Postcard', size: '4in × 6in' },
  { name: 'Business Card', size: '2in × 3.5in' },
  { name: 'A4', size: '210mm × 297mm' },
  { name: 'A5', size: '148mm × 210mm' },
  { name: 'Poster Small', size: '16in × 20in' },
  { name: 'Poster Big', size: '24in × 36in' },
  { name: 'Instagram Post', size: '1080px × 1080px' },
  { name: 'Facebook Post', size: '1200px × 1200px' },
];

const ArtboardSizeSelector: React.FC<ArtboardSizeSelectorProps> = ({
  size,
  isPortrait,
  onSizeChange,
  onOrientationChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(sizeOptions[0]);
  const [customWidth, setCustomWidth] = useState(size.width);
  const [customHeight, setCustomHeight] = useState(size.height);

  const handleOptionSelect = (option: typeof sizeOptions[0]) => {
    setSelectedOption(option);
    const [width, height] = option.size.split('×').map(s => parseInt(s));
    if (!isNaN(width) && !isNaN(height)) {
      onSizeChange(width, height);
    }
  };

  const handleCustomSizeChange = () => {
    onSizeChange(customWidth, customHeight);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-800">Artboard Size</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onOrientationChange(true)}
            className={`p-1 ${isPortrait ? 'bg-blue-100' : 'bg-gray-100'} rounded`}
          >
            <Square size={16} />
          </button>
          <button
            onClick={() => onOrientationChange(false)}
            className={`p-1 ${!isPortrait ? 'bg-blue-100' : 'bg-gray-100'} rounded`}
          >
            <Layout size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {sizeOptions.map((option, index) => (
          <button
            key={index}
            className={`p-2 text-left border rounded-md ${
              selectedOption.name === option.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="font-medium">{option.name}</div>
            <div className="text-sm text-gray-500">{option.size}</div>
          </button>
        ))}
      </div>
      <div className="flex mt-2 space-x-2">
        <input
          type="number"
          value={customWidth}
          onChange={(e) => setCustomWidth(Number(e.target.value))}
          onBlur={handleCustomSizeChange}
          className="w-1/2 px-2 py-1 border border-gray-300 rounded-md"
          placeholder="Width"
        />
        <input
          type="number"
          value={customHeight}
          onChange={(e) => setCustomHeight(Number(e.target.value))}
          onBlur={handleCustomSizeChange}
          className="w-1/2 px-2 py-1 border border-gray-300 rounded-md"
          placeholder="Height"
        />
      </div>
    </div>
  );
};

export default ArtboardSizeSelector;