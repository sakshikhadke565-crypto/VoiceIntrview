import React, { useState, useEffect } from 'react';
import { Volume2, Brain, Loader2, Lock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const MAX_PLAY_COUNT = 3;

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  // Used as a reset key — when questionId changes, play count resets
  questionId: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  question,
  topic,
  difficulty,
  questionId,
}) => {
  const difficultyVariants = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'error',
  } as const;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  // Reset play count whenever the question changes
  useEffect(() => {
    setPlayCount(0);
    setIsPlaying(false);
    setIsLoading(false);
  }, [questionId]);

  const playsLeft = MAX_PLAY_COUNT - playCount;
  const isLocked = playCount >= MAX_PLAY_COUNT;

  const handlePlayQuestion = async () => {
    if (isLocked || isLoading || isPlaying) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/speech/to-audio?text=${encodeURIComponent(question)}`,
        { method: 'POST' }
      );
      if (!response.ok) throw new Error('Failed to generate audio');

      // Cache-bust so we always get the freshly generated audio
      const audioUrl = `/audio/interview_question.wav?t=${Date.now()}`;
      const audio = new Audio(audioUrl);

      setIsPlaying(true);
      setPlayCount((prev) => prev + 1);

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);

      await audio.play();
    } catch (error) {
      console.error(error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            size="lg"
            onClick={handlePlayQuestion}
            disabled={isLoading || isPlaying || isLocked}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : isLocked ? (
              <Lock className="w-5 h-5 mr-2" />
            ) : (
              <Volume2 className="w-5 h-5 mr-2" />
            )}
            {isLoading
              ? 'Generating Audio...'
              : isPlaying
              ? 'Playing...'
              : isLocked
              ? 'Play Limit Reached'
              : 'Play Question'}
          </Button>

          {/* Play count indicator */}
          <span className={`text-sm font-medium ${isLocked ? 'text-red-400' : 'text-gray-400'}`}>
            {isLocked ? '3/3 plays used' : `${playsLeft} play${playsLeft === 1 ? '' : 's'} left`}
          </span>
        </div>
      </div>
    </Card>
  );
};
