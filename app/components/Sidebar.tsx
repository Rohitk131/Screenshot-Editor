import React from 'react';
import { EditorState, Filter } from "../types";
import ColorPicker from "./ColorPicker";

interface SidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export default function Sidebar({
  editorState,
  setEditorState,
}: SidebarProps) {
  const gradients = [
    "linear-gradient(to right, #ff6e7f, #bfe9ff)",
    "linear-gradient(to right, #00c6ff, #0072ff)",
    "linear-gradient(to right, #ff0081, #ff8c00)",
    "linear-gradient(to right, #8e2de2, #4a00e0)",
    "linear-gradient(to right, #fcb045, #fd1d1d, #d53369)",
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
    setEditorState(prev => ({
      ...prev,
      padding: value,
      image: prev.image, // Keep the image size constant
    }));
  };

  return (
    <div className="w-80 bg-gray-800 p-6 shadow-lg overflow-y-auto text-sm text-gray-200">
      {/* Background Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Background</h3>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              className="w-full h-12 rounded-lg hover:scale-105 transition-transform duration-300"
              style={{ background: gradient }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: gradient }))
              }
            />
          ))}
        </div>
        <ColorPicker
          color={editorState.background}
          onChange={(color) =>
            setEditorState((prev) => ({ ...prev, background: color }))
          }
        />
      </section>

      {/* Adjustments Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Adjustments</h3>
        {["padding", "inset", "shadow", "cornerRadius", "rotate"].map(
          (adjustment) => (
            <label key={adjustment} className="block mb-6">
              <span className="block text-gray-400 capitalize mb-2">
                {adjustment}
              </span>
              <input
                type="range"
                min="0"
                max={adjustment === "rotate" ? "360" : "100"}
                value={editorState[adjustment as keyof EditorState] as number}
                onChange={(e) =>
                  adjustment === "padding"
                    ? handlePaddingChange(Number(e.target.value))
                    : setEditorState((prev) => ({
                        ...prev,
                        [adjustment]: Number(e.target.value),
                      }))
                }
                className="w-full bg-gray-700 rounded-lg"
              />
            </label>
          )
        )}
      </section>

      {/* Filters Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>
        <select
          value={editorState.filter}
          onChange={(e) =>
            setEditorState((prev) => ({
              ...prev,
              filter: e.target.value as Filter,
            }))
          }
          className="w-full bg-gray-800 p-3 rounded-lg text-gray-300 shadow-md"
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
            className="w-full mt-4 bg-gray-700 rounded-lg"
          />
        )}
      </section>

      {/* Annotation Tools Section */}
      {editorState.isAnnotating && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Annotation Tools</h3>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400">Tool Type</label>
            <select
              value={editorState.currentTool}
              onChange={(e) =>
                setEditorState((prev) => ({
                  ...prev,
                  currentTool: e.target.value as 'pen' | 'pencil' | 'marker' | 'eraser',
                }))
              }
              className="w-full bg-gray-800 p-3 rounded-lg text-gray-300 shadow-md"
            >
              <option value="pen">Pen</option>
              <option value="pencil">Pencil</option>
              <option value="marker">Marker</option>
              <option value="eraser">Eraser</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400">Color</label>
            <ColorPicker
              color={editorState.penColor}
              onChange={(color) =>
                setEditorState((prev) => ({ ...prev, penColor: color }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400">Size</label>
            <input
              type="range"
              min="1"
              max="50"
              value={editorState.penSize}
              onChange={(e) =>
                setEditorState((prev) => ({
                  ...prev,
                  penSize: Number(e.target.value),
                }))
              }
              className="w-full bg-gray-700 rounded-lg"
            />
          </div>
        </section>
      )}
    </div>
  );
}