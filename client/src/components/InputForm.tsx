import React, { useState } from 'react';
import { Link, Copy, Check, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

interface InputState {
  longUrl: string;
  urlCode: string;
}

const InputForm: React.FC = () => {
  const [input, setInput] = useState<InputState>({ longUrl: '', urlCode: '' });
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const clientBaseUrl = window.location.href;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
    setIsError(false);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!input.longUrl) {
      setIsError(true);
      setUrl('Please add a URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/url/shorten', input);
      if (response.status === 200) {
        const data = response.data;
        const createUrl = clientBaseUrl + data.urlCode;
        setUrl(createUrl);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Something went wrong';
      setUrl(errorMsg);
      console.error('error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Form Card */}
      <div className="bg-dark-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-electric-500/20 transition-all duration-700 hover:animate-breath animate-blur-in">
        {/* Long URL Input */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <label className="block text-sm font-medium text-gray-300 mb-3 animate-fade-left" style={{ animationDelay: '0.2s' }}>
            Enter your long URL
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400 group-focus-within:text-electric-400 transition-all duration-500 group-focus-within:animate-smooth-bounce" />
            </div>
            <input
              id="longUrl"
              type="url"
              value={input.longUrl}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              onChange={handleInputChange}
              onKeyDown={handleEnter}
              className={`w-full pl-12 pr-4 py-4 bg-dark-700/50 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-700 transform focus:animate-magnetic-pull hover:bg-dark-700/70 ${
                isError
                  ? 'border-red-500 focus:ring-red-500/50 animate-gentle-sway'
                  : 'border-gray-600 focus:border-electric-500 focus:ring-electric-500/50 focus:shadow-lg focus:shadow-electric-500/25'
              }`}
            />
          </div>
          {isError && (
            <div className="flex items-center mt-2 text-red-400 text-sm animate-fade-up">
              <AlertCircle className="h-4 w-4 mr-2 animate-neon-flicker" />
              URL is required
            </div>
          )}
          {!isError && (
            <p className="text-gray-400 text-sm mt-2 animate-fade-left" style={{ animationDelay: '0.3s' }}>
              Paste your long URL here to get started
            </p>
          )}
        </div>

        {/* Custom Code Input */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <label className="block text-sm font-medium text-gray-300 mb-3 animate-fade-right" style={{ animationDelay: '0.4s' }}>
            Custom short code (optional)
          </label>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-shrink-0 bg-dark-700/70 border border-gray-600 rounded-2xl px-4 py-4 text-gray-300 text-sm md:text-base transition-all duration-500 hover:bg-dark-600/70 hover:border-electric-500/50 animate-fade-left" style={{ animationDelay: '0.5s' }}>
              {clientBaseUrl}
            </div>
            <input
              id="urlCode"
              type="text"
              value={input.urlCode}
              placeholder="custom-code"
              onChange={handleInputChange}
              onKeyDown={handleEnter}
              className="flex-1 px-4 py-4 bg-dark-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-electric-500 focus:ring-electric-500/50 transition-all duration-700 transform focus:animate-magnetic-pull hover:bg-dark-700/70 focus:shadow-lg focus:shadow-electric-500/25 animate-fade-right" 
              style={{ animationDelay: '0.6s' }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2 animate-fade-left" style={{ animationDelay: '0.7s' }}>
            Create a memorable custom link (leave empty for random code)
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-electric-500 to-cyan-500 hover:from-electric-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-electric-500/30 focus:outline-none focus:ring-2 focus:ring-electric-500/50 transition-all duration-700 transform hover:animate-magnetic-pull disabled:hover:scale-100 disabled:cursor-not-allowed animate-scale-fade relative overflow-hidden group"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-glass-reflect"></div>
          {isLoading ? (
            <div className="flex items-center justify-center relative z-10">
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Shortening...
            </div>
          ) : (
            <span className="relative z-10">Shorten URL</span>
          )}
        </button>
      </div>

      {/* Result Card */}
      {url && (
        <div className="mt-8 bg-dark-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-up hover:shadow-electric-500/20 transition-all duration-700 hover:animate-breath">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 animate-blur-in">
            Your shortened URL is ready!
          </h3>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={url}
              readOnly
              className="flex-1 px-4 py-3 bg-dark-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-electric-500/50 transition-all duration-500 hover:bg-dark-700/70 animate-fade-left"
            />
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-electric-500 hover:bg-electric-600 text-white font-medium rounded-xl shadow-lg hover:shadow-electric-500/30 focus:outline-none focus:ring-2 focus:ring-electric-500/50 transition-all duration-500 transform hover:animate-magnetic-pull flex items-center justify-center animate-fade-right relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-glass-reflect"></div>
              {hasCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2 animate-pulse-glow relative z-10" />
                  <span className="relative z-10">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2 animate-smooth-bounce relative z-10" />
                  <span className="relative z-10">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;