import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

interface ScoreCardProps {
  title: string;
  score: number;
  icon?: React.ReactNode;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, icon }) => {
  let colorClass = 'bg-indigo-500';
  if (score >= 80) colorClass = 'bg-emerald-500';
  else if (score >= 60) colorClass = 'bg-amber-500';
  else colorClass = 'bg-red-500';

  return (
    <Card className="flex flex-col border-slate-700/50 bg-slate-900/50">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 text-gray-300">
          {icon && <span className="text-indigo-400">{icon}</span>}
          <span className="font-medium">{title}</span>
        </div>
        <span className="text-2xl font-bold text-white">{score}</span>
      </div>
      <ProgressBar value={score} indicatorClassName={colorClass} />
    </Card>
  );
};
