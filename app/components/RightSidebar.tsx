import React from "react";
import { EditorState, Frame } from "../types";
import { 
  ChromeNavbarLight, 
  ChromeNavbarDark 
} from './Navbars'; // Adjust the import path as necessary

// Import frame images
import safariLight from './frames/safari-light.png';

interface RightSidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export default function RightSidebar({
  editorState,
  setEditorState,
}: RightSidebarProps) {
  const frames: Frame[] = [
    { src: safariLight, label: "Safari Light" },
  ];

  const effects3D = [
    "Rotate",
    "Flip",
    "Tilt",
    "Perspective",
    "Skew",
    "Extrude",
  ];

  // Choose a navbar component based on a condition (e.g., theme or state)
  const NavbarComponent = editorState.theme === "light" ? ChromeNavbarLight : ChromeNavbarDark;

  return (
    <div className="w-72 bg-gray-200 p-6  text-sm text-gray-800 h-full shadow-lg rounded-2xl hide-scrollbar ">
      {/* Frames Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Frames</h3>
        <div className="grid grid-cols-3 gap-4">
          {frames.map((frame, index) => (
            <div key={index} className="relative group">
              {/* Render the navbar as an overlay at the top */}
              <NavbarComponent />
              <button
                className={`w-full h-24 rounded-lg overflow-hidden transition-transform transform ${
                  editorState.frame?.src === frame.src ? "scale-105 ring-2 ring-blue-500" : ""
                }`}
                style={{
                  backgroundImage: `url(${frame.src.src})`, // Use .src for imported images
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() =>
                  setEditorState((prev) => ({
                    ...prev,
                    frame: frame, // Update the selected frame
                  }))
                }
              >
                <span className="sr-only">{frame.label}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Effects Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">3D Effects</h3>
        <div className="grid grid-cols-2 gap-4">
          {effects3D.map((effect, index) => (
            <button
              key={index}
              className={`p-3 rounded-lg transition-transform transform ${
                editorState.effect3D === effect
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() =>
                setEditorState((prev) => ({
                  ...prev,
                  effect3D: effect, // Update the 3D effect
                }))
              }
            >
              {effect}
            </button>
          ))}
        </div>
      </section>

      {/* Styles Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Styles</h3>
        {/* Add style options here */}
      </section>

      {/* Layout Section */}
      <section>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Layout</h3>
        {/* Add layout options here */}
      </section>
    </div>
  );
}
