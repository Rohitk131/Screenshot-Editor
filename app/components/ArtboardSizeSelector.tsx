import React, { useState } from 'react';
import { Square, Layout } from 'lucide-react';

interface ArtboardSizeSelectorProps {
  size: { width: number; height: number };
  isPortrait: boolean;
  onSizeChange: (width: number, height: number) => void;
  onOrientationChange: (isPortrait: boolean) => void;
}

const sizeOptions = [
  { name: 'Custom', size: '960px × 960px', img: 'https://via.placeholder.com/50' },
  { name: 'Standard', size: '1200px × 1200px', img: 'https://via.placeholder.com/50' },
  { name: 'Postcard', size: '4in × 6in', img: 'https://via.placeholder.com/50' },
  { name: 'Business Card', size: '2in × 3.5in', img: 'https://via.placeholder.com/50' },
  { name: 'A4', size: '210mm × 297mm', img: 'https://via.placeholder.com/50' },
  { name: 'A5', size: '148mm × 210mm', img: 'https://via.placeholder.com/50' },
  { name: 'Poster Small', size: '16in × 20in', img: 'https://via.placeholder.com/50' },
  { name: 'Poster Big', size: '24in × 36in', img: 'https://via.placeholder.com/50' },
  { name: 'Instagram Post', size: '1080px × 1080px', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
  { name: 'Facebook Post', size: '1200px × 1200px', img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
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
    let [width, height] = option.size.split('×').map(s => parseFloat(s));
    
    // Convert to pixels if necessary
    if (option.size.includes('in')) {
      width *= 96; // 96 pixels per inch
      height *= 96;
    } else if (option.size.includes('mm')) {
      width *= 3.7795275591; // Convert mm to pixels
      height *= 3.7795275591;
    }

    width = Math.round(width);
    height = Math.round(height);

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
            className={`chip p-2 text-left border rounded-full flex items-center space-x-2 ${
              selectedOption.name === option.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <img src={option.img} alt={option.name} className="h-10 w-10 rounded-full" />
            <div>
              <div className="font-medium">{option.name}</div>
              <div className="text-sm text-gray-500">({option.size})</div>
            </div>
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