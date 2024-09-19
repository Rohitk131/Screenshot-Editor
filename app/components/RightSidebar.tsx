import React from "react";
import { EditorState, Frame, Effect3D, Layout } from "../types";
import { 
  ChromeNavbarLight, 
  ChromeNavbarDark 
} from './Navbars'; // Adjust the import path as necessary

// Import frame images
import safariLight from "./frames/safari-light.png";

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

  const effects3D: Effect3D[] = [
    { name: "None", transform: "" },
    { name: "Tilt Left", transform: "perspective(1000px) rotateY(-15deg)" },
    { name: "Tilt Right", transform: "perspective(1000px) rotateY(15deg)" },
    { name: "Tilt Up", transform: "perspective(1000px) rotateX(15deg)" },
    { name: "Tilt Down", transform: "perspective(1000px) rotateX(-15deg)" },
    { name: "Rotate", transform: "perspective(1000px) rotate3d(1, 1, 1, 15deg)" },
  ];

  // Choose a navbar component based on a condition (e.g., theme or state)
  const NavbarComponent =
    editorState.theme === "light" ? ChromeNavbarLight : ChromeNavbarDark;

  // Function to determine the transformation for the selected effect
  const get3DEffectStyle = (effect: string) => {
    switch (effect) {
      case "Rotate":
        return "rotateY(180deg)";
      case "Flip":
        return "rotateX(180deg)";
      case "Tilt":
        return "rotateZ(15deg)";
      case "Perspective":
        return "perspective(500px) rotateX(20deg)";
      case "Skew":
        return "skewX(20deg)";
      case "Extrude":
        return "scale(1.1) translateZ(20px)";
      default:
        return "";
    }
  };

  const layoutOptions: Layout[] = ["single", "sideBySide", "fourGrid"];

  return (
    <div className="w-full bg-white p-6 text-sm text-gray-800 h-full overflow-y-auto hide-scrollbar">
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
                  editorState.frame?.src === frame.src
                    ? "scale-105 ring-2 ring-blue-500"
                    : ""
                }`}
                style={{
                  backgroundImage: `url(${frame.src.src})`, // Use .src for imported images
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transform: editorState.effect3D
                    ? get3DEffectStyle(editorState.effect3D.name)
                    : "", // Apply the selected 3D effect
                  transition: "transform 0.5s ease",
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
              className={`p-3 rounded-lg transition-transform ${
                editorState.effect3D.name === effect.name
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() =>
                setEditorState((prev) => ({
                  ...prev,
                  effect3D: effect,
                }))
              }
            >
              {effect.name}
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
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Layout</h3>
        <div className="flex flex-wrap gap-3">
          {layoutOptions.map((layout) => (
            <button
              key={layout}
              onClick={() => setEditorState({ ...editorState, layout })}
              className={`px-3 py-1 rounded ${
                editorState.layout === layout
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {layout}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
