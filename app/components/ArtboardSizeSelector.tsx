import React, { useState } from 'react';
import { Square, Layout } from 'lucide-react';

interface ArtboardSizeSelectorProps {
  size: { width: number; height: number };
  isPortrait: boolean;
  onSizeChange: (width: number, height: number) => void;
  onOrientationChange: (isPortrait: boolean) => void;
}

const sizeOptions = [
  { ratio: '16:9', size: '1200px × 675px', img: 'https://static.vecteezy.com/system/resources/previews/027/395/710/non_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png' }, // Twitter Post
  { ratio: '1.91:1', size: '1200px × 628px', img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' }, // LinkedIn Post
  { ratio: '1:1', size: '1080px × 1080px', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' }, // Instagram Post
  { ratio: '5:4', size: '1350px x 1080px', img: 'https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png' }, //reddit post
  { ratio: '1:1', size: '1200px × 1200px', img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' }, // Facebook Post
  { ratio: '16:9', size: '1280px × 720px', img: 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png' }, // YouTube Thumbnail
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
      <div className="grid grid-cols-3 gap-2 mb-2">
        {sizeOptions.map((option, index) => (
          <button
          key={option.ratio}
          className={`chip p-1 text-left border rounded-full flex items-center space-x-2 ${
            selectedOption.ratio === option.ratio ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onClick={() => handleOptionSelect(option)}
        >
          <img src={option.img} alt={option.ratio} className="h-10 w-10 rounded-full" />
          <div className="font-medium">{option.ratio}</div>
        </button>
        ))}
      </div>
      <h1 className='text-sm text-gray-500'>Custom size(px)</h1>
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