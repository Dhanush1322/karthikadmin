import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import './BookingTrends.css';

const data = [
  { name: 'Jan', corporate: 100, vip: 50 },
  { name: 'Feb', corporate: 150, vip: 100 },
  { name: 'Mar', corporate: 200, vip: 180 },
  { name: 'Apr', corporate: 300, vip: 230 },
  { name: 'May', corporate: 400, vip: 280 },
  { name: 'Jun', corporate: 350, vip: 300 },
  { name: 'Jul', corporate: 420, vip: 320 },
  { name: 'Aug', corporate: 500, vip: 360 },
  { name: 'Sep', corporate: 470, vip: 310 },
  { name: 'Oct', corporate: 520, vip: 290 },
  { name: 'Nov', corporate: 430, vip: 250 },
  { name: 'Dec', corporate: 410, vip: 240 },
];

function BookingTrends() {
  return (
    <div className="booking-trends">
      <h2>Booking Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCorporate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorVIP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="corporate" stroke="#8884d8" fillOpacity={1} fill="url(#colorCorporate)" />
          <Area type="monotone" dataKey="vip" stroke="#82ca9d" fillOpacity={1} fill="url(#colorVIP)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BookingTrends;
