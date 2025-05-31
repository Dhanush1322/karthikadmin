import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';  // Import XLSX here
import './ViewContact.css';

const API_URL = 'http://karthikcreation.ap-1.evennode.com/api/user/getAllMessage';

function ViewContact() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem('adminToken'); // get token here

    fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`, // pass token here
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.msg)) {
          setData(result.msg);
        }
      })
      .catch(err => console.error('Error fetching messages:', err));
  }, []);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const changePage = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'prev') return Math.max(prev - 1, 1);
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  // Export to Excel function
  const exportToExcel = () => {
    if (currentRows.length === 0) return;

    // Map current page data to export format
    const exportData = currentRows.map((item, index) => ({
      'S.NO': indexOfFirst + index + 1,
      'Name': item.guest_name,
      'Email': item.guest_mail,
      'Phone': item.guest_phone_no,
      'Message': item.guest_message,
      'Created At': new Date(item.createdAt).toLocaleString(),
      'Updated At': new Date(item.updatedAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Messages');

    XLSX.writeFile(workbook, `contact_messages_page_${currentPage}.xlsx`);
  };

  return (
    <div className="ve-table-container">
      <h2 className="ve-table-title">View Contact Messages</h2>
      <div className="ve-table-scroll">
        <table className="ve-equipment-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            ) : (
              currentRows.map((item, index) => (
                <tr key={item._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{item.guest_name}</td>
                  <td>{item.guest_mail}</td>
                  <td>{item.guest_phone_no}</td>
                  <td>{item.guest_message}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
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
            disabled={currentPage === totalPages}
            className="ve-pagination-btn"
          >
            Next
          </button>
        </div>
        <div className="ve-action-buttons">
          <button className="ve-save-btn" onClick={exportToExcel}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewContact;
