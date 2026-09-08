import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Target, RotateCcw, List } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ScoreCircle } from '../components/ui/ScoreCircle';
import { ProgressBar } from '../components/ui/ProgressBar';

export const Results: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mb-6 border border-indigo-500/30">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Interview Completed</h1>
          <p className="text-xl text-gray-400">Great job! Here is your final performance summary.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="flex flex-col items-center text-center col-span-1 md:col-span-1 border-indigo-500/20 shadow-indigo-500/10 shadow-2xl">
            <h3 className="text-lg font-medium text-gray-300 mb-6">Overall Score</h3>
            <ScoreCircle score={84} size="lg" className="mb-6" />
            <p className="text-indigo-400 font-medium">Top 15% of candidates</p>
          </Card>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <Card className="flex items-center space-x-4">
              <div className="p-3 bg-slate-800 rounded-lg text-emerald-400"><Target className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Technical Score</p>
                <p className="text-2xl font-bold text-white">88/100</p>
              </div>
            </Card>
            <Card className="flex items-center space-x-4">
              <div className="p-3 bg-slate-800 rounded-lg text-purple-400"><List className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Communication</p>
                <p className="text-2xl font-bold text-white">82/100</p>
              </div>
            </Card>
            <Card className="flex items-center space-x-4">
              <div className="p-3 bg-slate-800 rounded-lg text-amber-400"><Trophy className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Confidence</p>
                <p className="text-2xl font-bold text-white">79/100</p>
              </div>
            </Card>
            <Card className="flex items-center space-x-4">
              <div className="p-3 bg-slate-800 rounded-lg text-indigo-400"><Clock className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Duration</p>
                <p className="text-2xl font-bold text-white">24m 12s</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Strong Areas</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Python Basics</span>
                  <span className="text-emerald-400 font-medium">92%</span>
                </div>
                <ProgressBar value={92} indicatorClassName="bg-emerald-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Data Structures</span>
                  <span className="text-emerald-400 font-medium">88%</span>
                </div>
                <ProgressBar value={88} indicatorClassName="bg-emerald-500" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Areas to Improve</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">System Design</span>
                  <span className="text-amber-400 font-medium">65%</span>
                </div>
                <ProgressBar value={65} indicatorClassName="bg-amber-500" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Async Programming</span>
                  <span className="text-amber-400 font-medium">70%</span>
                </div>
                <ProgressBar value={70} indicatorClassName="bg-amber-500" />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button variant="outline" size="lg" onClick={() => navigate('/evaluation')}>
            <List className="w-5 h-5 mr-2" />
            View Detailed Feedback
          </Button>
          <Button variant="primary" size="lg" onClick={() => navigate('/setup')}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Another Interview
          </Button>
        </div>
      </div>
    </div>
  );
};
