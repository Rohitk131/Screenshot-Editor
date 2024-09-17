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
  annotations: any[];
  isAnnotating: boolean;
  penType: 'pen' | 'pencil' | 'marker' | 'eraser';
  penColor: string;
  penSize: number;
}

export type Filter = 'none' | 'grayscale' | 'sepia' | 'blur' | 'invert' | 'brightness' | 'contrast';