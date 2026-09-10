import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, RotateCcw, Loader2, CheckCircle, XCircle, Brain, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ScoreCircle } from '../components/ui/ScoreCircle';

// ---- Types matching backend response ----

interface EvaluationResult {
  score: number;
  relevance: number;
  technical_depth: number;
  clarity: number;
  feedback: string;
}

interface AnswerResult {
  id: number;
  answer_text: string;
  evaluation: EvaluationResult | null;
}

interface QuestionResult {
  id: number;
  question_number: number;
  question_text: string;
  difficulty: string;
  answer: AnswerResult | null;
}

interface InterviewResult {
  interview_id: number;
  role: string;
  experience: string;
  difficulty: string;
  interview_type: string;
  total_questions: number;
  answered_questions: number;
  average_score: number | null;
  questions: QuestionResult[];
}

// ---- Component ----

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const interviewId = (location.state as { interviewId?: number })?.interviewId;

  const [result, setResult] = useState<InterviewResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!interviewId) {
      navigate('/setup', { replace: true });
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(`/results/interview/${interviewId}`);
        if (!response.ok) throw new Error('Failed to load results');
        const data: InterviewResult = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setFetchError('Failed to load interview results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [interviewId, navigate]);

  if (!interviewId) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          <p className="text-gray-400">Loading your interview results...</p>
        </div>
      </div>
    );
  }

  if (fetchError || !result) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-red-400">{fetchError || 'No results found.'}</p>
          <Button variant="outline" onClick={() => navigate('/setup')}>Start New Interview</Button>
        </div>
      </div>
    );
  }

  const overallScore = result.average_score != null ? Math.round(result.average_score * 10) : null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mb-6 border border-indigo-500/30">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Interview Completed</h1>
          <p className="text-xl text-gray-400">
            {result.role} · {result.experience} · {result.difficulty}
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="flex flex-col items-center text-center border-indigo-500/20 shadow-indigo-500/10 shadow-2xl">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Overall Score</h3>
            {overallScore != null ? (
              <ScoreCircle score={overallScore} size="lg" className="mb-4" />
            ) : (
              <p className="text-gray-500 text-sm mt-4">No answers submitted</p>
            )}
          </Card>

          <Card className="flex flex-col items-center text-center">
            <div className="p-3 bg-slate-800 rounded-lg text-emerald-400 mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="text-sm text-gray-400 font-medium mb-1">Answered</p>
            <p className="text-3xl font-bold text-white">
              {result.answered_questions} / {result.total_questions}
            </p>
          </Card>

          <Card className="flex flex-col items-center text-center">
            <div className="p-3 bg-slate-800 rounded-lg text-indigo-400 mb-3">
              <Brain className="w-6 h-6" />
            </div>
            <p className="text-sm text-gray-400 font-medium mb-1">Interview Type</p>
            <p className="text-xl font-bold text-white">{result.interview_type}</p>
          </Card>
        </div>

        {/* Questions & Answers */}
        <h2 className="text-2xl font-bold text-white mb-6">Questions &amp; Your Answers</h2>

        <div className="space-y-6 mb-12">
          {result.questions.map((q) => (
            <Card key={q.id} className="border-slate-700/50">
              {/* Question header */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-gray-400 text-sm font-medium">
                  Question {q.question_number} of {result.total_questions}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  q.difficulty === 'Hard'
                    ? 'bg-red-500/20 text-red-400'
                    : q.difficulty === 'Medium'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {q.difficulty}
                </span>
              </div>

              {/* Question text */}
              <div className="flex items-start gap-3 mb-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mt-0.5">
                  <Brain className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-indigo-400 text-xs font-semibold mb-1">AI Interviewer</p>
                  <p className="text-white font-medium leading-relaxed">"{q.question_text}"</p>
                </div>
              </div>

              {/* Answer */}
              {q.answer ? (
                <>
                  <div className="flex items-start gap-3 mb-4 pl-11">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mt-0.5 -ml-11">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-emerald-400 text-xs font-semibold mb-1">Your Answer</p>
                      <p className="text-gray-300 leading-relaxed">{q.answer.answer_text}</p>
                    </div>
                  </div>

                  {/* Evaluation scores */}
                  {q.answer.evaluation && (
                    <div className="mt-4 pt-4 border-t border-slate-800/50">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        {[
                          { label: 'Score', value: q.answer.evaluation.score },
                          { label: 'Relevance', value: q.answer.evaluation.relevance },
                          { label: 'Technical Depth', value: q.answer.evaluation.technical_depth },
                          { label: 'Clarity', value: q.answer.evaluation.clarity },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-slate-800/50 rounded-lg p-3 text-center">
                            <p className="text-gray-400 text-xs mb-1">{label}</p>
                            <p className={`text-lg font-bold ${
                              value >= 7 ? 'text-emerald-400' : value >= 4 ? 'text-amber-400' : 'text-red-400'
                            }`}>{value}/10</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-slate-800/30 rounded-lg p-3">
                        <p className="text-gray-400 text-xs font-semibold uppercase mb-1">AI Feedback</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{q.answer.evaluation.feedback}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 text-sm pl-0">
                  <XCircle className="w-4 h-4 text-gray-600" />
                  Question was skipped — no answer recorded
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button variant="primary" size="lg" onClick={() => navigate('/setup')}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Another Interview
          </Button>
        </div>
      </div>
    </div>
  );
};
