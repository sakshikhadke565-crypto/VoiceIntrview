import React from 'react';
import { cn } from '../../utils/cn';

interface VoiceVisualizerProps {
  isRecording: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isRecording }) => {
  return (
    <div className="flex items-center justify-center h-16 space-x-1">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1.5 bg-indigo-500 rounded-full transition-all duration-150',
            isRecording ? 'animate-pulse' : 'h-1.5'
          )}
          style={
            isRecording
              ? {
                  height: `${Math.max(10, Math.random() * 40)}px`,
                  animationDelay: `${i * 0.05}s`,
                }
              : undefined
          }
        />
      ))}
    </div>
  );
};
