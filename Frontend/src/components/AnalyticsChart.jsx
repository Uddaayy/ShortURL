import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
const AnalyticsChart = ({ data }) => {
  const grouped = data.reduce((acc, curr) => {
    const date = new Date(curr.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([date, clicks]) => ({
    date,
    clicks,
  }));
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Clicks Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
