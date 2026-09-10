import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QuestionCard } from '../components/interview/QuestionCard';
import { VoiceRecorder } from '../components/interview/VoiceRecorder';
import { Loader2, ArrowRight, CheckCircle } from 'lucide-react';

interface QuestionData {
  id: number;
  interview_id: number;
  question_text: string;
  question_number: number;
  difficulty: string;
}

export const Interview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const interviewId = (location.state as { interviewId?: number })?.interviewId;

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Current answer transcript captured from VoiceRecorder
  const currentTranscriptRef = useRef<string | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState<string | null>(null);

  // Tracks whether we are in the middle of submitting an answer
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Redirect to setup if no interviewId
  useEffect(() => {
    if (!interviewId) {
      navigate('/setup', { replace: true });
    }
  }, [interviewId, navigate]);

  // Fetch all questions for this interview
  useEffect(() => {
    if (!interviewId) return;

    const fetchQuestions = async () => {
      setIsLoading(true);
      setFetchError(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);

      try {
        const response = await fetch(`/questions/interview/${interviewId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data: QuestionData[] = await response.json();
        // Sort by question_number to guarantee order
        data.sort((a, b) => a.question_number - b.question_number);
        setQuestions(data);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setFetchError('Failed to load questions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [interviewId]);

  // Reset per-question state when question index changes
  useEffect(() => {
    currentTranscriptRef.current = null;
    setCurrentTranscript(null);
    setSubmitError(null);
    setIsSubmitting(false);
  }, [currentQuestionIndex]);

  // Called by VoiceRecorder when a transcript is ready (voice or text)
  const handleTranscriptReady = useCallback((transcript: string) => {
    currentTranscriptRef.current = transcript;
    setCurrentTranscript(transcript);
  }, []);

  const submitAnswer = async (questionId: number, answerText: string): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch('/answers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: questionId,
          answer_text: answerText,
          audio_path: null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      return true;
    } catch (err) {
      console.error('Answer submit error:', err);
      setSubmitError('Failed to save answer. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextOrFinish = (nextIndex: number) => {
    if (nextIndex >= questions.length) {
      // Interview complete — navigate to results
      navigate('/results', { state: { interviewId } });
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleNextQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const transcript = currentTranscriptRef.current;

    if (transcript && transcript.trim()) {
      // Submit the answer before moving on
      const ok = await submitAnswer(currentQuestion.id, transcript.trim());
      if (!ok) return; // stay on current question if submit failed
    }

    goToNextOrFinish(currentQuestionIndex + 1);
  };

  const handleSkipQuestion = () => {
    // Skip: do NOT submit an answer, just advance
    goToNextOrFinish(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (!interviewId) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Question */}
          <div className="h-full">
            {isLoading ? (
              <div className="h-full flex items-center justify-center bg-slate-900/80 rounded-2xl border border-slate-700/50">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                  <p className="text-gray-400">Generating your interview questions...</p>
                </div>
              </div>
            ) : fetchError ? (
              <div className="h-full flex items-center justify-center bg-slate-900/80 rounded-2xl border border-slate-700/50">
                <p className="text-red-400">{fetchError}</p>
              </div>
            ) : currentQuestion ? (
              <QuestionCard
                key={currentQuestion.id}
                questionId={currentQuestion.id}
                questionNumber={currentQuestion.question_number}
                totalQuestions={questions.length}
                topic={currentQuestion.difficulty}
                difficulty={currentQuestion.difficulty as 'Easy' | 'Medium' | 'Hard'}
                question={currentQuestion.question_text}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-slate-900/80 rounded-2xl border border-slate-700/50">
                <p className="text-gray-400">No questions available.</p>
              </div>
            )}
          </div>

          {/* Right Column: Voice Interaction */}
          <div className="h-full flex flex-col items-center justify-center bg-slate-900/30 rounded-2xl border border-slate-800/50 p-8 relative overflow-hidden">
            {/* Ambient background for recorder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full">
              {/* VoiceRecorder — key ensures full reset on question change */}
              <VoiceRecorder
                key={currentQuestionIndex}
                onRecordingComplete={handleTranscriptReady}
              />

              {/* Answer captured indicator */}
              {currentTranscript && (
                <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Answer captured — click Next to continue
                </div>
              )}

              {/* Submit error */}
              {submitError && (
                <p className="mt-2 text-center text-red-400 text-sm">{submitError}</p>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between w-full mt-8 px-4">
                <button
                  className="text-gray-500 hover:text-white transition-colors text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePreviousQuestion}
                >
                  ← Previous Question
                </button>

                <div className="flex items-center gap-3">
                  <button
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    onClick={handleSkipQuestion}
                  >
                    Skip →
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    {isSubmitting
                      ? 'Saving...'
                      : isLastQuestion
                      ? 'Finish Interview'
                      : 'Next Question'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
