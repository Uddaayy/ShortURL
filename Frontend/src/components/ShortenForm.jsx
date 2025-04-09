import { useState } from 'react';
import axios from 'axios';

function ShortenForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/links/create',
        { originalUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert('Error shortening URL');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter long URL"
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div style={{ marginTop: '1rem' }}>
          <p>
            Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a>
          </p>
          <button onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ShortenForm;
