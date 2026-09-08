import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Zap, Brain, Target, ArrowRight, Settings, Volume2, FileText, Activity, CheckCircle, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col pt-16">
      {/* Hero Section */}
      <main className="flex-grow flex items-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full border border-indigo-500/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                <span className="text-sm font-medium">VoiceAI is now live</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                Practice Interviews. <br />
                <span className="text-gradient">Speak With Confidence.</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                Experience the next generation of interview preparation. Our AI conducts realistic voice-based interviews and provides intelligent, actionable feedback.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Button size="lg" className="group" onClick={() => navigate('/setup')}>
                  Start AI Interview
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/#how-it-works'}>
                  How It Works
                </Button>
              </div>
            </div>

            {/* Right Visualization */}
            <div className="relative flex justify-center items-center h-[500px]">
              {/* Floating Cards */}
              <div className="absolute top-10 left-10 glass-panel p-4 animate-float" style={{ animationDelay: '0s' }}>
                <div className="flex items-center space-x-3 text-indigo-400">
                  <Brain className="w-5 h-5" />
                  <span className="font-medium">AI Powered</span>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-10 glass-panel p-4 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center space-x-3 text-emerald-400">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">Real-time Feedback</span>
                </div>
              </div>

              <div className="absolute top-32 right-0 glass-panel p-4 animate-float" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center space-x-3 text-purple-400">
                  <Mic className="w-5 h-5" />
                  <span className="font-medium">Voice Interview</span>
                </div>
              </div>

              {/* Main Visualization */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse-ring" />
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse-ring" style={{ animationDelay: '0.6s' }} />
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse-ring" style={{ animationDelay: '1.2s' }} />
                <div className="relative z-10 w-32 h-32 rounded-full bg-slate-900 border border-indigo-500/50 flex items-center justify-center glow shadow-indigo-500/50">
                  <Mic className="w-12 h-12 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust / Stats Section */}
      <section className="border-t border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Brain className="w-8 h-8 text-indigo-400 mx-auto" />
              <h3 className="text-white font-semibold">AI Powered</h3>
              <p className="text-sm text-gray-400">GPT-4 level intelligence</p>
            </div>
            <div className="space-y-2">
              <Mic className="w-8 h-8 text-purple-400 mx-auto" />
              <h3 className="text-white font-semibold">Voice Based</h3>
              <p className="text-sm text-gray-400">Natural conversation</p>
            </div>
            <div className="space-y-2">
              <Zap className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-white font-semibold">Instant Feedback</h3>
              <p className="text-sm text-gray-400">Real-time evaluation</p>
            </div>
            <div className="space-y-2">
              <Target className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-white font-semibold">Personalized</h3>
              <p className="text-sm text-gray-400">Tailored to your role</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-t border-slate-800/50 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Master your interview skills in 8 simple steps with our AI-powered platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4"><Settings className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">1. Set Up Your Interview</h3>
              <p className="text-sm text-gray-400">Choose your role, experience, and difficulty.</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4"><Brain className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">2. AI Generates Questions</h3>
              <p className="text-sm text-gray-400">Tailored technical or behavioral questions.</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4"><Volume2 className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">3. Listen to the Question</h3>
              <p className="text-sm text-gray-400">Realistic AI voice presents the scenario.</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4"><Mic className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">4. Record Your Answer</h3>
              <p className="text-sm text-gray-400">Speak naturally as you would in an interview.</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4"><FileText className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">5. Speech-to-Text</h3>
              <p className="text-sm text-gray-400">Accurate transcription of your voice response.</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4"><Activity className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">6. AI Evaluation</h3>
              <p className="text-sm text-gray-400">Deep analysis of technical accuracy and clarity.</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4"><CheckCircle className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">7. Receive Feedback</h3>
              <p className="text-sm text-gray-400">Detailed strengths and areas to improve.</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4"><Trophy className="w-6 h-6" /></div>
              <h3 className="text-white font-semibold mb-2">8. View Final Results</h3>
              <p className="text-sm text-gray-400">Comprehensive scoring across all metrics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
