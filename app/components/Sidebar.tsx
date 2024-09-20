import React, { useState } from "react";
import { EditorState, Filter } from "../types";
import ColorPicker from "./ColorPicker";
import CustomGradientModal from "./CustomGradientModal";
import { Plus } from "lucide-react";

interface SidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}
export default function Sidebar({
  editorState,
  setEditorState,
}: SidebarProps) {
  const [showGradientModal, setShowGradientModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);

  const gradients = [
    "linear-gradient(to right, #ff6e7f, #bfe9ff)",
    "linear-gradient(to right, #00c6ff, #0072ff)",
    "linear-gradient(to right, #ff0081, #ff8c00)",
    "linear-gradient(to right, #8e2de2, #4a00e0)",
    "linear-gradient(to right, #fcb045, #fd1d1d, #d53369)",
    "linear-gradient(to right, #232526, #414345)",
    "linear-gradient(to right, #3fada8, #f6d365)",
    "linear-gradient(to right, #d38377, #d0a5c4)",
  ];

  const plainColors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33F1", 
    "#33FFF1", "#F1FF33", "#0B416A"
  ];

  const wallpapers = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1696697918623-5f85f585ef18?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1663937576065-706a8d985379?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const filters: Filter[] = [
    "none",
    "grayscale",
    "sepia",
    "blur",
    "invert",
    "brightness",
    "contrast",
  ];

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

  return (
    <div className="w-full bg-white px-6 py-2 overflow-y-auto text-sm text-gray-800 h-full hide-scrollbar">
      {/* Background Section */}
      <section className="">
        <h3 className="text-xl font-bold  text-gray-800">Background</h3>
        
        {/* Gradient backgrounds */}
        <h4 className="text-base font-medium mb-1 text-gray-700">Gradients</h4>
        <div className="grid grid-cols-6 gap-3 mb-2">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: gradient }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: gradient }))
              }
            />
          ))}
          <button
            className="w-full h-10 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300 flex items-center justify-center bg-white"
            onClick={() => setShowGradientModal(true)}
          >
            <Plus size={16} className="text-gray-400" />
          </button>
        </div>
        
        {/* Plain color backgrounds */}
        <h4 className="text-base font-medium mb-1 text-gray-700">Plain Colors</h4>
        <div className="grid grid-cols-6 gap-3 mb-2">
          {plainColors.map((color, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: color }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: color }))
              }
            />
          ))}
          <button
            className="w-full h-10 rounded-lg hover:ring-2 ring-blue-500 transition-all duration-300 flex items-center justify-center bg-white"
            onClick={() => setShowColorPicker(true)}
          >
            <Plus size={16} className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* Wallpaper Section */}
      <section className="mb-2">
        <h3 className="text-xl font-bold mb-0 text-gray-800">Wallpaper</h3>
        <div className="grid grid-cols-4 gap-4">
          {wallpapers.map((wallpaper, index) => (
            <button
              key={index}
              className="w-18 h-12 rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all duration-300"
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
      <section className="mb-0">
        <h3 className="text-xl font-bold mb-0 text-gray-800">Adjustments</h3>
        {["padding", "inset", "shadow", "cornerRadius", "rotate"].map(
          (adjustment) => (
            <label key={adjustment} className="block mb-0">
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

      {/* Filters Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Filters</h3>
        <select
          value={editorState.filter}
          onChange={(e) =>
            setEditorState((prev) => ({
              ...prev,
              filter: e.target.value as Filter,
            }))
          }
          className="w-full bg-white p-2 rounded-md text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </option>
          ))}
        </select>
        {(editorState.filter === "brightness" ||
          editorState.filter === "contrast") && (
          <input
            type="range"
            min="0"
            max="200"
            value={editorState[editorState.filter]}
            onChange={(e) =>
              setEditorState((prev) => ({
                ...prev,
                [editorState.filter]: Number(e.target.value),
              }))
            }
            className="w-full mt-3 bg-gray-200 rounded-lg appearance-none h-2"
          />
        )}
      </section>

      {/* Border Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Border</h3>
        <label className="block mb-4">
          <span className="block text-gray-600 mb-1">Border Width</span>
          <input
            type="range"
            min="0"
            max="20"
            value={editorState.borderWidth || 0}
            onChange={(e) => handleBorderWidthChange(Number(e.target.value))}
            className="w-full bg-gray-200 rounded-lg appearance-none h-2"
          />
          <span className="block text-right text-gray-500 text-xs mt-1">
            {editorState.borderWidth || 0}px
          </span>
        </label>
        <div className="mb-4">
          <span className="block text-gray-600 mb-1">Border Color</span>
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-lg mr-2 cursor-pointer"
              style={{ backgroundColor: editorState.borderColor || '#000000' }}
              onClick={() => setShowBorderColorPicker(true)}
            ></div>
            <span>{editorState.borderColor || '#000000'}</span>
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-gray-600 mb-1">Border Style</span>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${editorState.borderStyle === 'curved' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleBorderStyleChange('curved')}
            >
              Curved
            </button>
            <button
              className={`px-3 py-1 rounded ${editorState.borderStyle === 'sharp' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleBorderStyleChange('sharp')}
            >
              Sharp
            </button>
            <button
              className={`px-3 py-1 rounded ${editorState.borderStyle === 'round' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleBorderStyleChange('round')}
            >
              Round
            </button>
          </div>
        </div>
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