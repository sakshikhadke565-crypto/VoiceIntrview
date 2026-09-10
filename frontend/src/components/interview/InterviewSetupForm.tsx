import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const InterviewSetupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'Python Developer',
    experience: '1-2 Years',
    difficulty: 'Medium',
    type: 'Technical',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/interviews/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: formData.role,
          experience: formData.experience,
          difficulty: formData.difficulty,
          interview_type: formData.type,
        }),
      });

      if (!response.ok) {
        let detail = '';
        try {
          const errorData = await response.json();
          detail = errorData.detail || '';
        } catch {
          // response body not JSON
        }
        throw new Error(detail || `Server error (${response.status})`);
      }

      const data = await response.json();
      navigate('/interview', { state: { interviewId: data.id } });
    } catch (err) {
      console.error('Error creating interview:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setSubmitError(`Failed to start interview: ${message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectClass = "w-full mt-1.5 bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Job Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className={selectClass}>
                <option>Python Developer</option>
                <option>React Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Java Developer</option>
                <option>JavaScript Developer</option>
                <option>TypeScript Developer</option>
                <option>Node.js Developer</option>
                <option>Angular Developer</option>
                <option>Vue.js Developer</option>
                <option>Flutter Developer</option>
                <option>Mobile App Developer</option>
                <option>Android Developer</option>
                <option>iOS Developer</option>
                <option>AI Engineer</option>
                <option>AI/ML Engineer</option>
                <option>Machine Learning Engineer</option>
                <option>Deep Learning Engineer</option>
                <option>Generative AI Engineer</option>
                <option>Agentic AI Engineer</option>
                <option>NLP Engineer</option>
                <option>Computer Vision Engineer</option>
                <option>Data Scientist</option>
                <option>Data Analyst</option>
                <option>Data Engineer</option>
                <option>MLOps Engineer</option>
                <option>DevOps Engineer</option>
                <option>Cloud Engineer</option>
                <option>Software Engineer</option>
                <option>Software Developer</option>
                <option>QA Engineer</option>
                <option>Automation Test Engineer</option>
                <option>Cybersecurity Engineer</option>
                <option>Database Developer</option>
                <option>SQL Developer</option>
                <option>.NET Developer</option>
                <option>PHP Developer</option>
                <option>Laravel Developer</option>
                <option>Django Developer</option>
                <option>FastAPI Developer</option>
                <option>Spring Boot Developer</option>
                <option>Blockchain Developer</option>
                <option>Embedded Systems Engineer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400">Experience Level</label>
              <select name="experience" value={formData.experience} onChange={handleChange} className={selectClass}>
                <option>Fresher</option>
                <option>1-2 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Difficulty</label>
              <select name="difficulty" value={formData.difficulty} onChange={handleChange} className={selectClass}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Interview Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className={selectClass}>
                <option>Technical</option>
                <option>Behavioral</option>
                <option>HR</option>
                <option>Mixed</option>
              </select>
            </div>
          </div>

          <div className="pt-6">
            {submitError && (
              <p className="text-red-400 text-sm mb-4">{submitError}</p>
            )}
            <Button type="submit" variant="primary" size="lg" className="w-full group" disabled={isSubmitting}>
              {isSubmitting ? 'Starting Interview...' : 'Start Interview'}
              {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </div>
        </form>
      </div>

      {/* Summary Card */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 h-full flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Interview Summary</h3>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
              <span className="text-gray-400">Role</span>
              <span className="text-white font-medium">{formData.role}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
              <span className="text-gray-400">Experience</span>
              <span className="text-white font-medium">{formData.experience}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
              <span className="text-gray-400">Difficulty</span>
              <span className="text-white font-medium">{formData.difficulty}</span>
            </div>
            <div className="flex justify-between items-center pb-4">
              <span className="text-gray-400">Type</span>
              <span className="text-white font-medium">{formData.type}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6 text-center">
            The AI will tailor the questions based on these parameters.
          </p>
        </div>
      </div>
    </div>
  );
};
