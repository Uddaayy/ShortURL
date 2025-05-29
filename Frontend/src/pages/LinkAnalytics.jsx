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
        console.error('Error fetching analytics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Link Analytics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : clicks.length === 0 ? (
        <p>No analytics data found.</p>
      ) : (
        <>
          <AnalyticsChart data={clicks} />
          <DevicePieChart data={clicks} />
        </>
      )}
    </div>
  );
};

export default LinkAnalytics;
