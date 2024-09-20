import React , { useState} from "react";
import { EditorState, Frame, Layout, Filter } from "../types";
import { 
  ChromeNavbarLight, 
  ChromeNavbarDark 
} from './Navbars';
import safariLight from "./frames/safari-light.png";

interface RightSidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export default function RightSidebar({
  editorState,
  setEditorState,
}: RightSidebarProps) {
  const [showBrightnessSlider, setShowBrightnessSlider] = useState(false);

  const frames: Frame[] = [
    { src: safariLight, label: "Safari Light" },
  ];

  const layoutOptions: Layout[] = [
    { name: "None", transform: "" },
    { name: "Tilt Left", transform: "perspective(1000px) rotateY(-15deg)" },
    { name: "Tilt Right", transform: "perspective(1000px) rotateY(15deg)" },
    { name: "Tilt Up", transform: "perspective(1000px) rotateX(15deg)" },
    { name: "Tilt Down", transform: "perspective(1000px) rotateX(-15deg)" },
    { name: "Rotate", transform: "perspective(1000px) rotate3d(1, 1, 1, 15deg)" },
  ];

  const NavbarComponent =
    editorState.theme === "light" ? ChromeNavbarLight : ChromeNavbarDark;

  const filters: Filter[] = [
    "none",
    "grayscale",
    "sepia",
    "blur",
    "invert",
    "contrast",
    "brightness",
  ];

  const handleFilterClick = (filter: Filter) => {
    if (filter === "none") {
      setEditorState(prev => ({ ...prev, filter: "none", brightness: 100 }));
      setShowBrightnessSlider(false);
    } else if (filter === "brightness") {
      setEditorState(prev => ({ ...prev, filter: "brightness" }));
      setShowBrightnessSlider(!showBrightnessSlider);
    } else {
      setEditorState(prev => ({ ...prev, filter }));
      setShowBrightnessSlider(false);
    }
  };

  const handleBrightnessChange = (value: number) => {
    setEditorState(prev => ({ ...prev, brightness: value }));
  };

  return (
    <div className="w-full bg-white p-6 text-sm text-gray-800 h-full overflow-y-auto hide-scrollbar">
      {/* Frames Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Frames</h3>
        <div className="grid grid-cols-3 gap-4">
          {frames.map((frame, index) => (
            <div key={index} className="relative group">
              <NavbarComponent />
              <button
                className={`w-full h-24 rounded-lg overflow-hidden transition-transform transform ${
                  editorState.frame?.src === frame.src
                    ? "scale-105 ring-2 ring-blue-500"
                    : ""
                }`}
                style={{
                  backgroundImage: `url(${frame.src.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transform: editorState.layout
                    ? editorState.layout.transform
                    : "",
                  transition: "transform 0.5s ease",
                }}
                onClick={() =>
                  setEditorState((prev) => ({
                    ...prev,
                    frame: frame,
                  }))
                }
              >
                <span className="sr-only">{frame.label}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Layout Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Layout</h3>
        <div className="grid grid-cols-2 gap-4">
          {layoutOptions.map((layout, index) => (
            <button
              key={index}
              className={`p-3 rounded-lg transition-transform ${
                editorState.layout.name === layout.name
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() =>
                setEditorState((prev) => ({
                  ...prev,
                  layout: layout,
                }))
              }
            >
              {layout.name}
            </button>
          ))}
        </div>
      </section>

      {/* Filters Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Filters</h3>
        <div className="grid grid-cols-2 gap-4">
          {filters.map((filter) => (
            <React.Fragment key={filter}>
              {filter === "brightness" ? (
                <div className="col-span-2 flex items-center space-x-2">
                  <button
                    onClick={() => handleFilterClick(filter)}
                    className={`flex-1 p-3 rounded-lg transition-transform ${
                      editorState.filter === filter
                        ? "bg-blue-600 text-white scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    Brightness
                  </button>
                  {showBrightnessSlider && (
                    <div className="flex-1 flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={editorState.brightness}
                        onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span>{editorState.brightness}%</span>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleFilterClick(filter)}
                  className={`p-3 rounded-lg transition-transform ${
                    editorState.filter === filter
                      ? "bg-blue-600 text-white scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {filter === "none" ? "No Filter" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}