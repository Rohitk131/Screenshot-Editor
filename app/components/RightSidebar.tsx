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
import { Layers } from "lucide-react";

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
  setSelectedEffect,
}: RightSidebarProps) {
  const styles = [
    { label: "Style 1", effect: "style1" },
    { label: "Style 2", effect: "style2" },
    { label: "Style 3", effect: "style3" },
    { label: "Style 4", effect: "style4" },
    { label: "Style 5", effect: "style5" },
    { label: "Style 6", effect: "style6" },
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
    { name: "Default", transform: "none", shadow: "none" },
    {
      name: "Isometric",
      transform: "perspective(800px) rotateX(55deg) rotateZ(-45deg)",
      shadow:
        "0 80px 120px rgba(0, 0, 0, 0.9), 15px 15px 40px rgba(0, 0, 0, 0.7)",
    },
    {
      name: "Isometric",
      transform: "perspective(900px) rotateX(60deg) rotateZ(-120deg)",
      shadow:
        "-10 10px 20px rgba(0, 0, 0, 22), 15px 15px 4px rgba(0, 0, 0, 15)",
    },
    {
      name: "Dramatic Tilt",
      transform:
        "perspective(1000px) rotateX(-15deg) rotateY(20deg) scale(0.95)",
      shadow: "0 60px 120px rgba(0,0,0,0.6), -30px 30px 80px rgba(0,0,0,0.4)",
    },
    {
      name: "Page Curl",
      transform:
        "perspective(1000px) rotateY(-30deg) translateZ(-100px) translateX(50px)",
      shadow: "50px 50px 100px rgba(0,0,0,0.5), 0 30px 60px rgba(0,0,0,0.3)",
    },
    {
      name: "Hover Float",
      transform:
        "perspective(1000px) translateY(-20px) rotateX(10deg) scale(1.1)",
      shadow: "0 70px 140px rgba(0,0,0,0.4), 0 30px 60px rgba(0,0,0,0.3)",
    },
    {
      name: "Cinematic Pan",
      transform:
        "perspective(2000px) rotateX(10deg) translateZ(-100px) translateY(-30px)",
      shadow: "0 80px 160px rgba(0,0,0,0.5), 0 40px 80px rgba(0,0,0,0.3)",
    },
    {
      name: "Isometric Pop",
      transform:
        "perspective(1000px) rotateX(30deg) rotateZ(-45deg) translateZ(50px)",
      shadow: "50px 50px 100px rgba(0,0,0,0.6), 20px 20px 60px rgba(0,0,0,0.4)",
    },
    {
      name: "Origami Unfold",
      transform:
        "perspective(1000px) rotateY(-35deg) rotateX(15deg) translateX(-50px) scale(0.9)",
      shadow: "60px 60px 120px rgba(0,0,0,0.5), 30px 30px 80px rgba(0,0,0,0.3)",
    },
    {
      name: "Ripple Effect",
      transform:
        "perspective(1000px) rotateX(10deg) skew(-5deg, 5deg) translateZ(30px)",
      shadow: "40px 40px 80px rgba(0,0,0,0.5), 20px 20px 40px rgba(0,0,0,0.3)",
    },
    {
      name: "Dynamic Swing",
      transform:
        "perspective(1000px) rotateY(45deg) rotateZ(-10deg) translateZ(-50px) scale(0.9)",
      shadow: "70px 70px 140px rgba(0,0,0,0.6), 35px 35px 70px rgba(0,0,0,0.4)",
    },
    {
      name: "Spiral",
      transform: "perspective(1000px) rotateY(45deg) rotateX(45deg)",
      shadow: "60px 60px 120px rgba(0,0,0,0.5), 30px 30px 60px rgba(0,0,0,0.3)",
    },
    {
      name: "Parallax Depth",
      transform:
        "perspective(2000px) translateZ(-200px) rotateX(20deg) scale(1.2)",
      shadow: "0 100px 200px rgba(0,0,0,0.6), 0 50px 100px rgba(0,0,0,0.4)",
    },
  ];

  const handleFrameSelect = (frame: Frame) => {
    setEditorState((prev) => ({
      ...prev,
      frame: frame,
    }));
  };

  const handleStyleSelect = (style: { label: string; effect: string }) => {
    if (style.effect === "style1") {
      setEditorState((prev) => ({
        ...prev,
        selectedStyle: style,
        customStyle: "card-style1",
        showStacks: true,
        stackCount: 3, // You can adjust this number as needed
      }));
    } else {
      setEditorState((prev) => ({
        ...prev,
        selectedStyle: style,
        customStyle: "",
        showStacks: false,
      }));
    }
  };

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
                editorState.layout?.name === layout.name
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
                  style={{
                    transform: layout.transform,
                    boxShadow: layout.shadow,
                  }}
                />
              </div>
              <span className="block text-center font-medium mt-2">
                {layout.name}
              </span>
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
                editorState.selectedStyle?.label === style.label
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleStyleSelect(style)}
            >
              <div className="aspect-w-1 aspect-h-1 flex items-center justify-center p-4">
                {style.effect === "style1" ? (
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 w-full h-full bg-blue-500 rounded-lg"></div>
                    <div className="absolute -top-1 -left-1 w-full h-full bg-green-500 rounded-lg"></div>
                    <div className="relative w-full h-full bg-white rounded-lg flex items-center justify-center">
                      <Layers size={24} className="text-gray-800" />
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg">
                    {style.label}
                  </div>
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
