import React, { useState } from "react";
import axios from "axios";

const CreateLink = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState(""); // Optional custom code
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/links/create",
        {
          originalUrl,
          shortCode: shortCode.trim() === "" ? undefined : shortCode.trim(), // optional
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create link");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="container">
      <h2>Create Short Link</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter the original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom short code (optional)"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {shortUrl && (
        <div className="result">
          <p>Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a></p>
          <button onClick={handleCopy}>Copy</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateLink;
