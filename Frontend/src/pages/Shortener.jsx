import { useState } from 'react';
import {lucidereact} from 'react';
function Shortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/api/links/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
    } else {
      alert(data.message || 'Error creating short URL');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create Short URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={{ width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Shorten</button>
      </form>

      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <strong>Short URL:</strong>{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default Shortener;
