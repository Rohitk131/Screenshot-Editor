"use client";
import React, { useState, useRef, useEffect } from "react";
import { EditorState } from "../types";
import {
  Upload,
  Camera,
  Pen,
  Square,
  Crop,
  Grid,
  Undo,
  Redo,
  Download,
  Type,
  Circle,
  Triangle,
  Image as ImageIcon,
  Scissors,
  Layers,
  Sliders,
  Smile,
  Eraser,
  Move,
  ZoomIn,
  RotateCw,
  Eye,
  Share2,
} from "lucide-react";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import CropTool from "./CropTool";

const Editor = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const defaultInset = 5; // Default inset value (5%)

  const [editorState, setEditorState] = useState<EditorState>({
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: 1,
    inset: defaultInset,
    shadow: 20,
    cornerRadius: 12,
    image: null,
    crop: { x: 0, y: 0, width: 0, height: 0 },
    rotate: 0,
    filter: "none",
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    opacity: 100,
    grayscale: 0,
    sepia: 0,
    invert: 0,
    isAnnotating: false,
    currentTool: "pen",
    penColor: "#000000",
    penSize: 5,
    frame: "",
    effect3D: "",
    cropMode: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorState.image) {
      const img = new window.Image();
      img.onload = () => {
        if (canvasRef.current && containerRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const imgAspectRatio = img.width / img.height;
            const containerAspectRatio = containerWidth / containerHeight;
  
            let newWidth, newHeight;
  
            if (imgAspectRatio > containerAspectRatio) {
              newWidth = containerWidth * 0.8;
              newHeight = newWidth / imgAspectRatio;
            } else {
              newHeight = containerHeight * 0.8;
              newWidth = newHeight * imgAspectRatio;
            }
  
            const canvasWidth = newWidth + editorState.padding * 2;
            const canvasHeight = newHeight + editorState.padding * 2;
  
            setCanvasSize({ width: canvasWidth, height: canvasHeight });
            canvasRef.current.width = canvasWidth;
            canvasRef.current.height = canvasHeight;
  
            // Clear the canvas before drawing
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();
  
            // Draw background
            ctx.fillStyle = editorState.background;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
            // Apply rotation for the entire canvas
            ctx.translate(canvasWidth / 2, canvasHeight / 2);
            ctx.rotate((editorState.rotate * Math.PI) / 180);
            ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
  
            // Reset shadow settings to avoid shadow on background
            ctx.shadowColor = "transparent";
  
            // Calculate inset for the image
            const totalInsetX = (editorState.inset / 100) * newWidth;
            const totalInsetY = (editorState.inset / 100) * newHeight;
            const insetWidth = newWidth - 2 * totalInsetX;
            const insetHeight = newHeight - 2 * totalInsetY;
  
            // Apply shadow specifically for the image
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)"; // Adjust shadow color
            ctx.shadowBlur = editorState.shadow; // Shadow blur
            ctx.shadowOffsetX = 0; // Horizontal shadow offset
            ctx.shadowOffsetY = 0; // Vertical shadow offset
  
            // Apply the 3D effect here (only for the image)
            applyEffect3D(ctx, editorState.effect3D, insetWidth, insetHeight);
  
            // Draw the image with shadow
            ctx.drawImage(
              img,
              totalInsetX + editorState.padding,
              totalInsetY + editorState.padding,
              insetWidth,
              insetHeight
            );
  
            // Reset shadow so it doesn't affect the next drawings
            ctx.shadowColor = "transparent";
  
            // Apply corner radius to the image
            ctx.globalCompositeOperation = "destination-in";
            roundedRect(
              ctx,
              totalInsetX + editorState.padding,
              totalInsetY + editorState.padding,
              insetWidth,
              insetHeight,
              editorState.cornerRadius
            );
  
            // Restore context state
            ctx.restore();
          }
        }
      };
      img.src = editorState.image;
    }
  }, [editorState]);
  
  
  

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditorState((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const applyEffect3D = (
    ctx: CanvasRenderingContext2D,
    effect: string,
    width: number,
    height: number
  ) => {
    switch (effect) {
      case "Rotate":
        ctx.transform(1, 0.2, 0, 1, 0, 0);
        break;
      case "Flip":
        ctx.scale(-1, 1);
        ctx.translate(-width, 0);
        break;
      case "Tilt":
        ctx.transform(1, 0, 0.2, 1, 0, 0);
        break;
      case "Perspective":
        ctx.transform(1, 0, 0.2, 1, 0, 0);
        break;
      case "Skew":
        ctx.transform(1, 0.2, 0.2, 1, 0, 0);
        break;
      case "Extrude":
        ctx.transform(1.1, 0, 0, 1.1, -width * 0.05, -height * 0.05);
        break;
      default:
        break;
    }
  };

  const roundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  };

  const handleCropClick = () => {
    setEditorState((prev) => ({ ...prev, cropMode: !prev.cropMode }));
  };

  const handleCropComplete = (croppedImage: string) => {
    setEditorState((prev) => ({
      ...prev,
      image: croppedImage,
      cropMode: false,
    }));
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-300 to-gray-700 px-8 py-4">
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-100 border-b border-gray-300 p-2 flex items-center justify-between rounded-2xl shadow-md">
        <div className="w-[25%]"></div> {/* Left spacer */}
        <div className="flex items-center space-x-4 overflow-x-auto flex-grow pr-8">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out flex items-center space-x-1 shadow-lg"
          >
            <Upload size={16} />
            <span>Upload</span>
          </button>

          {/* Group 1 */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <ImageIcon size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Camera size={20} />
            </button>
          </div>

          {/* Group 2 */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCropClick}
              className={`text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm ${
                editorState.cropMode ? "bg-gray-200" : ""
              }`}
            >
              <Crop size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <RotateCw size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Sliders size={20} />
            </button>
          </div>

          {/* Group 3 */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Layers size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Pen size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Eraser size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Type size={20} />
            </button>
          </div>

          {/* Group 4 */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Square size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Circle size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Triangle size={20} />
            </button>
          </div>

          {/* Group 5 */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Scissors size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Smile size={20} />
            </button>
            <button className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out shadow-sm">
              <Grid size={20} />
            </button>
          </div>
        </div>
        {/* Right-side buttons */}
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-md hover:from-purple-500 hover:to-purple-700 transition duration-300 ease-in-out flex items-center space-x-1 shadow-lg">
            <Share2 size={16} />
            <span>Share</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md hover:from-green-500 hover:to-green-700 transition duration-300 ease-in-out flex items-center space-x-1 shadow-lg">
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden p-4 bg-white rounded-2xl mt-2">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 overflow-y-auto hide-scrollbar  rounded-2xl">
          <Sidebar editorState={editorState} setEditorState={setEditorState} />
        </div>

        {/* Editor canvas area */}
        <div
          className="flex-1 mx-4 rounded-2xl overflow-hidden flex items-center justify-center relative bg-gray-300"
          ref={containerRef}
        >
          {editorState.image ? (
            <div
              className="relative"
              style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: editorState.background,
                  boxShadow: `10 ${editorState.shadow * 0.3}px ${
                    editorState.shadow * 0.6
                  }px rgba(0,0,0,${editorState.shadow * 0.008})`,

                }}
              />
              <canvas
                ref={canvasRef}
                className="relative z-10 max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
                style={{
                  
                  filter: `${editorState.filter}(${
                    editorState[editorState.filter as keyof EditorState] || ""
                  })`,
                  borderRadius: `${editorState.cornerRadius}px`,
                }}
              />
            </div>
          ) : (
            <div className="text-center p-4 bg-white rounded-2xl shadow-md justify-center items-center">
              <div className="border-2 border-blue-400 border-dashed p-6 rounded-2xl justify-center items-center flex flex-col px-14">
                <img
                  src="https://media.lordicon.com/icons/wired/flat/198-upload-1.gif"
                  width={100}
                  height={100}
                />
                <p className="text-gray-500 mb-4">Upload an image</p>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Select Image
                </button>
              </div>
            </div>
          )}
          {/* Bottom right corner icons */}
          {editorState.image && (
            <div className="absolute bottom-4 right-4 flex space-x-2 bg-black bg-opacity-50 rounded-full p-1">
              <button className="p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 ease-in-out">
                <Undo size={20} className="text-gray-700" />
              </button>
              <button className="p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 ease-in-out">
                <Redo size={20} className="text-gray-700" />
              </button>
              <button className="p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition duration-300 ease-in-out">
                <Eye size={20} className="text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-64 flex-shrink-0 hide-scrollbar rounded-2xl justify-center flex overflow-y-auto overflow-y-auto ">
          <RightSidebar
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default Editor;
