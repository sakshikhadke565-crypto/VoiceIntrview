import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '../components/interview/QuestionCard';
import { VoiceRecorder } from '../components/interview/VoiceRecorder';

export const Interview: React.FC = () => {
  const navigate = useNavigate();

  const handleRecordingComplete = () => {
    navigate('/review');
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Question */}
          <div className="h-full">
            <QuestionCard
              questionNumber={1}
              totalQuestions={10}
              topic="Python"
              difficulty="Medium"
              question="Explain what a generator is in Python and how the yield keyword differs from return."
            />
          </div>

          {/* Right Column: Voice Interaction */}
          <div className="h-full flex flex-col items-center justify-center bg-slate-900/30 rounded-2xl border border-slate-800/50 p-8 relative overflow-hidden">
            {/* Ambient background for recorder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>
            
            <div className="relative z-10 w-full">
              <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
              
              <div className="flex justify-between w-full mt-16 px-4">
                <button className="text-gray-500 hover:text-white transition-colors text-sm font-medium" disabled>
                  ← Previous Question
                </button>
                <button className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  Skip Question →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
