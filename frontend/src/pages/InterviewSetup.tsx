import React from 'react';
import { InterviewSetupForm } from '../components/interview/InterviewSetupForm';

export const InterviewSetup: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Set Up Your Interview
          </h1>
          <p className="text-lg text-gray-400">
            Customize your interview parameters before you begin.
          </p>
        </div>

        <div className="glass-panel p-1 md:p-8">
          <InterviewSetupForm />
        </div>
      </div>
    </div>
  );
};
