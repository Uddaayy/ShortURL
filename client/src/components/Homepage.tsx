import React from 'react';
import { Link2 } from 'lucide-react';
import InputForm from './InputForm';

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-down">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-2xl shadow-lg animate-pulse-glow relative overflow-hidden">
            <div className="absolute inset-0 animate-glass-reflect"></div>
            <Link2 className="w-12 h-12 text-white animate-smooth-bounce relative z-10" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-electric-400 via-cyan-400 to-electric-500 bg-clip-text text-transparent mb-4 animate-neon-flicker bg-[length:200%_100%] animate-gradient-shift" 
            style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa 0%, #22d3ee 50%, #3b82f6 100%)' }}>
          URL Shortener
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-left" style={{ animationDelay: '0.3s' }}>
          Transform long URLs into short, memorable links with custom codes and advanced analytics
        </p>
      </div>

      {/* Main Form */}
      <div className="w-full max-w-4xl animate-scale-fade" style={{ animationDelay: '0.5s' }}>
        <InputForm />
      </div>

      {/* Footer */}
      <div className="mt-16 text-center animate-fade-right" style={{ animationDelay: '0.7s' }}>
        <p className="text-gray-400 text-sm">
          Made with ❤️ by{' '}
          <a
            href="https://akshay-kumar-portfoilo.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-400 hover:text-electric-300 transition-all duration-500 underline decoration-electric-500/30 hover:decoration-electric-400 hover:animate-magnetic-pull inline-block transform"
          >
            Akshay Kumar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Homepage;