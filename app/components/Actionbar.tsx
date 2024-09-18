'use client'
import { Download, Crop, Edit, Undo } from 'lucide-react'; // Importing icons from Lucide
interface ActionBarProps {
  onDownload: () => void;
  onCrop: () => void;
  onAnnotate: () => void;
  onUndo: () => void;
}

export default function ActionBar({ onDownload, onCrop, onAnnotate, onUndo }: ActionBarProps) {
  return (
    <div className="w-auto justify-end flex flex-row items-center bg-gray-800 rounded-2xl p-4 shadow-lg space-x-4">
      <button
        onClick={onDownload}
        className="flex items-center justify-center bg-purple-500 p-3 rounded-full hover:bg-purple-600 transition duration-300 shadow-md"
      >
        <Download className="text-white" size={24} />
      </button>
      <button
        onClick={onCrop}
        className="flex items-center justify-center bg-red-500 p-3 rounded-full hover:bg-red-600 transition duration-300 shadow-md"
      >
        <Crop className="text-white" size={24} />
      </button>
      <button
        onClick={onAnnotate}
        className="flex items-center justify-center bg-yellow-500 p-3 rounded-full hover:bg-yellow-600 transition duration-300 shadow-md"
      >
        <Edit className="text-white" size={24} />
      </button>
      <button
        onClick={onUndo}
        className="flex items-center justify-center bg-gray-500 p-3 rounded-full hover:bg-gray-600 transition duration-300 shadow-md"
      >
        <Undo className="text-white" size={24} />
      </button>
    </div>
  );
}
