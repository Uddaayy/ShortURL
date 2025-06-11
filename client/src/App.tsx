import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ShortUrlRedirect from './components/ShortUrlRedirect';
import Background from './components/Background';

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      <Background />
      <Router>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:urlCode" element={<ShortUrlRedirect />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;