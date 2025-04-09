import React, { useState } from 'react';
import API from '../api/api';

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        '/links/create',
        { originalUrl, customAlias },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to create short URL');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shorten your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <h3>Short URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
