import React from 'react';
import './PendingBooking.css';

function PendingBooking() {
  return (
    <div className="pending-booking-section">
      <h3 className="pending-booking-title">Pending Approvals</h3>
      <div className="pending-booking-list">
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index} className="pending-item">
            <span>
              Corporate Event – Westfield Inc<br />
              <small style={{ color: '#6b7280' }}>Scheduled for: May 28, 2025</small>
            </span>
            <div className="pending-actions">
              <button className="approve">Approve</button>
              <button className="reject">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingBooking;
