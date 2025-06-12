import React, { useState, useEffect } from "react";
import { Moon, Sun, Palette, Sparkles } from "lucide-react";

const Toggle = () => {
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('dark');
  const [isHovered, setIsHovered] = useState(false);

  const toggleColorMode = () => {
    const newMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newMode);
    
    // Apply theme to document with smooth transition
    document.body.style.transition = 'background 0.8s ease';
    if (newMode === 'light') {
      document.body.style.background = 'linear-gradient(135deg, #f0f9ff, #e0f2fe, #bae6fd)';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #111827, #000000, #1e3a8a)';
    }
  };

  useEffect(() => {
    // Set initial theme
    document.body.style.background = 'linear-gradient(135deg, #111827, #000000, #1e3a8a)';
  }, []);

  return (
    <div className="relative group">
      <button
        onClick={toggleColorMode}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-full transition-all duration-500 transform hover:scale-110 hover:rotate-12 border border-gray-600 hover:border-blue-400 shadow-lg hover:shadow-blue-500/25 button-magnetic ripple"
      >
        <div className="relative z-10 flex items-center gap-2">
          {colorMode === 'dark' ? (
            <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
          ) : (
            <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
          )}
          <span className="hidden sm:inline text-sm font-medium transition-all duration-300">
            {colorMode === 'dark' ? 'Light' : 'Dark'}
          </span>
        </div>
        
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        
        {/* Sparkle effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Palette className="absolute top-1 right-1 w-3 h-3 text-yellow-300 animate-pulse" />
          <Sparkles className="absolute bottom-1 left-1 w-2 h-2 text-blue-200 animate-bounce-gentle" />
        </div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-blue-400 filter blur-md opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-20' : ''}`}></div>
      </button>
      
      {/* Enhanced Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap transform translate-y-2 group-hover:translate-y-0 border border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          Toggle {colorMode === 'dark' ? 'Light' : 'Dark'} Mode
        </div>
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
      
      {/* Floating particles around button */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -top-1 -right-1 w-0.5 h-0.5 bg-blue-500 rounded-full animate-pulse"></div>
        </>
      )}
    </div>
  );
};

export default Toggle;