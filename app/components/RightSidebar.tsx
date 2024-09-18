import React from "react";
import { EditorState } from "../types";

interface RightSidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export default function RightSidebar({
  editorState,
  setEditorState,
}: RightSidebarProps) {
  const frames = [
    "/frames/frame1.png",
    "/frames/frame2.png",
    "/frames/frame3.png",
    "/frames/frame4.png",
    "/frames/frame5.png",
    "/frames/frame6.png",
  ];

  const effects3D = [
    "Rotate",
    "Flip",
    "Tilt",
    "Perspective",
    "Skew",
    "Extrude",
  ];

  return (
    <div className="w-64 bg-gray-100 p-4 overflow-y-auto text-sm text-gray-800 h-full hide-scrollbar">
      {/* Frames Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Frames</h3>
        <div className="grid grid-cols-3 gap-2">
          {frames.map((frame, index) => (
            <button
              key={index}
              className="w-16 h-16 rounded-md overflow-hidden hover:ring-2 ring-blue-500 transition-all duration-300 bg-white"
              style={{
                backgroundImage: `url(${frame})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() =>
                setEditorState((prev) => ({
                  ...prev,
                  frame: frame,
                }))
              }
            />
          ))}
        </div>
      </section>

      {/* 3D Effects Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">3D Effects</h3>
        <div className="grid grid-cols-2 gap-2">
          {effects3D.map((effect, index) => (
            <button
              key={index}
              className={`p-2 rounded-md ${
                editorState.effect3D === effect
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } transition-colors duration-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() =>
                setEditorState((prev) => ({
                  ...prev,
                  effect3D: effect,
                }))
              }
            >
              {effect}
            </button>
          ))}
        </div>
      </section>

      {/* Styles Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Styles</h3>
        {/* Add style options here */}
      </section>

      {/* Layout Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Layout</h3>
        {/* Add layout options here */}
      </section>
    </div>
  );
}