import React from "react";
import {
  ChromeNavbarLight,
  ChromeNavbarDark,
  SafariNavbarLight,
  SafariNavbarDark,
  MacOSNavbarLight,
  MacOSNavbarDark,
} from "./Navbars";

import { EditorState, Frame, Layout, ThreeDEffect } from "../types";

interface RightSidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  selectedEffect: ThreeDEffect | null;
  setSelectedEffect: React.Dispatch<React.SetStateAction<ThreeDEffect | null>>;
}

export default function RightSidebar({
  editorState,
  setEditorState,
  selectedEffect,
  setSelectedEffect
}: RightSidebarProps) {
  const styles = [
    { label: 'Hover Me', effect: 'hover' },
    { label: '+3', effect: 'plus3' },
    // Add more styles as needed
  ];

  const frames: Frame[] = [
    { label: "Chrome Light", component: ChromeNavbarLight },
    { label: "Chrome Dark", component: ChromeNavbarDark },
    { label: "Safari Light", component: SafariNavbarLight },
    { label: "Safari Dark", component: SafariNavbarDark },
    { label: "macOS Light", component: MacOSNavbarLight },
    { label: "macOS Dark", component: MacOSNavbarDark },
  ];

  const layoutOptions: Layout[] = [
    { name: "None", transform: "" },
    { name: "Tilt Left", transform: "perspective(1000px) rotateY(-20deg)" },
    { name: "Tilt Right", transform: "perspective(1000px) rotateY(20deg)" },
    { name: "Tilt Up", transform: "perspective(1000px) rotateX(20deg)" },
    { name: "Tilt Down", transform: "perspective(1000px) rotateX(-20deg)" },
    {
      name: "Rotate",
      transform: "perspective(1000px) rotate3d(1, 1, 1, 15deg)",
    },
  ];

  const handleFrameSelect = (frame: Frame) => {
    setEditorState((prev) => ({
      ...prev,
      frame: frame,
    }));
  };

  function handleStyleSelect(style: { label: string; effect: string; }): void {
    // Implement style selection logic here
  }

  const threeDEffects: ThreeDEffect[] = [
    { name: "Tilt", className: "tilt-3d" },
    { name: "Flip", className: "flip-3d" },
    { name: "Rotate", className: "rotate-3d" },
    { name: "Zoom", className: "zoom-3d" },
    { name: "Skew", className: "skew-3d" },
    { name: "Wave", className: "wave-3d" },
  ];

  return (
    <div className="w-full bg-white p-6 text-sm text-gray-800 h-full overflow-y-auto hide-scrollbar">
      {/* Frames Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Frames</h3>
        <div className="grid grid-cols-3 gap-4">
          {frames.map((frame, index) => (
            <div key={index} className="relative group">
              <button
                className={`w-full h-24 rounded-lg overflow-hidden transition-transform transform ${
                  editorState.frame?.label === frame.label
                    ? "scale-105 ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => handleFrameSelect(frame)}
              >
                <frame.component />
              </button>
              <span className="absolute bottom-1 left-1 right-1 text-xs text-center bg-black bg-opacity-50 text-white rounded">
                {frame.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Layout Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Layout</h3>
        <div className="grid grid-cols-2 gap-6">
          {layoutOptions.map((layout, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg transition-all transform ${
                editorState.layout.name === layout.name
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105 shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() =>
                setEditorState((prev) => ({
                  ...prev,
                  layout: layout,
                }))
              }
            >
              <div className="relative w-20 h-14 flex items-center justify-center">
                <img
                  src="https://www.transparentpng.com/download/credit-card/8p4jX1-blank-credit-card-pic.png"
                  alt={layout.name}
                  className="object-contain w-full h-full"
                  style={{ transform: layout.transform }}
                />
              </div>
              <span className="block text-center font-medium">{layout.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Styles Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4">Styles</h3>
        <div className="grid grid-cols-2 gap-4">
          {styles.map((style, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
                editorState.selectedStyle?.label === style.label ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleStyleSelect(style)}
            >
              <div className="aspect-w-1 aspect-h-1 flex items-center justify-center p-4">
                {style.effect === 'hover' ? (
                  <div className="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                    {style.label}
                  </div>
                ) : style.effect === 'plus3' ? (
                  <div className="text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg">
                    {style.label}
                  </div>
                ) : (
                  <div>{style.label}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Effect Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">3D Effect</h3>
        <div className="grid grid-cols-2 gap-4">
          {threeDEffects.map((effect) => (
            <button
              key={effect.className}
              className={`p-4 rounded-lg transition-colors ${
                selectedEffect?.className === effect.className
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedEffect(effect)}
            >
              {effect.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}