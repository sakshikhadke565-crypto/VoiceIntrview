import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface AudioPlayerProps {
  duration?: number; // mock duration in seconds
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ duration = 45 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const progress = 0;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-center space-x-4">
      <Button
        variant="primary"
        size="sm"
        className="w-10 h-10 p-0 rounded-full flex-shrink-0"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
      </Button>

      <div className="flex-1">
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-2 cursor-pointer">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${isPlaying ? 30 : progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-mono">
          <span>{formatTime(isPlaying ? 15 : 0)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="hidden sm:block flex-shrink-0">
        <Volume2 className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};
