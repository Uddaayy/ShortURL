// src/pages/Analytics.jsx

import React, { useEffect, useState } from 'react';
//import { useAuth } from '../hooks/useAuth';  // Importing the useAuth hook for authentication
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const { user } = useAuth(); // Getting user information from the useAuth hook
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    if (!user) {
      // Redirect if user is not authenticated
      window.location.href = '/login';
    } else {
      fetchAnalytics();
    }
  }, [user]);
  
  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/links/analytics', {
        headers: {
          Authorization: `Bearer ${user.token}` // Sending the token for authentication
        }
      });
      setAnalyticsData(response.data);
      generateChartData(response.data); // Generate chart data after fetching analytics
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  const generateChartData = (data) => {
    // Assuming data contains timestamps and click counts, adjust according to your actual data
    const labels = data.map(item => new Date(item.timestamp).toLocaleDateString());
    const clicks = data.map(item => item.clicks);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Clicks Over Time',
          data: clicks,
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }
      ]
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Link Analytics</h1>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl">Analytics Data</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Short URL</th>
                  <th className="px-4 py-2 border">Original URL</th>
                  <th className="px-4 py-2 border">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.map((link) => (
                  <tr key={link.shortUrl}>
                    <td className="px-4 py-2 border">{link.shortUrl}</td>
                    <td className="px-4 py-2 border">{link.originalUrl}</td>
                    <td className="px-4 py-2 border">{link.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart Section */}
          <div className="mb-6">
            <h2 className="text-2xl mb-4">Clicks Over Time</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
