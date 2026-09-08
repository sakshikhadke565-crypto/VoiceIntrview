import React from 'react';
import { cn } from '../../utils/cn';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, size = 'md', label, className }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizes = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-4xl',
  };

  let colorClass = 'text-indigo-500';
  if (score >= 80) colorClass = 'text-emerald-500';
  else if (score >= 60) colorClass = 'text-amber-500';
  else colorClass = 'text-red-500';

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('relative flex items-center justify-center', sizes[size])}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-slate-800 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
          />
          <circle
            className={cn('stroke-current transition-all duration-1000 ease-out', colorClass)}
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span className="absolute font-bold text-white">
          {score}
        </span>
      </div>
      {label && <span className="mt-2 text-sm font-medium text-gray-400">{label}</span>}
    </div>
  );
};
