import React, { useState } from "react";
import {
  ChromeNavbarLight,
  ChromeNavbarDark,
  SafariNavbarLight,
  SafariNavbarDark,
  MacOSNavbarLight,
  MacOSNavbarDark,
  SimpleWhiteFrame,
  RedHeartFrame,
  PurpleRoundedFrame,
  PinkHeartFrame,
  BlueRoundedFrame,
  GraySquareFrame,
  PinkHeartTopFrame,
} from "./Navbars";

import { EditorState, Frame, Layout, ThreeDEffect } from "../types";
import { Layers } from "lucide-react";
import { SketchPicker } from "react-color";

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
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentStyle, setCurrentStyle] = useState<string | null>(null);

  const styles = [
    { label: 'Style 1', effect: 'style1' },
    { label: 'Multicolor Frame', effect: 'multicolor-frame' },
    { label: 'Image Card', effect: 'image-card' },
  ];

  const frames: Frame[] = [
    { label: "Chrome Light", component: ChromeNavbarLight },
    { label: "Chrome Dark", component: ChromeNavbarDark },
    { label: "Safari Light", component: SafariNavbarLight },
    { label: "Safari Dark", component: SafariNavbarDark },
    { label: "macOS Light", component: MacOSNavbarLight },
    { label: "macOS Dark", component: MacOSNavbarDark },
    { label: "Simple White", component: SimpleWhiteFrame },
    { label: "Red Heart", component: RedHeartFrame },
    { label: "Purple Rounded", component: PurpleRoundedFrame },
    { label: "Pink Heart", component: PinkHeartFrame },
    { label: "Blue Rounded", component: BlueRoundedFrame },
    { label: "Gray Square", component: GraySquareFrame },
    { label: "Pink Heart Top", component: PinkHeartTopFrame },
  ];

  const layoutOptions: Layout[] = [
    { name: "Default", transform: "none", shadow: "none" },
    {
      name: "Isometric",
      transform: "perspective(1000px) rotateX(60deg) rotateZ(-45deg) translateZ(20px)",
      shadow:
        "0 90px 130px rgba(0, 0, 0, 0.95), 20px 20px 50px rgba(0, 0, 0, 0.75)",
    },
    {
      name: "Isometric Reverse",
      transform: "perspective(900px) rotateX(60deg) rotateZ(-120deg)",
      shadow:
        "-15px 20px 30px rgba(0, 0, 0, 0.9), 20px 20px 50px rgba(0, 0, 0, 0.8)",
    },
    {
      name: "Dramatic Tilt",
      transform:
        "perspective(1200px) rotateX(-20deg) rotateY(25deg) scale(0.9)",
      shadow:
        "0 80px 140px rgba(0,0,0,0.75), -40px 40px 100px rgba(0,0,0,0.5)",
    },
    {
      name: "Page Curl",
      transform:
        "perspective(1200px) rotateY(-40deg) translateZ(-120px) translateX(60px)",
      shadow: "60px 60px 120px rgba(0,0,0,0.6), 0 40px 80px rgba(0,0,0,0.35)",
    },
    {
      name: "Hover Float",
      transform:
        "perspective(1200px) translateY(-30px) rotateX(15deg) scale(1.2)",
      shadow: "0 90px 160px rgba(0,0,0,0.5), 0 50px 100px rgba(0,0,0,0.4)",
    },
    {
      name: "Cinematic Pan",
      transform:
        "perspective(2500px) rotateX(12deg) translateZ(-150px) translateY(-40px)",
      shadow: "0 100px 180px rgba(0,0,0,0.65), 0 50px 100px rgba(0,0,0,0.45)",
    },
    {
      name: "Isometric Pop",
      transform:
        "perspective(1200px) rotateX(35deg) rotateZ(-50deg) translateZ(70px)",
      shadow:
        "60px 60px 120px rgba(0,0,0,0.7), 25px 25px 80px rgba(0,0,0,0.5)",
    },
    {
      name: "Origami Unfold",
      transform:
        "perspective(1200px) rotateY(-40deg) rotateX(20deg) translateX(-60px) scale(0.85)",
      shadow: "70px 70px 140px rgba(0,0,0,0.55), 40px 40px 90px rgba(0,0,0,0.4)",
    },
    {
      name: "Ripple Effect",
      transform:
        "perspective(1200px) rotateX(15deg) skew(-10deg, 10deg) translateZ(40px)",
      shadow: "50px 50px 100px rgba(0,0,0,0.55), 30px 30px 70px rgba(0,0,0,0.4)",
    },
    {
      name: "Dynamic Swing",
      transform:
        "perspective(1200px) rotateY(50deg) rotateZ(-15deg) translateZ(-60px) scale(0.85)",
      shadow: "80px 80px 160px rgba(0,0,0,0.65), 40px 40px 90px rgba(0,0,0,0.45)",
    },
    {
      name: "Spiral",
      transform: "perspective(1200px) rotateY(50deg) rotateX(50deg)",
      shadow: "70px 70px 140px rgba(0,0,0,0.6), 40px 40px 80px rgba(0,0,0,0.4)",
    },
    {
      name: "Parallax Depth",
      transform:
        "perspective(2500px) translateZ(-250px) rotateX(25deg) scale(1.3)",
      shadow: "0 120px 220px rgba(0,0,0,0.7), 0 60px 120px rgba(0,0,0,0.5)",
    },
    {
      name: "Hyper Twist",
      transform:
        "perspective(1400px) rotateX(70deg) rotateY(-20deg) translateZ(100px)",
      shadow: "100px 100px 200px rgba(0,0,0,0.8), 50px 50px 100px rgba(0,0,0,0.5)",
    },
    {
      name: "Super Deep Dive",
      transform:
        "perspective(3000px) rotateX(30deg) translateZ(-300px) scale(1.4)",
      shadow:
        "0 150px 300px rgba(0,0,0,0.75), 0 75px 150px rgba(0,0,0,0.5)",
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
        stackCount: 3 // You can adjust this number as needed
      }));
    } else if (style.effect === 'multicolor-frame') {
      setEditorState((prev) => ({
        ...prev,
        selectedStyle: style,
        customStyle: 'card-multicolor-frame',
        showStacks: false
      }));
    } else if (style.effect === 'image-card') {
      setEditorState((prev) => ({
        ...prev,
        selectedStyle: style,
        customStyle: 'image-card',
        showStacks: false,
        cardTitle: 'Enter title here', // Add a default title
        cardDescription: 'Enter description here' // Add a default description
      }));
    } else {
      setEditorState((prev) => ({
        ...prev,
        selectedStyle: style,
        customStyle: '',
        showStacks: false
      }));
    }
  };

  const handleColorChange = (color: any) => {
    if (currentStyle === 'multicolor-frame') {
      setEditorState((prev) => ({
        ...prev,
        frameColor: color.hex,
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
              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentStyle(style.effect);
                  setColorPickerVisible(true);
                }}
              >
                <span className="text-xs text-gray-800">Edit</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      

      {colorPickerVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <SketchPicker
              color={editorState.frameColor || "#000"}
              onChangeComplete={handleColorChange}
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setColorPickerVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
