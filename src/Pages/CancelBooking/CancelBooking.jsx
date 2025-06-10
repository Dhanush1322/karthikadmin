import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './CancelBooking.css';

const API_URL = 'https://karthikcreation.ap-1.evennode.com/api/user/getAllEnquiry';

function CancelBooking() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);

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
          setCurrentPage(1);
        }
      })
      .catch(err => console.error('Error fetching enquiry data:', err))
      .finally(() => setLoading(false));
  };

  // Filter only rejected enquiries before pagination
  const pendingData = data.filter(item => item.action === 'rejected');

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

  // XLSX export function
  const exportToExcel = () => {
    if (currentRows.length === 0) return;

    // Prepare data for worksheet - map each object to a flat row
    const exportData = currentRows.map((item, index) => ({
      'S.NO': indexOfFirst + index + 1,
      'Name': item.full_name,
      'Optional Name': item.optional_name || '-',
      'Company Name': item.company_name || '-',
      'Phone Number': item.phone_no,
      'Alternate Number': item.optional_phone_no || '-',
      'Email': item.email,
      'Optional Email': item.optional_email || '-',
      'Schedule Date': new Date(item.schedule_date).toLocaleDateString(),
      'Booking Days': item.booking_days,
      'Reference Module': item.reference_model || '-',
      'Created At': new Date(item.createdAt).toLocaleString(),
      'Updated At': new Date(item.updatedAt).toLocaleString(),
      'Status': item.action.toUpperCase(),
    }));

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cancelled Bookings');

    // Export to Excel file
    XLSX.writeFile(workbook, `cancelled_bookings_page_${currentPage}.xlsx`);
  };

  return (
    <div className="ve-table-container">
      <h2 className="ve-table-title">Bookings (Rejected only)</h2>
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="15" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            ) : currentRows.length === 0 ? (
              <tr>
                <td colSpan="15" style={{ textAlign: 'center' }}>No rejected enquiries found.</td>
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
                  <td style={{ color: 'red' }}>{item.action.toUpperCase()}</td>
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
          <button className="ve-save-btn" onClick={exportToExcel}>Download</button>
        </div>
      </div>
    </div>
  );
}

export default CancelBooking;
