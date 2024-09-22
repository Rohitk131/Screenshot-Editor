import { StaticImageData } from 'next/image';
export interface Frame {
  label: string;
  component: React.FC;
}
export interface EditorState {
  selectedStyle: any;
  effect3DOpacity: number;
  effect3DClassName: string;
  effect3DType: string;
  background: string;
  padding: number;
  shadow: number;
  cornerRadius: number;
  image: string | null;
  crop: { x: number; y: number; width: number; height: number };
  rotate: number;
  filter: Filter;
  brightness: number;
  contrast: number;
  annotations: Annotation[];
  isAnnotating: boolean;
  currentTool: 'pen' | 'pencil' | 'marker' | 'eraser';
  penColor: string;
  penSize: number;
  shapes: Shape[];
  mosaicSize: number;
  frame: Frame | null;
  theme: 'light' | 'dark';
  cropMode: boolean;
  layout: Layout;
  borderWidth: number;
  borderColor: string;
  borderStyle: 'curved' | 'sharp' | 'round';
  imagePosition: { x: number; y: number };
  imageSize: { width: number; height: number };
  isSizingImage: boolean;
  tempImageSize: { width: number; height: number };
  imageShadow: string;
  shadowIntensity: { [key: number]: number };
  saturation: number;
  hue: number;
  blur: number;
  opacity: number;
  grayscale: number;
  effect3D: boolean;
  effect3DIntensity: number;
  selectedEffect: ThreeDEffect | null;
  inset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export type Filter = 'none' | 'grayscale' | 'sepia' | 'blur' | 'invert' | 'brightness' | 'contrast';

export type Tool = 'none' | 'upload' | 'screenshot' | 'annotate' | 'shape' | 'crop' | 'mosaic';


export interface Annotation {
  path: { x: number; y: number }[];
  color: string;
  size: number;
  tool: 'pen' | 'pencil' | 'marker' | 'eraser';
}

export interface Shape {
  type: 'rectangle' | 'ellipse' | 'arrow';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  strokeWidth: number;
}

export interface Frame {
  src?: StaticImageData; 
  label: string;
  component: React.FC;
}

export interface Layout {
  name: string;
  transform: string;
}
const applyEffect3D = (
  ctx: CanvasRenderingContext2D | null,
  effect: string,
  width: number,
  height: number
) => {
  if (!ctx) return;
  // ... (rest of the function)
};
export interface ThreeDEffect {
  name: string;
  className: string;
}