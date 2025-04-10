// src/pages/Analytics.jsx

import React, { useEffect, useState } from 'react';
//import { useAuth } from '../hooks/useAuth';  // Importing the useAuth hook for authentication
import axios from 'axios';
import { BarChart3, Loader2 } from 'lucide-react';
import LinkAnalytics from '../components/LinkAnalytics';

const Analytics = () => {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/links', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinks(response.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      setError(err.response?.data?.message || "Could not load links.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/links/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchLinks();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full">
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Link Analytics</h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : Array.isArray(links) && links.length > 0 ? (
          <div className="space-y-6">
            {links.map((link) => (
              <LinkAnalytics
                key={link._id}
                link={link}
                onDelete={handleDelete}
                onUpdate={fetchLinks}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-lg">No links found. Create your first shortened link!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;