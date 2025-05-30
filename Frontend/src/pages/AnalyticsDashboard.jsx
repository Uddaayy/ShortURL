import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6699'];

const AnalyticsDashboard = () => {
  const { id } = useParams(); // urlId from route param
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/analytics/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading analytics...</p>;
  if (!data) return <p>No analytics data available.</p>;

  // Prepare data for charts
  const clicksData = Object.entries(data.clicksByDate).map(([date, clicks]) => ({ date, clicks }));

  const deviceData = Object.entries(data.deviceCounts).map(([name, value]) => ({ name, value }));
  const browserData = Object.entries(data.browserCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Link Analytics</h1>

      <section className="mb-8">
        <h2 className="text-xl mb-2">Clicks Over Time</h2>
        <LineChart width={700} height={300} data={clicksData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
        </LineChart>
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl mb-2">Device Breakdown</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={deviceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-device-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        <div>
          <h2 className="text-xl mb-2">Browser Breakdown</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={browserData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {browserData.map((entry, index) => (
                <Cell key={`cell-browser-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
