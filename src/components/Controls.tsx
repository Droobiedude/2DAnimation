import React from 'react';
import { Play, Pause, Plus, Download, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  frameRate: number;
  onPlayPause: () => void;
  onAddFrame: () => void;
  onDownload: () => void;
  onFrameRateChange: (rate: number) => void;
  onClearFrame: () => void;
}

export function Controls({
  isPlaying,
  frameRate,
  onPlayPause,
  onAddFrame,
  onDownload,
  onFrameRateChange,
  onClearFrame,
}: ControlsProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onPlayPause}
        className="p-2 rounded-full hover:bg-gray-100"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      <button
        onClick={onAddFrame}
        className="p-2 rounded-full hover:bg-gray-100"
        title="Add Frame"
      >
        <Plus size={24} />
      </button>

      <button
        onClick={onClearFrame}
        className="p-2 rounded-full hover:bg-gray-100"
        title="Clear Frame"
      >
        <RotateCcw size={24} />
      </button>

      <div className="flex items-center gap-2">
        <label htmlFor="frameRate" className="text-sm font-medium">
          Frame Rate:
        </label>
        <input
          id="frameRate"
          type="number"
          min="1"
          max="60"
          value={frameRate}
          onChange={(e) => onFrameRateChange(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <span className="text-sm">fps</span>
      </div>

      <button
        onClick={onDownload}
        className="p-2 rounded-full hover:bg-gray-100"
        title="Download Animation"
      >
        <Download size={24} />
      </button>
    </div>
  );
}