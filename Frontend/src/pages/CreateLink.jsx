import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as LinkIcon, Copy, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CreateLink = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");
    setError("");
    setIsLoading(true);

    if (!validateUrl(originalUrl)) {
      setError("Please enter a valid URL");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login again.");
      setIsLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/links/create",
        {
          originalUrl,
          shortCode: shortCode.trim() === "" ? undefined : shortCode.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShortUrl(response.data.shortUrl);
      setOriginalUrl("");
      setShortCode("");
    } catch (err) {
      console.error("❌ Create link error:", err);
      if (err.response?.status === 403) {
        setError("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to create link");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      setError("Failed to copy to clipboard");
    }
  };

  const handleUrlChange = (e) => {
    setOriginalUrl(e.target.value);
    setError("");
  };

  const handleShortCodeChange = (e) => {
    const value = e.target.value.trim();
    if (value.length > 20) {
      setError("Short code must be less than 20 characters");
      return;
    }
    setShortCode(value);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-lg shadow-lg">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full">
            <LinkIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Short Link</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700">
              Original URL
            </label>
            <div className="relative">
              <input
                id="originalUrl"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={handleUrlChange}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="shortCode" className="block text-sm font-medium text-gray-700">
              Custom Short Code (Optional)
            </label>
            <div className="relative">
              <input
                id="shortCode"
                type="text"
                placeholder="e.g., my-custom-link"
                value={shortCode}
                onChange={handleShortCodeChange}
                pattern="[a-zA-Z0-9-]+"
                title="Only letters, numbers, and hyphens are allowed"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
              <p className="mt-1 text-sm text-gray-500">
                Only letters, numbers, and hyphens are allowed
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !originalUrl.trim()}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              'Create Short Link'
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Your shortened link is ready!</h3>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center group transition-colors duration-200"
              >
                <span className="truncate">{shortUrl}</span>
                <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
              <button
                onClick={handleCopy}
                className={`ml-4 p-2 rounded-md transition-all duration-200 ${
                  copySuccess
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={copySuccess ? "Copied!" : "Copy to clipboard"}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLink;
