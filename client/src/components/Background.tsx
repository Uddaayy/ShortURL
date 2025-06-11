import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      
      {/* Liquid Morphing Shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-gradient-to-r from-electric-500/20 to-cyan-500/20 animate-liquid-morph ${
              i % 2 === 0 ? 'w-32 h-32' : 'w-24 h-24'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-400/40 rounded-full animate-parallax-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Breathing Glow Effects */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl animate-breath"></div>
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-breath" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Gradient Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent animate-gentle-sway"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-gentle-sway" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Background;