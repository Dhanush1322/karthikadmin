import React from 'react';
import './RecentBooking.css';

function RecentBooking() {
  return (
    <div className="recent-booking-section">
      <h3 className="recent-booking-title">Recent Bookings</h3>
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
          <tr>
            <td>James Donovan</td>
            <td>Corporate Event</td>
            <td>May 18, 2025</td>
            <td><span className="status-badge status-confirmed">Confirmed</span></td>
          </tr>
          <tr>
            <td>Rebecca Lawrence</td>
            <td>Wedding</td>
            <td>May 22, 2025</td>
            <td><span className="status-badge status-in-progress">In Progress</span></td>
          </tr>
          <tr>
            <td>Mitchell Henderson</td>
            <td>Concert Security</td>
            <td>May 25, 2025</td>
            <td><span className="status-badge status-pending">Pending</span></td>
          </tr>
          <tr>
            <td>Sarah Blackwood</td>
            <td>Private Party</td>
            <td>May 19, 2025</td>
            <td><span className="status-badge status-confirmed">Confirmed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RecentBooking;
