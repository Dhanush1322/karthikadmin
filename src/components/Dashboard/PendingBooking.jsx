import React, { useEffect, useState } from 'react';
import './PendingBooking.css';
import Swal from 'sweetalert2';

const API_URL = 'http://karthikcreation.ap-1.evennode.com/api/user/getAllEnquiry';
const UPDATE_STATUS_URL = 'http://karthikcreation.ap-1.evennode.com/api/user/approveRejectEnquiry';

function PendingBooking() {
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = () => {
    const token = localStorage.getItem('adminToken');
    setLoading(true);

    fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.msg)) {
          const filtered = result.msg.filter(item => item.action === 'pending');
          setPendingList(filtered);
        }
      })
      .catch(err => console.error('Error fetching bookings:', err))
      .finally(() => setLoading(false));
  };

  const updateStatus = (id, status) => {
    const token = localStorage.getItem('adminToken');
    setUpdatingId(id);

    fetch(`${UPDATE_STATUS_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: status }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message && result.data) {
          setPendingList(prev => prev.filter(item => item._id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Status Updated',
            text: `Booking has been ${status}`,
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Failed to update booking status',
          });
        }
      })
      .catch(err => {
        console.error('Error updating status:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error updating booking status',
        });
      })
      .finally(() => setUpdatingId(null));
  };

  // Pagination logic
  const totalPages = Math.ceil(pendingList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = pendingList.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="pending-booking-section">
      <h3 className="pending-booking-title">Pending Approvals</h3>

      {loading ? (
        <p>Loading...</p>
      ) : pendingList.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <>
          <div className="pending-booking-list">
            {currentItems.map((item, index) => (
              <div key={index} className="pending-item">
                <span>
                  {item.reference_model || 'Unknown Event'} – {item.company_name || 'No Company'}<br />
                  <small style={{ color: '#6b7280' }}>
                    Scheduled for: {new Date(item.schedule_date).toLocaleDateString()}
                  </small>
                </span>
                <div className="pending-actions">
                  <button
                    className="approve"
                    disabled={updatingId === item._id}
                    onClick={() => updateStatus(item._id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    disabled={updatingId === item._id}
                    onClick={() => updateStatus(item._id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx + 1)}
                className={currentPage === idx + 1 ? 'active-page' : ''}
              >
                {idx + 1}
              </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PendingBooking;
