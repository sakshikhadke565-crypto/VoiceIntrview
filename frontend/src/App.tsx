
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { InterviewSetup } from './pages/InterviewSetup';
import { Interview } from './pages/Interview';
import { AnswerReview } from './pages/AnswerReview';
import { Evaluation } from './pages/Evaluation';
import { Results } from './pages/Results';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-gray-50 font-sans selection:bg-indigo-500/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<InterviewSetup />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/review" element={<AnswerReview />} />
            <Route path="/evaluation" element={<Evaluation />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
