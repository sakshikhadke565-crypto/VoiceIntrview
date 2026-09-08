import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { AudioPlayer } from '../components/interview/AudioPlayer';

export const AnswerReview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Review Your Answer</h1>
          <p className="text-gray-400">Please review your answer before submitting it to the AI for evaluation.</p>
        </div>

        <Card className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Recorded Audio</h3>
            <AudioPlayer duration={45} />
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Transcript</h3>
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <p className="text-gray-300 leading-relaxed font-sans">
                "I would explain a generator as a special kind of function in Python that returns a lazy iterator. 
                Instead of returning all the items at once like a normal function using the return keyword, 
                a generator yields items one at a time using the yield keyword. This means it doesn't store the 
                entire sequence in memory, making it highly memory-efficient for large datasets."
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex justify-end">Recorded duration: 45s</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 border-t border-slate-800/50">
            <Button variant="outline" size="lg" className="flex-1" onClick={() => navigate('/interview')}>
              <RefreshCcw className="w-5 h-5 mr-2" />
              Re-record
            </Button>
            <Button variant="primary" size="lg" className="flex-1" onClick={() => navigate('/evaluation')}>
              <Check className="w-5 h-5 mr-2" />
              Submit Answer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
