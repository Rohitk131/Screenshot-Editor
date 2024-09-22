import React, { useState, useEffect} from "react";
import { EditorState } from "../types";

import ColorPicker from "./ColorPicker";
import CustomGradientModal from "./CustomGradientModal";
import { Move, Plus } from "lucide-react";
import { Switch } from "@headlessui/react";

interface SidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}
export default function Sidebar({
  editorState,
  setEditorState,
}: SidebarProps) {
  const [autoInset, setAutoInset] = useState(false);
  const [showGradientModal, setShowGradientModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);

  const gradients = [
    "linear-gradient(to right, #ff6e7f, #bfe9ff)",
    "linear-gradient(to right, #00c6ff, #0072ff)",
    "linear-gradient(to right, #ff0081, #ff8c00)",
    "linear-gradient(to right, #8e2de2, #4a00e0)",
    "linear-gradient(to right, #fcb045, #fd1d1d, #d53369)",
  ];

  const plainColors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33F1", 
    "#33FFF1"
  ];

  const wallpapers = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1696697918623-5f85f585ef18?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1663937576065-706a8d985379?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const shadowTypes = [
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
    "rgb(38, 57, 77) 0px 20px 30px -10px",
    "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
    "rgba(0, 0, 0, 0.2) 0px 60px 40px -7px",
    "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
  ];
  
  
  const handleInsetChange = (value: number) => {
    setEditorState((prev) => {
      const newInset = value;
      const newScale = 1 - (newInset / 100) * 0.15; // Reduce max scale to 0.85
      const shadowIntensity = newInset / 100;
      const newBoxShadow = `inset 0 0 ${newInset * 0.5}px rgba(0,0,0,${shadowIntensity})`;
      
      return {
        ...prev,
        inset: newInset,
        transform: `scale(${newScale})`,
        boxShadow: newBoxShadow,
        padding: `${newInset * 0.5}px`, // Add padding to prevent image from touching edges
      };
    });
  };

  const handleAutoInsetToggle = (enabled: boolean) => {
    setAutoInset(enabled);
    if (enabled) {
      handleInsetChange(50); // Apply a default inset effect
    } else {
      handleInsetChange(0); // Reset inset effect
    }
  };

  // Smooth transition for auto-inset
  useEffect(() => {
    if (autoInset) {
      const interval = setInterval(() => {
        setEditorState((prev) => {
          const newInset = Math.min(prev.inset + 2, 50);
          if (newInset === 50) clearInterval(interval);
          return handleInsetChange(newInset);
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [autoInset]);


  const handlePaddingChange = (value: number) => {
    setEditorState((prev) => ({
      ...prev,
      padding: value,
      image: prev.image,
    }));
  };
  const handleAdjustmentChange = (adjustment: string, value: number) => {
    setEditorState((prev) => ({
      ...prev,
      [adjustment]: value,
    }));
  };
  const handleCustomGradient = (gradient: string) => {
    setEditorState((prev) => ({ ...prev, background: gradient }));
    setShowGradientModal(false);
  };

  const handleCustomColor = (color: string) => {
    setEditorState(prev => ({ ...prev, background: color }));
    setShowColorPicker(false);
  };

  const handleBorderWidthChange = (value: number) => {
    setEditorState((prev) => ({
      ...prev,
      borderWidth: value,
    }));
  };

  const handleBorderColorChange = (color: string) => {
    setEditorState(prev => ({ ...prev, borderColor: color }));
    setShowBorderColorPicker(false);
  };

  const handleBorderStyleChange = (style: 'curved' | 'sharp' | 'round') => {
    setEditorState(prev => ({ ...prev, borderStyle: style }));
  };

  const handleShadowChange = (value: number) => {
    const currentShadow = editorState.imageShadow;
    const shadowParts = currentShadow.split('),').map(part => part.trim());
    const newShadowParts = shadowParts.map(part => {
      const [rgba, rest] = part.split(') ');
      if (rgba && rest) {
        const values = rest.split(' ').map(v => parseFloat(v));
        const adjustedValues = values.map(v => (v * value / 50).toFixed(2) + 'px');
        return `${rgba}) ${adjustedValues.join(' ')}`;
      }
      return part;
    });
    const newShadow = newShadowParts.join(', ');
    setEditorState((prev) => ({
      ...prev,
      imageShadow: newShadow,
    }));
  };

  const getShadowIntensity = (shadowString: string): number => {
    const parts = shadowString.split('),');
    const firstPart = parts[0];
    const match = firstPart.match(/(-?\d+(\.\d+)?px)/);
    if (match) {
      const pixelValue = parseFloat(match[1]);
      return Math.round((pixelValue / 20) * 50); // Normalize to 0-100 range
    }
    return 50; // Default to 50% if no matches found
  };

  return (
    <div className="w-full bg-white p-6 overflow-y-auto text-sm text-gray-800 h-full hide-scrollbar">
      {/* Background Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Background</h3>
        
        {/* Gradient backgrounds */}
        <h4 className="text-base font-medium mb-3 text-gray-700">Gradients</h4>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {gradients.slice(0, 3).map((gradient, index) => (
            <button
              key={index}
              className="w-full h-14 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: gradient }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: gradient }))
              }
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {gradients.slice(3, 5).map((gradient, index) => (
            <button
              key={index + 3}
              className="w-full h-14 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: gradient }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: gradient }))
              }
            />
          ))}
          <button
            className="w-full h-14 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300 flex items-center justify-center bg-white"
            onClick={() => setShowGradientModal(true)}
          >
            <Plus size={24} className="text-gray-400" />
          </button>
        </div>
        
        {/* Plain color backgrounds */}
        <h4 className="text-base font-medium mb-3 text-gray-700">Plain Colors</h4>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {plainColors.slice(0, 3).map((color, index) => (
            <button
              key={index}
              className="w-full h-14 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: color }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: color }))
              }
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {plainColors.slice(3, 5).map((color, index) => (
            <button
              key={index + 3}
              className="w-full h-14 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: color }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: color }))
              }
            />
          ))}
          <button
            className="w-full h-14 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300 flex items-center justify-center bg-white"
            onClick={() => setShowColorPicker(true)}
          >
            <Plus size={24} className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* Wallpaper Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Wallpaper</h3>
        <div className="grid grid-cols-3 gap-4">
          {wallpapers.map((wallpaper, index) => (
            <button
              key={index}
              className="w-full h-16 rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() =>
                setEditorState((prev) => ({
                  ...prev,
                  background: `url(${wallpaper})`,
                }))
              }
            />
          ))}
        </div>
      </section>

      {/* Adjustments Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Adjustments</h3>
          {/* Auto Inset Toggle */}
          <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Auto Inset</span>
          <Switch
            checked={autoInset}
            onChange={handleAutoInsetToggle}
            className={`${
              autoInset ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                autoInset ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        {/* Inset Slider */}
        <label className="block mb-4">
          <span className="block text-gray-600 capitalize mb-1">Inset</span>
          <input
            type="range"
            min="0"
            max="100"
            value={editorState.inset}
            onChange={(e) => handleInsetChange(Number(e.target.value))}
            disabled={autoInset}
            className={`w-full bg-gray-200 rounded-lg appearance-none h-2 ${
              autoInset ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <span className="block text-right text-gray-500 text-xs mt-1">
            {editorState.inset}
          </span>
        </label>

        {["padding", "rotate"].map(
          (adjustment) => (
            <label key={adjustment} className="block mb-4">
              <span className="block text-gray-600 capitalize mb-1">
                {adjustment}
              </span>
              <input
                type="range"
                min="0"
                max={adjustment === "rotate" ? "360" : "100"}
                value={editorState[adjustment as keyof EditorState] as number}
                onChange={(e) =>
                  handleAdjustmentChange(adjustment, Number(e.target.value))
                }
                className="w-full bg-gray-200 rounded-lg appearance-none h-2"
              />
              <span className="block text-right text-gray-500 text-xs mt-1">
                {String(editorState[adjustment as keyof EditorState])}
              </span>
            </label>
          )
        )}
      </section>

      {/* Border Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Border</h3>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-600">Corner Radius</label>
            <input
              type="range"
              min="0"
              max="50"
              value={editorState.cornerRadius || 0}
              onChange={(e) => handleAdjustmentChange('cornerRadius', Number(e.target.value))}
              className="w-full bg-gray-200 rounded-lg appearance-none h-2"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-600">Border Width</label>
            <input
              type="range"
              min="0"
              max="20"
              value={editorState.borderWidth || 0}
              onChange={(e) => handleBorderWidthChange(Number(e.target.value))}
              className="w-full bg-gray-200 rounded-lg appearance-none h-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Color</label>
            <div
              className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300"
              style={{ backgroundColor: editorState.borderColor || '#000000' }}
              onClick={() => setShowBorderColorPicker(true)}
            ></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className={`flex-1 px-3 py-2 rounded ${editorState.borderStyle === 'curved' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleBorderStyleChange('curved')}
          >
            Curved
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded ${editorState.borderStyle === 'sharp' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleBorderStyleChange('sharp')}
          >
            Sharp
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded ${editorState.borderStyle === 'round' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleBorderStyleChange('round')}
          >
            Round
          </button>
        </div>
      </section>

      {/* Image Shadow Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Shadow</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {shadowTypes.map((shadow, index) => (
            <button
              key={index}
              className={`w-full h-16 rounded-lg border-2 transition-all duration-300 ${
                editorState.imageShadow === shadow ? 'border-blue-500' : 'border-gray-200'
              }`}
              style={{ boxShadow: shadow }}
              onClick={() => setEditorState(prev => ({ ...prev, imageShadow: shadow }))}
            />
          ))}
        </div>
        <label className="block mb-4">
          <span className="block text-gray-600 mb-1">Shadow Intensity</span>
          <input
            type="range"
            min="0"
            max="100"
            value={getShadowIntensity(editorState.imageShadow)}
            onChange={(e) => handleShadowChange(Number(e.target.value))}
            className="w-full bg-gray-200 rounded-lg appearance-none h-2"
          />
        </label>
      </section>

      {showGradientModal && (
        <CustomGradientModal
          onClose={() => setShowGradientModal(false)}
          onApply={handleCustomGradient}
        />
      )}

      {showColorPicker && (
        <ColorPicker
          onClose={() => setShowColorPicker(false)}
          onColorSelect={handleCustomColor}
        />
      )}

      {showBorderColorPicker && (
        <ColorPicker
          onClose={() => setShowBorderColorPicker(false)}
          onColorSelect={handleBorderColorChange}
        />
      )}
    </div>
  );
}