import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ShortUrlRedirect from "./components/ShortUrlRedirect";
import Toggle from "./components/Toggle";

function App() {
  const [particles, setParticles] = useState<Array<{id: number, size: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    // Generate floating particles
    const particleArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 15
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        
        {/* Additional floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-float-delayed"></div>
        <div className="absolute top-3/4 right-1/3 w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-md opacity-20 animate-float-slow"></div>
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
      </div>
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/:urlCode' element={<ShortUrlRedirect />} />
      </Routes>
      
      <div className="fixed top-4 right-4 z-50 animate-slide-in-down">
        <Toggle />
      </div>
    </div>
  );
}

export default App;