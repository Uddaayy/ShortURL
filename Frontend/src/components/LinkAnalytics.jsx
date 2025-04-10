import React, { useState } from 'react';
import { ExternalLink, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

const LinkAnalytics = ({ link, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [newUrl, setNewUrl] = useState(link.originalUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/links/${link._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ originalUrl: newUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Edit failed");
      }

      setEditMode(false);
      setError("");
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error('Edit failed:', err);
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Short URL</h3>
          <div className="flex items-center space-x-2">
            {!editMode && (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(link._id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <a
          href={link.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          {link.shortUrl}
          <ExternalLink className="ml-2 w-4 h-4" />
        </a>

        {editMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original URL
              </label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setNewUrl(link.originalUrl);
                  setError("");
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Original URL</p>
              <p className="text-gray-900">{link.originalUrl}</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <p className="text-sm font-medium text-gray-500">Clicks</p>
                <p className="text-2xl font-semibold text-gray-900">{link.clicks}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="text-gray-900">{new Date(link.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkAnalytics;