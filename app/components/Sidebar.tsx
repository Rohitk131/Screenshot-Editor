import React from "react";
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
    "linear-gradient(to right, #232526, #414345)",
    "linear-gradient(to right, #3fada8, #f6d365)",
    "linear-gradient(to right, #d38377, #d0a5c4)",
    "linear-gradient(to right, #00d2ff, #3a7bd5)",
    "linear-gradient(to right, #ff0099, #493240)",
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
              className="w-10 h-10 rounded-lg hover:scale-105 transition-transform duration-300"
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

      {/* Wallpaper Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Wallpaper</h3>
        <div className="grid grid-cols-3 gap-2">
          {wallpapers.map((wallpaper, index) => (
            <button
              key={index}
              className="w-20 h-20 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: "cover",
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
