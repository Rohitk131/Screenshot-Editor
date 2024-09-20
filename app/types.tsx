import { StaticImageData } from 'next/image';

export interface EditorState {
  background: string;
  padding: number;
  inset: number;
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
  src: StaticImageData;
  label: string;
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