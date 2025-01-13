import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import LotterySimulator from './pages/games/LotterySimulator';
import Playground from './pages/Playground.tsx';
import CareerPage from './pages/Career.tsx';
import AboutPage from './pages/About.tsx';

const Lab = () => <div className="min-h-screen pt-20">실험실 페이지</div>;

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/lottery" element={<LotterySimulator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
