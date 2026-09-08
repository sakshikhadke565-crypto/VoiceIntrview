import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface FeedbackCardProps {
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, strengths, improvements }) => {
  return (
    <Card className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-3">AI Feedback</h3>
        <p className="text-gray-300 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          {feedback}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="flex items-center text-emerald-400 font-medium mb-4">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Strengths
          </h4>
          <ul className="space-y-3">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-0.5">✓</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="flex items-center text-amber-400 font-medium mb-4">
            <AlertCircle className="w-5 h-5 mr-2" />
            Areas to Improve
          </h4>
          <ul className="space-y-3">
            {improvements.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-amber-500 mr-2 mt-0.5">•</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
