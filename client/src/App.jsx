import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentResult, setCurrentResult] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage setCurrentResult={setCurrentResult} />} />
            <Route path="/results" element={<ResultsPage currentResult={currentResult} />} />
            <Route path="/history" element={<HistoryPage setCurrentResult={setCurrentResult} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<HomePage setCurrentResult={setCurrentResult} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
