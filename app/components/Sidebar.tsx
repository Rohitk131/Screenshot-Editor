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

  const plainColors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33F1", 
    "#33FFF1", "#F1FF33", "#0B416A", "#B93BC9", "#493232"
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

  return (
    <div className="w-64 bg-gray-200 p-4 overflow-y-auto text-sm text-gray-800 h-full hide-scrollbar ">
      {/* Background Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Background</h3>
        
        {/* Gradient backgrounds */}
        <h4 className="text-sm font-medium mb-2 text-gray-600">Gradients</h4>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-md hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: gradient }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: gradient }))
              }
            />
          ))}
        </div>
        
        {/* Plain color backgrounds */}
        <h4 className="text-sm font-medium mb-2 text-gray-600">Plain Colors</h4>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {plainColors.map((color, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-md hover:ring-2 ring-blue-500 transition-all duration-300"
              style={{ background: color }}
              onClick={() =>
                setEditorState((prev) => ({ ...prev, background: color }))
              }
            />
          ))}
          <ColorPicker
            color={editorState.background}
            onChange={(color) =>
              setEditorState((prev) => ({ ...prev, background: color }))
            }
          />
        </div>
      </section>

      {/* Wallpaper Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Wallpaper</h3>
        <div className="grid grid-cols-3 gap-2">
          {wallpapers.map((wallpaper, index) => (
            <button
              key={index}
              className="w-16 h-16 rounded-md overflow-hidden hover:ring-2 ring-blue-500 transition-all duration-300"
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
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Adjustments</h3>
        {["padding", "inset", "shadow", "cornerRadius", "rotate"].map(
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
                  adjustment === "padding"
                    ? handlePaddingChange(Number(e.target.value))
                    : setEditorState((prev) => ({
                        ...prev,
                        [adjustment]: Number(e.target.value),
                      }))
                }
                className="w-full bg-gray-200 rounded-lg appearance-none h-2"
              />
            </label>
          )
        )}
      </section>

      {/* Filters Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Filters</h3>
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
    </div>
  );
}