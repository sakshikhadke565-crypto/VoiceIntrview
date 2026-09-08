import React from 'react';
import { Volume2, Brain } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  question,
  topic,
  difficulty,
}) => {
  const difficultyVariants = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'error',
  } as const;

  return (
    <Card className="flex flex-col h-full border-slate-700/50 bg-slate-900/80">
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-400 font-medium">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex space-x-2">
          <Badge variant="info">{topic}</Badge>
          <Badge variant={difficultyVariants[difficulty]}>{difficulty}</Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-start space-x-4 mb-8">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Brain className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <span className="text-indigo-400 font-medium text-sm mb-1 block">AI Interviewer</span>
            <h2 className="text-2xl font-semibold text-white leading-relaxed">
              "{question}"
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <Button variant="secondary" className="w-full sm:w-auto" size="lg">
          <Volume2 className="w-5 h-5 mr-2" />
          Play Question
        </Button>
      </div>
    </Card>
  );
};
