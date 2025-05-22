import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './ServiceDestribution.css';

const data = [
  { name: 'Corporate', value: 400 },
  { name: 'Event Security', value: 300 },
  { name: 'VIP Operations', value: 300 },
  { name: 'Wedding Security', value: 200 },
  { name: 'Other service', value: 100 },
];

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#8884d8'];

function ServiceDestribution() {
  return (
    <div className="service-distribution">
      <h2>Service Distribution</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="middle" align="right" layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ServiceDestribution;
