import React, { useState, useEffect } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';
import { cn } from '../../utils/cn';

interface VoiceRecorderProps {
  onRecordingComplete: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const [state, setState] = useState<'ready' | 'listening' | 'processing'>('ready');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state === 'listening') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setState('listening');
    setTimer(0);
  };

  const handleStop = () => {
    setState('processing');
    // Mock processing delay
    setTimeout(() => {
      onRecordingComplete();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Microphone UI */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings */}
        {state === 'listening' && (
          <>
            <div className="absolute w-32 h-32 rounded-full bg-indigo-500/20 animate-pulse-ring" />
            <div className="absolute w-32 h-32 rounded-full bg-indigo-500/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        {/* Main button */}
        <button
          onClick={state === 'ready' ? handleStart : state === 'listening' ? handleStop : undefined}
          disabled={state === 'processing'}
          className={cn(
            'relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-700',
            state === 'ready' && 'bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300',
            state === 'listening' && 'bg-indigo-600 text-white shadow-indigo-500/50 glow',
            state === 'processing' && 'bg-slate-800 text-gray-400 cursor-not-allowed'
          )}
        >
          {state === 'ready' && <Mic className="w-10 h-10" />}
          {state === 'listening' && <Square className="w-8 h-8 fill-current" />}
          {state === 'processing' && <Loader2 className="w-10 h-10 animate-spin" />}
        </button>
      </div>

      {/* State Text & Timer */}
      <div className="text-center h-16">
        <h3 className="text-xl font-medium text-white mb-2">
          {state === 'ready' && 'Ready to Answer'}
          {state === 'listening' && 'Listening...'}
          {state === 'processing' && 'Processing Audio...'}
        </h3>
        {state === 'listening' && (
          <p className="text-indigo-400 font-mono text-lg">{formatTime(timer)}</p>
        )}
      </div>

      {/* Visualizer */}
      <div className="w-full max-w-xs h-16">
        {state === 'listening' && <VoiceVisualizer isRecording={true} />}
      </div>

      {/* Helper text */}
      <p className="text-gray-400 text-sm max-w-sm text-center">
        {state === 'ready' && 'Click the microphone to start your answer.'}
        {state === 'listening' && 'Click the square to stop recording.'}
        {state === 'processing' && 'Your answer will be converted to text and evaluated by AI.'}
      </p>
    </div>
  );
};
