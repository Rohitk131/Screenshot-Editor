'use client'
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom/client';

import html2canvas from 'html2canvas';
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
  Save,
} from "lucide-react";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import CropTool from "./CropTool";
import ResizableImage from "./ImageSizer";
import ImageSizer from "./ImageSizer";
import { Frame } from "../types";

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
    frame: null,
    layout: { name: "None", transform: "" },
    cropMode: false,
    borderWidth: 0,
    borderColor: '#000000',
    borderStyle: 'curved',
    isSizingImage: false,
    imageSize: { width: 0, height: 0 },
    tempImageSize: { width: 0, height: 0 },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (editorState.image) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = editorState.image;
    }
  }, [editorState.image]);

  useEffect(() => {
    if (containerRef.current) {
      setCanvasSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (image && canvasRef.current && containerRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const imgAspectRatio = image.width / image.height;
        const containerAspectRatio = containerWidth / containerHeight;

        let newWidth, newHeight;
        let totalInsetX, totalInsetY, insetWidth, insetHeight;

        if (imgAspectRatio > containerAspectRatio) {
          newWidth = containerWidth * 0.8;
          newHeight = newWidth / imgAspectRatio;
        } else {
          newHeight = containerHeight * 0.8;
          newWidth = newHeight * imgAspectRatio;
        }

        // Calculate inset values
        totalInsetX = (editorState.inset / 100) * newWidth;
        totalInsetY = (editorState.inset / 100) * newHeight;
        insetWidth = newWidth - 2 * totalInsetX;
        insetHeight = newHeight - 2 * totalInsetY;

        // Add padding to canvas size
        const canvasWidth = newWidth + editorState.padding * 2;
        const canvasHeight = newHeight + editorState.padding * 2;

        // Set canvas size
        setCanvasSize({ width: canvasWidth, height: canvasHeight });
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Save the context state
        ctx.save();

        // Move to the center of the canvas
        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        // Rotate the canvas
        ctx.rotate((editorState.rotate * Math.PI) / 180);

        // Move back
        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

        // Draw shadow
        ctx.save();
        ctx.shadowColor = `rgba(0, 0, 0, ${editorState.shadow * 0.01})`;
        ctx.shadowBlur = editorState.shadow * 0.5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = editorState.shadow * 0.2;

        // Draw a rectangle for the shadow
        ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Transparent fill
        roundedRect(
          ctx,
          totalInsetX + editorState.padding,
          totalInsetY + editorState.padding,
          insetWidth,
          insetHeight,
          editorState.cornerRadius
        );
        ctx.fill();
        ctx.restore();

        // Create a clipping region for the image
        ctx.beginPath();
        roundedRect(
          ctx,
          totalInsetX + editorState.padding,
          totalInsetY + editorState.padding,
          insetWidth,
          insetHeight,
          editorState.cornerRadius
        );
        ctx.clip();

        // Draw the image
        ctx.drawImage(
          image,
          totalInsetX + editorState.padding,
          totalInsetY + editorState.padding,
          insetWidth,
          insetHeight
        );
  
        // Draw the frame if selected
        if (editorState.frame) {
          const FrameComponent = editorState.frame.component;
          const frameElement = document.createElement('div');
          frameElement.style.width = `${canvasWidth}px`;
          frameElement.style.height = `${canvasHeight}px`;
          const root = ReactDOM.createRoot(frameElement);
          root.render(<FrameComponent />);
  
          // Use a setTimeout to ensure the component has been rendered
          setTimeout(() => {
            html2canvas(frameElement).then(frameCanvas => {
              ctx.drawImage(
                frameCanvas,
                0,
                0,
                canvasWidth,
                canvasHeight
              );
            });
          }, 0);
        }

        // Draw border if borderWidth > 0
        if (editorState.borderWidth > 0) {
          ctx.strokeStyle = editorState.borderColor;
          ctx.lineWidth = editorState.borderWidth;

          switch (editorState.borderStyle) {
            case 'curved':
              drawCurvedBorder(ctx, totalInsetX + editorState.padding, totalInsetY + editorState.padding, insetWidth, insetHeight, editorState.cornerRadius);
              break;
            case 'sharp':
              ctx.strokeRect(
                totalInsetX + editorState.padding,
                totalInsetY + editorState.padding,
                insetWidth,
                insetHeight
              );
              break;
            case 'round':
              drawRoundBorder(ctx, totalInsetX + editorState.padding, totalInsetY + editorState.padding, insetWidth, insetHeight, editorState.borderWidth / 2);
              break;
          }
        }

        // Restore the context state
        ctx.restore();
      }
    }
  }, [image, editorState, canvasRef, containerRef]);

  const handleDownload = async () => {
    if (containerRef.current) {
      try {
        // Use html2canvas to capture the entire rendered view
        const canvas = await html2canvas(containerRef.current, {
          useCORS: true,
          scale: 2, // Increase quality
          backgroundColor: null // Preserve transparency
        });
        
        // Convert to data URL and trigger download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const maxWidth = canvasSize.width * 0.8;
          const maxHeight = canvasSize.height * 0.8;
          
          let newWidth, newHeight;
          if (aspectRatio > maxWidth / maxHeight) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
          } else {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
          }

          const newSize = { width: newWidth, height: newHeight };
          setEditorState(prev => ({
            ...prev,
            image: event.target?.result as string,
            imageSize: newSize,
            tempImageSize: newSize,
          }));
        };
        img.src = event.target?.result as string;
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
  };

  const handleCropClick = () => {
    if (editorState.cropMode) {
      // Exit crop mode
      setEditorState(prev => ({ ...prev, cropMode: false }));
    } else if (editorState.image) {
      // Enter crop mode only if there's an image
      setEditorState(prev => ({ ...prev, cropMode: true }));
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setEditorState((prev) => ({
      ...prev,
      image: croppedImage,
      cropMode: false,
    }));
  };

  // Function to get 3D transform based on effect
  const getLayoutTransform = () => {
    if (!editorState.layout || editorState.layout.name === "None") {
      return "";
    }
    return editorState.layout.transform;
  };

  const drawCurvedBorder = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
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
    ctx.stroke();
  };

  const drawRoundBorder = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 0);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
    ctx.closePath();
    ctx.stroke();
  };

  // In your useEffect hook or wherever you apply filters
  const applyFilters = () => {
    let filterString = "";
    if (editorState.filter === "brightness") {
      filterString = `brightness(${editorState.brightness}%)`;
    } else if (editorState.filter !== "none") {
      filterString = `${editorState.filter}(100%)`;
    }
    // Apply the filterString to your canvas or image element
  };

  const handleImageSizeUpdate = (size: { width: number; height: number }) => {
    setEditorState(prev => ({
      ...prev,
      tempImageSize: size,
    }));
  };

  const toggleImageSizing = () => {
    setEditorState(prev => ({
      ...prev,
      isSizingImage: !prev.isSizingImage,
      tempImageSize: prev.imageSize,
    }));
  };

  const saveImageSize = () => {
    setEditorState(prev => ({
      ...prev,
      isSizingImage: false,
      imageSize: prev.tempImageSize,
    }));
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full h-full max-w-[calc(100%-50px)] max-h-[calc(100%-50px)] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Topbar */}
        <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="w-[25%]"></div>
          <div className="flex items-center space-x-4 overflow-x-auto flex-grow">
            <button
              onClick={() => fileInputRef.current?.click()}
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
              <button
                onClick={handleCropClick}
                className={`text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out ${
                  editorState.cropMode ? "bg-gray-200" : ""
                }`}
              >
                <Crop size={22} />
              </button>
              <button
                onClick={() =>
                  setEditorState((prev) => ({
                    ...prev,
                    rotate: (prev.rotate + 90) % 360,
                  }))
                }
                className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out"
              >
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
            {editorState.image && (
              <button
                onClick={toggleImageSizing}
                className={`text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out ${
                  editorState.isSizingImage ? "bg-gray-200" : ""
                }`}
              >
                <Move size={22} />
              </button>
            )}
            {editorState.isSizingImage && (
              <button
                onClick={saveImageSize}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out flex items-center space-x-2 shadow-sm"
              >
                <Save size={18} />
                <span>Save Size</span>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center space-x-2 shadow-sm">
              <Share size={18} />
              <span>Share</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out flex items-center space-x-2 shadow-sm"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-96 bg-white overflow-y-auto hide-scrollbar border-r border-gray-200">
            <Sidebar
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </div>

          {/* Editor canvas area */}
          <div
            className="flex-1 mx-4 rounded-2xl overflow-hidden flex items-center justify-center "
            ref={containerRef}
          >
            {editorState.image ? (
              <div
                className="relative"
                style={{
                  width: `${canvasSize.width}px`,
                  height: `${canvasSize.height}px`,
                  background: editorState.background,
                }}
              >
                {editorState.cropMode ? (
                  <CropTool
                    image={editorState.image}
                    onCropComplete={handleCropComplete}
                  />
                ) : editorState.isSizingImage ? (
                  <ImageSizer
                    src={editorState.image}
                    onUpdate={handleImageSizeUpdate}
                    initialSize={editorState.imageSize}
                    containerSize={canvasSize}
                    onFinishResize={toggleImageSizing}
                  />
                ) : (
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 z-10"
                    style={{
                      borderRadius: `${editorState.cornerRadius}px`,
                      filter: `${editorState.filter}(${
                        editorState[editorState.filter as keyof EditorState] || ""
                      })`,
                      transform: getLayoutTransform(),
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                )}
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
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="flex space-x-2 bg-white bg-opacity-80 rounded-full p-1 shadow-md">
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
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-96 bg-white overflow-y-auto hide-scrollbar border-l border-gray-200">
            <RightSidebar
              editorState={editorState}
              setEditorState={setEditorState}
            />
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

