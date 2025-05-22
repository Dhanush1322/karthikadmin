
import React, { useState } from 'react';
import './ConfirmBooking.css';

const data = [
  {
    id: 1,
    image: 'https://via.placeholder.com/60',
    name: 'Sofas & Chairs',
    companyname: 'Top Speed Security Service',
    email: 'dfdsff',
    number: '1234567890',
    description: 'Cushion Chairs ( With Cover & Bow )',
    status: 'Confirmed',
    date: 'May 15, 2025',
  },
   {
    id: 2,
    image: 'https://via.placeholder.com/60',
    name: 'Sofas & Chairs',
    companyname: 'Top Speed Security Service',
    email: 'dfdsff',
    number: '1234567890',
    description: 'Cushion Chairs ( With Cover & Bow )',
    status: 'Confirmed',
    date: 'May 15, 2025',
  },
];

function ConfirmBooking
() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

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

  return (
    <div className="ve-table-container">
      <h2 className="ve-table-title">Top Speed Security Service</h2>
      <div className="ve-table-scroll">
        <table className="ve-equipment-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Image</th>
              <th>Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirst + index + 1}</td>
                <td><img src={item.image} alt="equipment" className="ve-equipment-img" /></td>
                <td className="ve-bold">{item.name}</td>
                <td>{item.companyname}</td>
                <td><span className="ve-status-badge">{item.email}</span></td>
                <td>{item.number}</td>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td >
                  {item.status}
                </td>
              </tr>
            ))}
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
          <button className="ve-cancel-btn ve-gray">Cancel</button>
          <button className="ve-save-btn">Save Service</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBooking;
