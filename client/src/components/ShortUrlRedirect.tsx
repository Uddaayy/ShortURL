import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, ExternalLink } from 'lucide-react';

const ShortUrlRedirect: React.FC = () => {
  const { urlCode } = useParams<{ urlCode: string }>();
  const serverBaseUrl = import.meta.env.VITE_APP_URI;

  const redirect = () => {
    if (urlCode) {
      const url = `${serverBaseUrl}/${urlCode}`;
      window.location.replace(url);
    }
  };

  useEffect(() => {
    if (urlCode) {
      // Add a small delay for better UX
      const timer = setTimeout(() => {
        redirect();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [urlCode]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="bg-dark-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 shadow-2xl animate-scale-fade hover:shadow-electric-500/20 transition-all duration-700">
          {/* Loading Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-2xl shadow-lg animate-breath relative overflow-hidden">
              <div className="absolute inset-0 animate-glass-reflect"></div>
              <ExternalLink className="w-12 h-12 text-white animate-smooth-bounce relative z-10" />
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-fade-up">
            Redirecting...
          </h2>
          <p className="text-gray-400 mb-8 animate-fade-down" style={{ animationDelay: '0.2s' }}>
            You're being redirected to your destination
          </p>

          {/* Loading Spinner */}
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="animate-spin h-8 w-8 text-electric-500" />
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-dark-700 rounded-full h-2 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-electric-500 to-cyan-500 h-2 rounded-full animate-gradient-shift bg-[length:200%_100%]" style={{ width: '100%' }}></div>
          </div>

          {/* Code Display */}
          {urlCode && (
            <div className="p-4 bg-dark-700/50 rounded-xl border border-gray-600 animate-blur-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-gray-400 mb-1">Short code:</p>
              <p className="text-electric-400 font-mono font-semibold animate-neon-flicker">
                {urlCode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortUrlRedirect;