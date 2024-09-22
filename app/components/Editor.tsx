"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import html2canvas from 'html2canvas';
import { EditorState, ThreeDEffect } from "../types";
import {
  Upload, Camera, Pen, Square, Crop, Grid, Undo, Redo, Download,
  Type, Circle, Triangle, Image as ImageIcon, Scissors, Layers,
  Sliders, Smile, Eraser, Move, ZoomIn, RotateCw, Eye, Share2, Share, Save,
} from "lucide-react";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import CropTool from "./CropTool";
import ImageSizer from "./ImageSizer";
import DownloadOptionsCard from "./DownloadOptionsCard";
import '../styles/ThreeDEffects.css';
import ArtboardSizeSelector from "./ArtboardSizeSelector";

type FrameComponentType = React.ComponentType<any> | null;
const Editor = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const defaultInset = 5; // Default inset value (5%)

  const [editorState, setEditorState] = useState<EditorState>({
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: 1,
    inset: { top: 0, bottom: 0, left: 0, right: 0 },
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
    borderColor: "#000000",
    borderStyle: "curved",
    isSizingImage: false,
    imageSize: { width: 0, height: 0 },
    tempImageSize: { width: 0, height: 0 },
    imageShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
    imagePosition: { x: 0, y: 0 },
  });

  const [FrameComponent, setFrameComponent] = useState<FrameComponentType>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const [selectedEffect, setSelectedEffect] = useState<ThreeDEffect | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadOptions, setDownloadOptions] = useState({
    width: canvasSize.width,
    height: canvasSize.height,
    pixelDensity: 2
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      setEditorState(prev => ({
        ...prev,
        imagePosition: {
          x: prev.imagePosition.x + dx,
          y: prev.imagePosition.y + dy
        }
      }));
      setDragStart({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  useEffect(() => {
    if (editorState?.image) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = editorState.image;
    } else {
      setImage(null);
    }
  }, [editorState?.image]);

  useEffect(() => {
    if (editorState.frame) {
      setFrameComponent(() => editorState.frame.component);
    } else {
      setFrameComponent(null);
    }
  }, [editorState.frame]);

  const getThreeDTransform = (effect: ThreeDEffect | null) => {
    if (!effect) return '';

    switch (effect.className) {
      case 'tilt-3d':
        return 'rotateX(-30deg) translateZ(50px)';
      case 'flip-3d':
        return 'rotateY(180deg)';
      case 'rotate-3d':
        return 'rotate3d(1, 1, 1, 45deg)';
      case 'zoom-3d':
        return 'scale3d(1.2, 1.2, 1.2)';
      case 'skew-3d':
        return 'skew(15deg, 15deg) rotateX(-30deg)';
      case 'wave-3d':
        return 'rotateX(-30deg) translateZ(50px)';
      default:
        return '';
    }
  };

  const renderImage = () => {
    if (!editorState.image) return null;

    const applyEffect = selectedEffect !== null;

    return (
      <div
        className="relative"
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
          perspective: '1000px',
        }}
      >
        <div
          className="relative"
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            background: editorState.background,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className={`absolute ${selectedEffect?.className || ''}`}
            style={{
              width: `${editorState.imageSize.width}px`,
              height: `${editorState.imageSize.height}px`,
              left: '45%',
              top: '45%',
              transform: `translate(-50%, -50%) ${getThreeDTransform(selectedEffect)}`,
              transformOrigin: 'center',
              transition: 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
            }}
          >
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 z-0"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: `${editorState.cornerRadius}px`,
                filter: `${editorState.filter}(${
                  editorState[editorState.filter as keyof EditorState] || ""
                })`,
                transform: getLayoutTransform(),
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
          {FrameComponent && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
              <FrameComponent />
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (selectedEffect?.className === 'wave-3d') {
      const container = document.querySelector('.wave-3d');
      if (container) {
        let frame = 0;
        const animate = () => {
          frame = (frame + 1) % 360;
          (container as HTMLElement).style.transform = `translate(-50%, -50%) rotateX(-30deg) translateZ(50px) translateY(${Math.sin(frame * Math.PI / 180) * 20}px)`;
          requestAnimationFrame(animate);
        };
        animate();
      }
    }
  }, [selectedEffect]);

  useEffect(() => {
    if (image && canvasRef.current && containerRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const { width: newWidth, height: newHeight } = editorState.imageSize;

        // Calculate inset values
        const totalInsetX = (editorState.inset.left / 100) * newWidth;
        const totalInsetY = (editorState.inset.top / 100) * newHeight;
        const insetWidth = newWidth - (editorState.inset.left + editorState.inset.right) / 100 * newWidth;
        const insetHeight = newHeight - (editorState.inset.top + editorState.inset.bottom) / 100 * newHeight;

        // Add padding to canvas size
        const canvasWidth = newWidth + editorState.padding * 2;
        const canvasHeight = newHeight + editorState.padding * 2;

        // Set canvas size
        setCanvasSize({ width: canvasWidth, height: canvasHeight });
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;

        // Clear the entire canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Save the context state
        ctx.save();

        // Apply transformations
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate((editorState.rotate * Math.PI) / 180);
        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

        // Apply shadow
        ctx.shadowColor = editorState.imageShadow.split(")")[0] + ")";
        ctx.shadowBlur = parseInt(editorState.imageShadow.split("px")[1]);
        ctx.shadowOffsetX = parseInt(
          editorState.imageShadow.split("px")[0].split(" ").pop() || "0"
        );
        ctx.shadowOffsetY = parseInt(
          editorState.imageShadow.split("px")[1].split(" ").pop() || "0"
        );

        // Draw the image at the current position
        ctx.drawImage(
          image,
          editorState.imagePosition.x + totalInsetX + editorState.padding,
          editorState.imagePosition.y + totalInsetY + editorState.padding,
          insetWidth,
          insetHeight
        );

        // Restore the context state
        ctx.restore();

        // Draw border if needed
        if (editorState.borderWidth > 0) {
          ctx.strokeStyle = editorState.borderColor;
          ctx.lineWidth = editorState.borderWidth;
          if (editorState.borderStyle === 'curved') {
            drawCurvedBorder(ctx, editorState.padding, editorState.padding, canvasWidth - 2 * editorState.padding, canvasHeight - 2 * editorState.padding, editorState.cornerRadius);
          } else {
            drawRoundBorder(ctx, editorState.padding, editorState.padding, canvasWidth - 2 * editorState.padding, canvasHeight - 2 * editorState.padding, editorState.cornerRadius);
          }
        }
      }
    }
  }, [image, editorState, canvasRef, containerRef]);

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

  const drawCurvedBorder = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
  };

  const handleCropClick = () => {
    if (editorState.cropMode) {
      setEditorState(prev => ({ ...prev, cropMode: false }));
    } else if (editorState.image) {
      setEditorState(prev => ({ ...prev, cropMode: true }));
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setEditorState(prev => ({
      ...prev,
      image: croppedImage,
      cropMode: false,
    }));
  };

  const getLayoutTransform = () => {
    if (!editorState.layout || editorState.layout.name === "None") {
      return "";
    }
    return editorState.layout.transform;
  };

  const handleDownloadClick = () => {
    setDownloadOptions({
      width: canvasSize.width,
      height: canvasSize.height,
      pixelDensity: 2
    });
    setShowDownloadOptions(true);
  };

  const handleDownload = async (options: { width: number; height: number; pixelDensity: number }) => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current, {
          useCORS: true,
          scale: options.pixelDensity,
          width: options.width,
          height: options.height,
          backgroundColor: null,
          logging: true, // Enable logging for debugging
        });
        
        // Ensure the canvas has content
        if (canvas.width > 0 && canvas.height > 0) {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = 'edited-image.png';
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Generated canvas is empty");
        }
      } catch (error) {
        console.error("Error generating image:", error);
      }
    } else {
      console.error("Container ref is null");
    }
    setShowDownloadOptions(false);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = window.innerWidth * 0.7; // 70% of window width
          const maxHeight = window.innerHeight * 0.7; // 70% of window height
          const padding = 40;
          let newWidth = img.width;
          let newHeight = img.height;
          // Scale down the image if it's larger than the max dimensions
          if (newWidth > maxWidth - 2 * padding || newHeight > maxHeight - 2 * padding) {
            const ratio = Math.min(
              (maxWidth - 2 * padding) / newWidth,
              (maxHeight - 2 * padding) / newHeight
            );
            newWidth *= ratio;
            newHeight *= ratio;
          }
          // Add padding
          newWidth += 2 * padding;
          newHeight += 2 * padding;
          const newSize = { width: newWidth, height: newHeight };
          setEditorState(prev => ({
            ...prev,
            image: event.target?.result as string,
            imageSize: newSize,
            tempImageSize: newSize,
            imagePosition: { x: padding, y: padding },
            padding: padding,
          }));
          // Update canvas size
          setCanvasSize({ width: newWidth, height: newHeight });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSizeUpdate = (size: { width: number; height: number }) => {
    setEditorState(prev => ({
      ...prev,
      tempImageSize: size,
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
                  setEditorState(prev => ({
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
                onClick={() => setEditorState(prev => ({ ...prev, isSizingImage: !prev.isSizingImage, tempImageSize: prev.imageSize }))}
                className={`text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out ${
                  editorState.isSizingImage ? "bg-gray-200" : ""
                }`}
              >
                <ZoomIn size={22} />
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
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <button
              onClick={handleDownloadClick}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center space-x-2 shadow-sm"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-96 bg-white overflow-y-auto hide-scrollbar border-r border-gray-200">
            <Sidebar editorState={editorState} setEditorState={setEditorState} />
          </div>

          {/* Editor canvas area */}
          <div
            className="flex-1 mx-4 rounded-2xl overflow-hidden flex items-center justify-center"
            ref={containerRef}
          >
             {editorState.image ? (
          editorState.cropMode ? (
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
              onFinishResize={saveImageSize}
            />
          ) : (
            renderImage()
          )
        ) : (
              <div className="text-center p-4 bg-white rounded-2xl shadow-md justify-center items-center">
                <div className="border-2 border-blue-400 border-dashed p-6 rounded-2xl justify-center items-center flex flex-col px-14">
                  <img
                    src="https://media.lordicon.com/icons/wired/flat/198-upload-1.gif"
                    width={100}
                    height={100}
                    alt="Upload icon"
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
            {editorState.image && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="flex space-x-2 bg-white bg-opacity-80 rounded-full p-1 shadow-md">
                  <button
                    onClick={() => setEditorState(prev => ({ ...prev, isSizingImage: !prev.isSizingImage, tempImageSize: prev.imageSize }))}
                    className={`p-2 hover:bg-gray-100 rounded-full transition duration-300 ease-in-out ${
                      editorState.isSizingImage ? "bg-gray-200" : ""
                    }`}
                  >
                    <ZoomIn size={22} className="text-gray-700" />
                  </button>
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
              selectedEffect={selectedEffect}
              setSelectedEffect={setSelectedEffect}
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

      {showDownloadOptions && (
        <DownloadOptionsCard
          defaultOptions={downloadOptions}
          onDownload={handleDownload}
          onCancel={() => setShowDownloadOptions(false)}
        />
      )}
    </div>
  );
};

export default Editor;