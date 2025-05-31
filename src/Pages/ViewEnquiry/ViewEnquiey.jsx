import React, { useState, useEffect } from 'react';
import './ViewEnquiey.css';
import Swal from 'sweetalert2';
const API_URL = 'http://karthikcreation.ap-1.evennode.com/api/user/getAllEnquiry';
const UPDATE_STATUS_URL = 'http://karthikcreation.ap-1.evennode.com/api/user/approveRejectEnquiry';

function ViewEnquiey() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.msg)) {
          setData(result.msg);
          setCurrentPage(1);  // reset page on new data load
        }
      })
      .catch(err => console.error('Error fetching enquiry data:', err))
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
      console.log('Update result:', result); // Debug API response

      if (result.message && result.data) {
        const updatedItem = result.data;

        setData(prevData => {
          // Replace the item with the updated one
          const newData = prevData.map(item =>
            item._id === id ? updatedItem : item
          );

          // Filter out if updated item's action is not 'pending'
          return newData.filter(item => item.action === 'pending');
        });

        // Adjust current page if needed
        setCurrentPage(prevPage => {
          const filteredLength = data.filter(item => item.action === 'pending').length - 1;
          const maxPages = Math.ceil(filteredLength / rowsPerPage);
          return prevPage > maxPages ? maxPages : prevPage;
        });

        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `Enquiry has been ${status}`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update status',
        });
      }
    })
    .catch(err => {
      console.error('Error updating status:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating status',
      });
    })
    .finally(() => setUpdatingId(null));
};

  // Filter only pending enquiries before pagination
  const pendingData = data.filter(item => item.action === 'pending');

  const totalPages = Math.ceil(pendingData.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = pendingData.slice(indexOfFirst, indexOfLast);

  const changePage = (direction) => {
    setCurrentPage(prev => {
      if (direction === 'prev') return Math.max(prev - 1, 1);
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  return (
    <div className="ve-table-container">
      <h2 className="ve-table-title">Bookings (Pending only)</h2>
      <div className="ve-table-scroll">
        <table className="ve-equipment-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Optional Name</th>
              <th>Company Name</th>
              <th>Phone Number</th>
              <th>Alternate Number</th>
              <th>Email</th>
              <th>Optional Email</th>
              <th>Schedule Date</th>
              <th>Booking Days</th>
              <th>Reference Module</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="15" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            ) : currentRows.length === 0 ? (
              <tr>
                <td colSpan="15" style={{ textAlign: 'center' }}>No pending enquiries found.</td>
              </tr>
            ) : (
              currentRows.map((item, index) => (
                <tr key={item._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{item.full_name}</td>
                  <td>{item.optional_name || '-'}</td>
                  <td>{item.company_name || '-'}</td>
                  <td>{item.phone_no}</td>
                  <td>{item.optional_phone_no || '-'}</td>
                  <td>{item.email}</td>
                  <td>{item.optional_email || '-'}</td>
                  <td>{new Date(item.schedule_date).toLocaleDateString()}</td>
                  <td>{item.booking_days}</td>
                  <td>{item.reference_model || '-'}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{new Date(item.updatedAt).toLocaleString()}</td>
                  <td>{item.action}</td>
                  <td>
                    <button
                      disabled={updatingId === item._id}
                      onClick={() => updateStatus(item._id, 'approved')}
                      style={{ marginRight: 8, backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >
                      Approve
                    </button>
                    <button
                      disabled={updatingId === item._id}
                      onClick={() => updateStatus(item._id, 'rejected')}
                      style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="ve-pagination-section">
        <div>
          <button
            onClick={() => changePage('prev')}
            disabled={currentPage === 1}
            className="ve-pagination-btn"
          >
            Previous
          </button>
          <button
            onClick={() => changePage('next')}
            disabled={currentPage === totalPages || totalPages === 0}
            className="ve-pagination-btn"
          >
            Next
          </button>
        </div>
        <div className="ve-action-buttons">
          <button className="ve-cancel-btn ve-gray">Cancel</button>
          <button className="ve-save-btn">Save Service</button>
        </div>
      </div>
    </div>
  );
}

export default ViewEnquiey;
