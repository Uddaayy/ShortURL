import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Link, Copy, Check, Loader2, Globe, Hash, Sparkles, Zap } from "lucide-react";

export const InputForm = () => {
  const [input, setInput] = useState({
    longUrl: "",
    urlCode: ""
  });
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const formRef = useRef(null);
  const clientBaseUrl = window.location.href;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
    setIsError(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!input.longUrl) {
      setIsError(true);
      setUrl("Please add a URL");
      return;
    }
    setIsLoading(true);
    axios.post('/api/url/shorten', input)
      .then(res => {
        if (res.status) {
          const data = res.data;
          const createUrl = clientBaseUrl + data.urlCode;
          setUrl(createUrl);
        }
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = error.response?.data?.error || "An error occurred";
        setUrl(errorMsg);
        setIsLoading(false);
      });
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        formRef.current.style.setProperty('--mouse-x', `${x}px`);
        formRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener('mousemove', handleMouseMove);
      return () => formElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        ref={formRef}
        className={`gradient-border glow-blue hover:glow-blue-intense transition-all duration-700 transform hover:scale-[1.02] ${isFormFocused ? 'glow-blue-intense scale-[1.01]' : ''}`}
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      >
        <div className="gradient-border-inner p-8 space-y-6 relative">
          <div className="absolute top-4 right-4 text-blue-400 opacity-20 animate-spin-slow">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute bottom-4 left-4 text-blue-300 opacity-30 animate-bounce-gentle">
            <Zap className="w-3 h-3" />
          </div>

          <div className="space-y-3">
            <label className="block text-gray-300 text-sm font-medium transition-colors duration-300 hover:text-gray-200">
              Convert long URLs into shortened versions with a single click.
            </label>
            <div className="relative group">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-all duration-300 group-focus-within:text-blue-400 group-focus-within:scale-110" />
              <input
                id="longUrl"
                type="url"
                value={input.longUrl}
                placeholder="Paste here your long URL"
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                onFocus={() => setIsFormFocused(true)}
                onBlur={() => setIsFormFocused(false)}
                className={`w-full pl-11 pr-4 py-4 bg-gray-800/50 border ${
                  isError ? 'border-red-500 animate-pulse' : 'border-gray-600'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus-glow transition-all duration-300 hover:bg-gray-800/70 hover:border-gray-500`}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            {isError ? (
              <p className="text-red-400 text-sm animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                URL is required.
              </p>
            ) : (
              <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">Enter your Long URL</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-gray-300 text-sm font-medium transition-colors duration-300 hover:text-gray-200">
              Create personalized and memorable links for your URLs (Optional)
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 bg-gray-700/50 rounded-lg px-4 py-3 text-gray-300 text-sm font-mono border border-gray-600 transition-all duration-300 hover:bg-gray-700/70 hover:border-gray-500 relative overflow-hidden">
                <div className="relative z-10">{clientBaseUrl}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              <div className="relative group flex-1">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-all duration-300 group-focus-within:text-blue-400 group-focus-within:scale-110" />
                <input
                  id="urlCode"
                  type="text"
                  value={input.urlCode}
                  placeholder="your-custom-code"
                  onChange={handleInputChange}
                  onKeyDown={handleEnter}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus-glow transition-all duration-300 hover:bg-gray-800/70 hover:border-gray-500"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-lg button-magnetic ripple disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-200"></div>
                  </div>
                </>
              ) : (
                <>
                  <Link className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Shorten URL</span>
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                </>
              )}
            </div>
          </button>

          {url && (
            <div className="space-y-3 animate-slide-in-up">
              <label className="block text-gray-300 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Your shortened URL:
              </label>
              <div className="flex gap-2 p-1 bg-gray-800/30 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <input
                  value={url}
                  readOnly
                  className="flex-1 px-3 py-3 bg-transparent text-white font-mono text-sm focus:outline-none relative z-10"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-all duration-300 flex items-center gap-2 hover:shadow-md hover:shadow-blue-500/25 button-magnetic ripple relative z-10 group/copy"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce-gentle" />
                      <span className="hidden sm:inline">Copied!</span>
                      <div className="absolute inset-0 bg-green-500 opacity-20 rounded-md animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 transition-transform duration-300 group-hover/copy:scale-110" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
