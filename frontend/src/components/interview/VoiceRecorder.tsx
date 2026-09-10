import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2, Send, Keyboard } from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';
import { cn } from '../../utils/cn';

interface VoiceRecorderProps {
  onRecordingComplete: (transcript: string) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const ANSWER_TIME_LIMIT = 120;
  const [state, setState] = useState<'ready' | 'listening' | 'processing' | 'done'>('ready');
  const [remainingTime, setRemainingTime] = useState(ANSWER_TIME_LIMIT);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasMicrophone, setHasMicrophone] = useState<boolean | null>(null); // null = checking
  const [useTextFallback, setUseTextFallback] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Check for available audio input devices on mount
  useEffect(() => {
    const checkMicrophone = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          setHasMicrophone(false);
          setUseTextFallback(true);
          return;
        }
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((d) => d.kind === 'audioinput');
        if (audioInputs.length === 0) {
          setHasMicrophone(false);
          setUseTextFallback(true);
        } else {
          setHasMicrophone(true);
        }
      } catch {
        setHasMicrophone(false);
        setUseTextFallback(true);
      }
    };
    checkMicrophone();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state === 'listening') {
      interval = setInterval(() => {
        setRemainingTime((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  // Auto-stop when timer reaches 0
  useEffect(() => {
    if (remainingTime === 0 && state === 'listening') {
      stopRecording();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime, state]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMediaTracks();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    try {
      setError(null);
      setTranscript(null);
      // Always start fresh chunks for a new recording
      chunksRef.current = [];

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Your browser does not support microphone access. Please use a modern browser.');
        setUseTextFallback(true);
        return;
      }

      // Release any existing stream before starting a new one
      stopMediaTracks();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stop microphone tracks immediately
        stopMediaTracks();

        // Create blob from current chunks
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        // Clear chunks so a new recording starts fresh
        chunksRef.current = [];

        await processAudio(audioBlob);
      };

      mediaRecorder.start(100);
      setState('listening');
      setRemainingTime(ANSWER_TIME_LIMIT);
    } catch (err) {
      console.error('Error accessing microphone:', err);

      let message = 'Could not access microphone. You can type your answer below.';
      if (err instanceof DOMException) {
        switch (err.name) {
          case 'NotFoundError':
            message = 'Microphone not found. You can type your answer below.';
            break;
          case 'NotAllowedError':
            message = 'Microphone access denied. You can type your answer below.';
            break;
          case 'NotReadableError':
            message = 'Microphone is in use or unavailable. You can type your answer below.';
            break;
          case 'SecurityError':
            message = 'Microphone access blocked. You can type your answer below.';
            break;
        }
      }

      // Clear stale recording state
      mediaRecorderRef.current = null;
      chunksRef.current = [];
      stopMediaTracks();

      setError(message);
      setUseTextFallback(true);
      setState('ready');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setState('processing');
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'answer.webm');

      const response = await fetch('/speech/to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process speech to text');
      }

      const data = await response.json();
      const finalTranscript = data.transcript as string;

      setTranscript(finalTranscript);
      setState('done');

      // Notify parent immediately with the real transcript.
      // The parent (Interview.tsx) decides when to navigate/submit.
      onRecordingComplete(finalTranscript);

    } catch (err) {
      console.error('STT error:', err);
      setError('Failed to convert speech to text. You can type your answer below.');
      setUseTextFallback(true);
      setState('ready');
    }
  };

  const handleStopClick = () => {
    if (state === 'listening') {
      stopRecording();
    }
  };

  const handleRetry = () => {
    setState('ready');
    setTranscript(null);
    setError(null);
    setUseTextFallback(hasMicrophone === false);
    setTextAnswer('');
    // Also release any lingering stream
    stopMediaTracks();
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  };

  const handleTextSubmit = () => {
    if (!textAnswer.trim()) return;
    const answer = textAnswer.trim();
    setTranscript(answer);
    setState('done');

    // Notify parent immediately — no auto-navigation delay
    onRecordingComplete(answer);
  };

  const handleSwitchToText = () => {
    setUseTextFallback(true);
    setError(null);
  };

  // Still checking for microphone
  if (hasMicrophone === null) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="relative flex items-center justify-center">
          <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          </div>
        </div>
        <div className="text-center h-16">
          <h3 className="text-xl font-medium text-white mb-2">Checking microphone...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Voice Recording UI — shown when NOT using text fallback */}
      {!useTextFallback && (
        <>
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
              onClick={state === 'ready' ? handleStart : state === 'listening' ? handleStopClick : undefined}
              disabled={state === 'processing' || state === 'done'}
              className={cn(
                'relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-700',
                state === 'ready' && 'bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300',
                state === 'listening' && 'bg-indigo-600 text-white shadow-indigo-500/50 glow',
                (state === 'processing' || state === 'done') && 'bg-slate-800 text-gray-400 cursor-not-allowed'
              )}
            >
              {state === 'ready' && <Mic className="w-10 h-10" />}
              {state === 'listening' && <Square className="w-8 h-8 fill-current" />}
              {state === 'processing' && <Loader2 className="w-10 h-10 animate-spin" />}
              {state === 'done' && <Mic className="w-10 h-10 opacity-50" />}
            </button>
          </div>

          {/* State Text & Timer */}
          <div className="text-center h-16">
            <h3 className="text-xl font-medium text-white mb-2">
              {state === 'ready' && 'Ready to Answer'}
              {state === 'listening' && 'Listening...'}
              {state === 'processing' && 'Processing Audio...'}
              {state === 'done' && 'Answer Recorded'}
            </h3>
            {state === 'listening' && (
              <div className="flex flex-col items-center">
                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider font-semibold">Answer Time</p>
                <p className={cn("font-mono text-lg", remainingTime <= 10 ? "text-red-400 animate-pulse" : "text-indigo-400")}>
                  {formatTime(remainingTime)}
                </p>
              </div>
            )}
          </div>

          {/* Visualizer */}
          <div className="w-full max-w-xs h-16 flex flex-col items-center justify-center">
            {state === 'listening' && <VoiceVisualizer isRecording={true} />}
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            {transcript && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-sm text-gray-300 max-h-32 overflow-y-auto w-full text-left">
                <p className="text-indigo-400 text-xs uppercase mb-1 font-semibold">Transcript:</p>
                {transcript}
              </div>
            )}
          </div>

          {/* Helper text */}
          <p className="text-gray-400 text-sm max-w-sm text-center">
            {state === 'ready' && 'Click the microphone to start your answer.'}
            {state === 'listening' && 'Click the square to stop recording.'}
            {state === 'processing' && 'Your answer will be converted to text and evaluated by AI.'}
            {state === 'done' && (
              <button onClick={handleRetry} className="text-indigo-400 hover:text-indigo-300 underline mt-2">
                Record again
              </button>
            )}
          </p>

          {/* Switch to text option — only when mic is available but user prefers typing */}
          {state === 'ready' && (
            <button
              onClick={handleSwitchToText}
              className="text-gray-500 hover:text-gray-300 text-xs flex items-center gap-1 transition-colors"
            >
              <Keyboard className="w-3 h-3" />
              Type answer instead
            </button>
          )}
        </>
      )}

      {/* Text Answer Fallback — shown when no mic or user chose to type */}
      {useTextFallback && state !== 'done' && (
        <>
          <div className="relative flex items-center justify-center">
            <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700 text-indigo-400">
              <Keyboard className="w-10 h-10" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-medium text-white mb-2">Type Your Answer</h3>
            {error && <p className="text-yellow-400 text-xs mb-2">{error}</p>}
            {!error && hasMicrophone === false && (
              <p className="text-gray-400 text-xs mb-2">No microphone detected. Type your answer below.</p>
            )}
          </div>

          <div className="w-full max-w-sm space-y-4">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={5}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none text-sm placeholder-gray-500"
            />
            <button
              onClick={handleTextSubmit}
              disabled={!textAnswer.trim()}
              className={cn(
                'w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all',
                textAnswer.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800 text-gray-500 cursor-not-allowed border border-slate-700'
              )}
            >
              <Send className="w-4 h-4" />
              Submit Answer
            </button>
          </div>

          {/* Switch back to voice if mic exists */}
          {hasMicrophone && (
            <button
              onClick={() => { setUseTextFallback(false); setError(null); setTextAnswer(''); }}
              className="text-gray-500 hover:text-gray-300 text-xs flex items-center gap-1 transition-colors"
            >
              <Mic className="w-3 h-3" />
              Use microphone instead
            </button>
          )}
        </>
      )}

      {/* Done state for text fallback */}
      {useTextFallback && state === 'done' && (
        <>
          <div className="relative flex items-center justify-center">
            <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700 text-gray-400">
              <Keyboard className="w-10 h-10 opacity-50" />
            </div>
          </div>
          <div className="text-center h-16">
            <h3 className="text-xl font-medium text-white mb-2">Answer Submitted</h3>
          </div>
          <div className="w-full max-w-xs">
            {transcript && (
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-sm text-gray-300 max-h-32 overflow-y-auto w-full text-left">
                <p className="text-indigo-400 text-xs uppercase mb-1 font-semibold">Your Answer:</p>
                {transcript}
              </div>
            )}
          </div>
          <p className="text-gray-400 text-sm max-w-sm text-center">
            <button onClick={handleRetry} className="text-indigo-400 hover:text-indigo-300 underline mt-2">
              Answer again
            </button>
          </p>
        </>
      )}
    </div>
  );
};
