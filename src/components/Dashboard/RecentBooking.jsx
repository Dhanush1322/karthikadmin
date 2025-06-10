import React, { useEffect, useState } from 'react';
import './RecentBooking.css';

const API_URL = 'https://karthikcreation.ap-1.evennode.com/api/user/getAllEnquiry';

function RecentBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);
    fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.msg)) {
          setBookings(result.msg.slice(0, 4)); // Show only the latest 4 bookings
        }
      })
      .catch(err => console.error('Error fetching bookings:', err))
      .finally(() => setLoading(false));
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'status-badge status-confirmed';
      case 'pending':
        return 'status-badge status-pending';
      case 'rejected':
        return 'status-badge status-rejected';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="recent-booking-section">
      <h3 className="recent-booking-title">Recent Bookings</h3>
      <div className="table-wrapper">
        <table className="recent-booking-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Event Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No bookings found.</td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.full_name || 'N/A'}</td>
                  <td>{booking.reference_model || 'N/A'}</td>
                  <td>{new Date(booking.schedule_date).toLocaleDateString()}</td>
                  <td>
                    <span className={getStatusBadgeClass(booking.action)}>
                      {booking.action}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentBooking;
