export interface EditorState {
  effect3D: string;
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
  frame: Frame | null; // Ensure Frame type is correctly defined
  theme?: 'light' | 'dark'; // Add theme property if needed
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