import { EditorState, Filter } from '../types';
import ColorPicker from './ColorPicker';

interface SidebarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  onUpload: () => void;
  onTabScreenshot: () => void;
  onDownload: () => void;
  onCrop: () => void;
  onAnnotate: () => void;
  onUndo: () => void; // Add the onUndo prop
}

export default function Sidebar({ editorState, setEditorState, onUpload, onTabScreenshot, onDownload, onCrop, onAnnotate, onUndo }: SidebarProps) {
  const gradients = [
    'linear-gradient(to right, #ff9a9e, #fad0c4)',
    'linear-gradient(to right, #a18cd1, #fbc2eb)',
    'linear-gradient(to right, #ffecd2, #fcb69f)',
  ];

  const filters: Filter[] = ['none', 'grayscale', 'sepia', 'blur', 'invert', 'brightness', 'contrast'];

  return (
    <div className="w-64 bg-gray-800 p-4 overflow-y-auto text-sm">
      <h2 className="text-xl font-bold mb-4">Editor</h2>
      
      <section className="mb-4">
        <h3 className="font-semibold mb-2">Screenshot</h3>
        <button onClick={onUpload} className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full">
          Upload Image
        </button>
        <button onClick={onTabScreenshot} className="bg-green-500 text-white px-4 py-2 rounded mb-2 w-full">
          Capture Tab
        </button>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Background</h3>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              className="w-full h-8 rounded"
              style={{ background: gradient }}
              onClick={() => setEditorState(prev => ({ ...prev, background: gradient }))}
            />
          ))}
        </div>
        <ColorPicker
          color={editorState.background}
          onChange={(color) => setEditorState(prev => ({ ...prev, background: color }))}
        />
      </section>
      
      <section className="mb-4">
        <h3 className="font-semibold mb-2">Adjustments</h3>
        {['padding', 'inset', 'shadow', 'cornerRadius', 'rotate'].map((adjustment) => (
          <label key={adjustment} className="block mb-2">
            {adjustment.charAt(0).toUpperCase() + adjustment.slice(1)}
            <input
              type="range"
              min="0"
              max={adjustment === 'rotate' ? '360' : '100'}
              value={editorState[adjustment as keyof EditorState] as number}
              onChange={(e) => setEditorState(prev => ({ ...prev, [adjustment]: Number(e.target.value) }))}
              className="w-full"
            />
          </label>
        ))}
      </section>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Filters</h3>
        <select
          value={editorState.filter}
          onChange={(e) => setEditorState(prev => ({ ...prev, filter: e.target.value as Filter }))}
          className="w-full bg-gray-700 p-2 rounded"
        >
          {filters.map(filter => (
            <option key={filter} value={filter}>{filter}</option>
          ))}
        </select>
        {(editorState.filter === 'brightness' || editorState.filter === 'contrast') && (
          <input
            type="range"
            min="0"
            max="200"
            value={editorState[editorState.filter]}
            onChange={(e) => setEditorState(prev => ({ ...prev, [editorState.filter]: Number(e.target.value) }))}
            className="w-full mt-2"
          />
        )}
      </section>

      <section className="mb-4">
        <h3 className="font-semibold mb-2">Actions</h3>
        <button onClick={onDownload} className="bg-purple-500 text-white px-4 py-2 rounded mb-2 w-full">
          Download
        </button>
        <button onClick={onCrop} className="bg-red-500 text-white px-4 py-2 rounded mb-2 w-full">
          Crop Image
        </button>
        <button onClick={onAnnotate} className="bg-yellow-500 text-white px-4 py-2 rounded mb-2 w-full">
          Annotate
        </button>
        <button onClick={onUndo} className="bg-gray-500 text-white px-4 py-2 rounded mb-2 w-full">
          Undo
        </button>
      </section>

      {editorState.isAnnotating && (
        <section className="mb-4">
          <h3 className="font-semibold mb-2">Annotation Tools</h3>
          <div className="mb-2">
            <label className="block mb-1">Pen Type</label>
            <select
              value={editorState.penType}
              onChange={(e) => setEditorState(prev => ({ ...prev, penType: e.target.value as 'pen' | 'pencil' | 'marker' | 'eraser' }))}
              className="w-full bg-gray-700 p-2 rounded"
            >
              <option value="pen">Pen</option>
              <option value="pencil">Pencil</option>
              <option value="marker">Marker</option>
              <option value="eraser">Eraser</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Pen Color</label>
            <ColorPicker
              color={editorState.penColor}
              onChange={(color) => setEditorState(prev => ({ ...prev, penColor: color }))}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Pen Size</label>
            <input
              type="range"
              min="1"
              max="50"
              value={editorState.penSize}
              onChange={(e) => setEditorState(prev => ({ ...prev, penSize: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
        </section>
      )}
    </div>
  );
}