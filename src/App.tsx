import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from './components/Canvas';
import { Controls } from './components/Controls';
import { Timeline } from './components/Timeline';
import { Pencil } from 'lucide-react';

function App() {
  const [frames, setFrames] = useState<ImageData[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameRate, setFrameRate] = useState(12);
  const [isDrawing, setIsDrawing] = useState(true);

  const canvasWidth = 600;
  const canvasHeight = 400;

  useEffect(() => {
    // Initialize with one blank frame
    if (frames.length === 0) {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const frameData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        setFrames([frameData]);
      }
    }
  }, []);

  useEffect(() => {
    let intervalId: number;
    if (isPlaying && frames.length > 1) {
      intervalId = window.setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % frames.length);
      }, 1000 / frameRate);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, frames.length, frameRate]);

  const handleFrameUpdate = useCallback((frameData: ImageData) => {
    setFrames((prev) => {
      const newFrames = [...prev];
      newFrames[currentFrame] = frameData;
      return newFrames;
    });
  }, [currentFrame]);

  const handleAddFrame = () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const frameData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      setFrames((prev) => [...prev, frameData]);
      setCurrentFrame(frames.length);
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let gifFrames: string[] = [];
    frames.forEach((frame) => {
      ctx.putImageData(frame, 0, 0);
      gifFrames.push(canvas.toDataURL());
    });

    // Create download link for frames
    const link = document.createElement('a');
    link.href = gifFrames[0]; // Download first frame as PNG
    link.download = 'animation-frame.png';
    link.click();
  };

  const handleClearFrame = () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const frameData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      handleFrameUpdate(frameData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Pencil className="w-8 h-8" />
            Animation Studio
          </h1>
          <button
            onClick={() => setIsDrawing(!isDrawing)}
            className={`px-4 py-2 rounded-lg ${
              isDrawing ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isDrawing ? 'Drawing Mode' : 'View Mode'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center">
            <Canvas
              width={canvasWidth}
              height={canvasHeight}
              isDrawing={isDrawing}
              currentFrame={currentFrame}
              frames={frames}
              onFrameUpdate={handleFrameUpdate}
            />
          </div>
        </div>

        <Controls
          isPlaying={isPlaying}
          frameRate={frameRate}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onAddFrame={handleAddFrame}
          onDownload={handleDownload}
          onFrameRateChange={setFrameRate}
          onClearFrame={handleClearFrame}
        />

        <Timeline
          frames={frames}
          currentFrame={currentFrame}
          onFrameSelect={setCurrentFrame}
        />
      </div>
    </div>
  );
}

export default App;