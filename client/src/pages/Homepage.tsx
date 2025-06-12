import React, { useEffect, useState } from 'react';
import { InputForm } from "../components/InputForm";
import { Heart, Sparkles, Zap, Star } from "lucide-react";

export default function Homepage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-blue-400 opacity-30 animate-float">
        <Zap className="w-6 h-6" />
      </div>
      <div className="absolute top-32 right-16 text-blue-300 opacity-40 animate-float-delayed">
        <Star className="w-5 h-5" />
      </div>
      <div className="absolute bottom-32 left-20 text-blue-500 opacity-25 animate-float-slow">
        <Sparkles className="w-7 h-7" />
      </div>
      <div className="absolute bottom-20 right-12 text-blue-400 opacity-35 animate-bounce-gentle">
        <Star className="w-4 h-4" />
      </div>

      <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-down' : 'opacity-0'}`}>
        <div className="flex items-center justify-center gap-3 mb-6 group">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-blue-400 animate-pulse transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full filter blur-md opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-shimmer relative">
            URL Shortener
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          </h1>

          <div className="relative">
            <Sparkles className="w-8 h-8 text-blue-400 animate-pulse transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
            <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full filter blur-md opacity-30 animate-pulse"></div>
          </div>
        </div>

        <div className="relative">
          <p className="text-gray-300 text-lg md:text-xl font-light mb-2 transition-all duration-500 hover:text-gray-200">
            Transform long URLs into short, memorable links
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-400 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="animate-pulse">Fast • Secure • Reliable</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className={`w-full transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
        <InputForm />
      </div>

      <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
        <div className="relative group">
          <p className="text-gray-400 flex items-center justify-center gap-2 transition-all duration-300 hover:text-gray-300">
            Made with 
            <Heart className="w-4 h-4 text-red-400 animate-pulse fill-current transition-all duration-300 group-hover:scale-110" /> 
            by Me (
            <a 
              target="_blank" 
              href="https://akshay-kumar-portfoilo.netlify.app/"
              className="text-blue-400 hover:text-blue-300 transition-all duration-300 underline decoration-blue-400/50 hover:decoration-blue-300 relative group/link"
            >
              <span className="relative z-10">Akshay Kumar</span>
              <div className="absolute inset-0 bg-blue-400/10 rounded px-1 scale-0 group-hover/link:scale-100 transition-transform duration-300"></div>
            </a>
            )
          </p>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
  );
}
