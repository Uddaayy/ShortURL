import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLinks, createLink } from '../features/links/linkSlice';
import QRCodeComponent from './components/QRCodeComponent'; // <-- updated import path

const Dashboard = () => {
  const dispatch = useDispatch();
  const { links, loading, error } = useSelector((state) => state.links);
  const [form, setForm] = useState({
    longUrl: '',
    customAlias: '',
    expiresAt: '',
  });

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLink(form));
    setForm({ longUrl: '', customAlias: '', expiresAt: '' });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Link Creation Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Create Short Link</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="url"
            required
            placeholder="Long URL"
            value={form.longUrl}
            onChange={(e) => setForm({ ...form, longUrl: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Custom Alias (optional)"
            value={form.customAlias}
            onChange={(e) => setForm({ ...form, customAlias: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Shorten
        </button>
      </form>

      {/* Link Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Your Links</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full text-sm text-left table-auto">
            <thead>
              <tr>
                <th className="p-2">Original URL</th>
                <th className="p-2">Short URL</th>
                <th className="p-2">Clicks</th>
                <th className="p-2">Created</th>
                <th className="p-2">Expires</th>
                <th className="p-2">QR Code</th> {/* New Column */}
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link._id} className="border-t">
                  <td className="p-2 truncate max-w-xs">{link.longUrl}</td>
                  <td className="p-2 text-blue-600">
                    <a href={`/analytics/${link._id}`} className="underline">
                      {link.shortUrl}
                    </a>
                  </td>
                  <td className="p-2">{link.clicks}</td>
                  <td className="p-2">{new Date(link.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">
                    {link.expiresAt ? new Date(link.expiresAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="p-2">
                    <QRCodeComponent url={`http://localhost:5000/${link.shortId}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
