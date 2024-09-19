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
  Share,
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
    effect3D: { name: "None", transform: "" },
    cropMode: false,
    layout: "single",
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

            // Add padding to canvas size
            const canvasWidth = newWidth + editorState.padding * 2;
            const canvasHeight = newHeight + editorState.padding * 2;

            // Set canvas size
            setCanvasSize({ width: canvasWidth, height: canvasHeight });
            canvasRef.current.width = canvasWidth;
            canvasRef.current.height = canvasHeight;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();

            // Draw background without corner radius
            ctx.fillStyle = editorState.background;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Apply 3D effect
            const effect3DTransform = get3DEffectStyle(editorState.effect3D.name);
            if (effect3DTransform) {
              applyCanvasTransform(ctx, effect3DTransform, canvasWidth, canvasHeight);
            }

            // Apply rotation
            ctx.translate(canvasWidth / 2, canvasHeight / 2);
            ctx.rotate((editorState.rotate * Math.PI) / 180);
            ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

            // Calculate inset for image
            const totalInsetX = (editorState.inset / 100) * newWidth;
            const totalInsetY = (editorState.inset / 100) * newHeight;
            const insetWidth = newWidth - 2 * totalInsetX;
            const insetHeight = newHeight - 2 * totalInsetY;

            // Draw image
            ctx.drawImage(
              img,
              totalInsetX + editorState.padding,
              totalInsetY + editorState.padding,
              insetWidth,
              insetHeight
            );

            // Apply corner radius only to the image
            ctx.globalCompositeOperation = "destination-in";
            roundedRect(
              ctx,
              totalInsetX + editorState.padding,
              totalInsetY + editorState.padding,
              insetWidth,
              insetHeight,
              editorState.cornerRadius
            );

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

  const applyCanvasTransform = (
    ctx: CanvasRenderingContext2D,
    transform: string,
    width: number,
    height: number
  ) => {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(width / 2, height / 2);

    const matrix = new DOMMatrix(transform);
    ctx.transform(
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.e,
      matrix.f
    );

    ctx.translate(-width / 2, -height / 2);
  };

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

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full h-full max-w-[calc(100%-50px)] max-h-[calc(100%-50px)] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Topbar */}
        <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="w-[25%]"></div>
          <div className="flex items-center space-x-4 overflow-x-auto flex-grow">
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center space-x-2 shadow-sm"
            >
              <Upload size={18} />
              <span>Upload</span>
            </button>
            <div className="flex items-center space-x-2">
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <ImageIcon size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Camera size={22} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={handleCropClick} className={`text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out ${editorState.cropMode ? 'bg-gray-200' : ''}`}>
                <Crop size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <RotateCw size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Sliders size={22} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Layers size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Pen size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Eraser size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Type size={22} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Square size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Circle size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Triangle size={22} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Scissors size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Smile size={22} />
              </button>
              <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out">
                <Grid size={22} />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center space-x-2 shadow-sm">
              <Share size={18} />
              <span>Share</span>
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out flex items-center space-x-2 shadow-sm">
              <Download size={18} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-96 bg-white overflow-y-auto hide-scrollbar border-r border-gray-200">
            <Sidebar editorState={editorState} setEditorState={setEditorState} />
          </div>

          {/* Editor canvas area */}
          <div
          className="flex-1 mx-4 rounded-2xl overflow-hidden flex items-center justify-center relative"
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
                }}
              />
              <canvas
                ref={canvasRef}
                className="relative z-10 max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
                style={{
                  boxShadow: `0 ${editorState.shadow * 0.3}px ${editorState.shadow * 0.6}px rgba(0,0,0,${editorState.shadow * 0.008})`,
                  filter: `${editorState.filter}(${editorState[editorState.filter as keyof EditorState] || ""})`,
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
              <div className="absolute bottom-4 right-4 flex space-x-2 bg-white bg-opacity-80 rounded-full p-1 shadow-md">
                <button className="p-2 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out">
                  <Undo size={22} className="text-gray-700" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out">
                  <Redo size={22} className="text-gray-700" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out">
                  <Eye size={22} className="text-gray-700" />
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-96 bg-white overflow-y-auto hide-scrollbar border-l border-gray-200">
            <RightSidebar editorState={editorState} setEditorState={setEditorState} />
          </div>
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