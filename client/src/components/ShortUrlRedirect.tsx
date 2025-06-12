import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, ExternalLink, Zap, ArrowRight } from 'lucide-react';
export default function ShortUrlRedirect() {
  const { urlCode } = useParams();
  const [countdown, setCountdown] = useState(3);
  const serverBaseUrl = import.meta.env?.VITE_APP_URI || "http://localhost:5000";

  const redirect = () => {
    const url = `${serverBaseUrl}/${urlCode}`;
    window.location.replace(url);
  };

  useEffect(() => {
    if (urlCode) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            redirect();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [urlCode]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg opacity-25 animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-bounce-gentle"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="gradient-border glow-blue-intense mb-8 animate-slide-in-down">
          <div className="gradient-border-inner p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-2 right-2 text-blue-400 opacity-30 animate-spin-slow">
              <Zap className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full filter blur-md opacity-30 animate-pulse"></div>
              </div>

              <ArrowRight className="w-6 h-6 text-blue-300 animate-bounce-gentle" />

              <div className="relative">
                <ExternalLink className="w-8 h-8 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full filter blur-md opacity-30 animate-pulse"></div>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4 text-shimmer">
              Redirecting in {countdown}...
            </h3>

            <p className="text-gray-400 mb-6 transition-colors duration-300 hover:text-gray-300">
              Please wait while we redirect you to your destination
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>

            {/* Countdown circles */}
            <div className="flex justify-center gap-2">
              {[3, 2, 1].map((num) => (
                <div
                  key={num}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    countdown <= num 
                      ? 'bg-blue-400 animate-pulse scale-110' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animated loading dots */}
        <div className="flex justify-center animate-slide-in-up">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Subtle hint text */}
        <p className="text-gray-500 text-xs mt-6 animate-pulse">
          Preparing your secure connection...
        </p>
      </div>
    </div>
  );
}
