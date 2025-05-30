import React from 'react';
import {
  PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const DevicePieChart = ({ data }) => {
  // Group by device
  const deviceCounts = data.reduce((acc, curr) => {
    const device = curr.device || 'Unknown';
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(deviceCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Device Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DevicePieChart;
