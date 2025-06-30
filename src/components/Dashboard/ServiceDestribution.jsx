import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './ServiceDestribution.css';

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#8884d8'];

function ServiceDestribution() {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    fetch('https://karthikcreation.ap-1.evennode.com/api/user/getAllEnquiryNew', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.msg)) {
          const services = result.msg;

          // Count the services
          const counts = {};
          services.forEach(item => {
            const type = item.serviceType || 'Other'; // Replace `serviceType` with actual field name
            counts[type] = (counts[type] || 0) + 1;
          });

          const chartData = Object.entries(counts).map(([name, value]) => ({
            name,
            value,
          }));

          setServiceData(chartData);
        }
      })
      .catch(err => console.error('Error fetching service data:', err));
  }, []);

  return (
    <div className="service-distribution">
      <h2>Service Distribution</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={serviceData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {serviceData.map((entry, index) => (
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
