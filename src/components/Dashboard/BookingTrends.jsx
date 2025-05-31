import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import './BookingTrends.css';
import moment from 'moment';

function BookingTrends() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    fetch('http://karthikcreation.ap-1.evennode.com/api/user/getAllEnquiry', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.Status && Array.isArray(result.msg)) {
          const monthlyData = {};

          result.msg.forEach((booking) => {
            const month = moment(booking.date || booking.createdAt).format('MMM');
            const type = booking.type || 'corporate'; // Default fallback

            if (!monthlyData[month]) {
              monthlyData[month] = { name: month, corporate: 0, vip: 0 };
            }

            if (type.toLowerCase() === 'vip') {
              monthlyData[month].vip += 1;
            } else {
              monthlyData[month].corporate += 1;
            }
          });

          // Sort months based on calendar order
          const orderedMonths = moment.monthsShort();
          const sortedData = orderedMonths.map((m) => monthlyData[m] || { name: m, corporate: 0, vip: 0 });

          setChartData(sortedData);
        }
      })
      .catch((err) => console.error('Error loading booking trends:', err));
  }, []);

  return (
    <div className="booking-trends">
      <h2>Booking Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
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
