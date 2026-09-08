import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ScoreCard } from '../components/interview/ScoreCard';
import { ScoreCircle } from '../components/ui/ScoreCircle';
import { FeedbackCard } from '../components/interview/FeedbackCard';

export const Evaluation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Interview Evaluation</h1>
            <p className="text-gray-400">Detailed feedback for your previous answer.</p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center bg-slate-800/80 rounded-2xl p-4 border border-slate-700/50">
            <div className="mr-6">
              <span className="block text-sm text-gray-400 font-medium mb-1">Overall Score</span>
              <span className="text-2xl font-bold text-white">82 / 100</span>
            </div>
            <ScoreCircle score={82} size="sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScoreCard title="Relevance" score={85} icon={<TargetIcon />} />
          <ScoreCard title="Technical Depth" score={78} icon={<Brain className="w-5 h-5" />} />
          <ScoreCard title="Clarity" score={88} icon={<MessageSquare className="w-5 h-5" />} />
        </div>

        <div className="mb-10">
          <FeedbackCard
            feedback="Your answer demonstrates a good understanding of Python generators. You correctly explained the purpose of yield and highlighted its memory efficiency. However, the difference between yield and return could be explicitly contrasted more clearly, perhaps by mentioning state suspension."
            strengths={[
              "Good technical understanding of generators",
              "Clear explanation of memory efficiency",
              "Accurate description of the yield keyword"
            ]}
            improvements={[
              "Explain state suspension with yield explicitly",
              "Add a short, practical code example in your explanation",
              "Contrast yield and return more directly"
            ]}
          />
        </div>

        <div className="flex justify-between items-center border-t border-slate-800/50 pt-8">
          <Button variant="outline" onClick={() => navigate('/interview')}>
            Review Transcript
          </Button>
          <Button variant="primary" className="group" onClick={() => navigate('/results')}>
            Finish Interview
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const TargetIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
