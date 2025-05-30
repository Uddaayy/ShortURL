import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AnalyticsChart from '../components/AnalyticsChart';
import DevicePieChart from '../components/DevicePieChart';

const LinkAnalytics = () => {
  const { id } = useParams();
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/analytics/${id}`);
        setClicks(res.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 Link Analytics</h1>

      {loading ? (
        <p className="text-gray-500">Loading analytics...</p>
      ) : clicks.length === 0 ? (
        <p className="text-red-500">No analytics data found.</p>
      ) : (
        <div className="space-y-8">
          <AnalyticsChart data={clicks} />
          <DevicePieChart data={clicks} />
        </div>
      )}
    </div>
  );
};

export default LinkAnalytics;
