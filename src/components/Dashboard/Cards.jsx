import React, { useEffect, useState } from 'react';
import './Cards.css';

function Cards() {
  const [bookingStats, setBookingStats] = useState({
    totalBookings: 0,
    approved: 0,
    rejected: 0,
  });

  const [totalEnquiries, setTotalEnquiries] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    // Fetch booking data
    fetch('https://karthikcreation.ap-1.evennode.com/api/user/getAllEnquiry', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.msg)) {
          const enquiries = result.msg;
          const totalBookings = enquiries.length;
          const approved = enquiries.filter(e => e.action === 'approved').length;
          const rejected = enquiries.filter(e => e.action === 'rejected').length;

          setBookingStats({ totalBookings, approved, rejected });
        }
      })
      .catch(err => console.error('Error fetching bookings:', err));

    // Fetch total enquiry messages
    fetch('https://karthikcreation.ap-1.evennode.com/api/user/getAllMessage', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.msg)) {
          setTotalEnquiries(result.msg.length);
        }
      })
      .catch(err => console.error('Error fetching messages:', err));
  }, []);

  const data = [
    {
      title: "Total Bookings",
      value: bookingStats.totalBookings,
      change: "+12.5%",
      note: "from last month"
    },
    {
      title: "Confirmed Bookings",
      value: bookingStats.approved,
      change: "+12.5%",
      note: "from last month"
    },
    {
      title: "Canceled Bookings",
      value: bookingStats.rejected,
      change: "+12.5%",
      note: "from last month"
    },
    {
      title: "Total Enquiry",
      value: totalEnquiries,
      change: "+12.5%",
      note: "from last month"
    }
  ];

  return (
    <div className="cards-container">
      {data.map((card, index) => (
        <div className="card" key={index}>
          <h4>{card.title}</h4>
          <p>{card.value}</p>
          <small className={card.change.startsWith('+') ? 'positive' : 'negative'}>
            {card.change} {card.note}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Cards;
