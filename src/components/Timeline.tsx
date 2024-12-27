import React from 'react';

interface TimelineProps {
  frames: ImageData[];
  currentFrame: number;
  onFrameSelect: (index: number) => void;
}

export function Timeline({ frames, currentFrame, onFrameSelect }: TimelineProps) {
  return (
    <div className="flex gap-2 p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      {frames.map((frame, index) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = frame.width;
          canvas.height = frame.height;
          ctx.putImageData(frame, 0, 0);
        }

        return (
          <button
            key={index}
            onClick={() => onFrameSelect(index)}
            className={`relative min-w-[100px] h-[100px] border-2 rounded ${
              currentFrame === index ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <img
              src={canvas.toDataURL()}
              alt={`Frame ${index + 1}`}
              className="w-full h-full object-contain"
            />
            <span className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-tl">
              {index + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}