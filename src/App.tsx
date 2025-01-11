import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import LotterySimulator from './pages/games/LotterySimulator';
import Projects from './pages/Projects.tsx';

const Lab = () => <div className="min-h-screen pt-20">실험실 페이지</div>;
const Experience = () => <div className="min-h-screen pt-20">경력 페이지</div>;
const About = () => <div className="min-h-screen pt-20">소개 페이지</div>;

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
        <Route path="/lottery" element={<LotterySimulator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
