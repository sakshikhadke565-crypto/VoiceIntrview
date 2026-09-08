import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mic2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isInterview = location.pathname === '/interview';

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-t-0 border-x-0 rounded-none bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center glow">
              <Mic2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">VoiceAI</span>
          </Link>
          
          {!isInterview && (
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <a href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="/#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <Button variant="primary" size="sm" onClick={() => window.location.href = '/setup'}>
                Start Interview
              </Button>
            </div>
          )}

          {isInterview && (
            <div className="flex items-center">
              <Link to="/setup">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Exit Interview
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
