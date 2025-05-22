

import React, { useState } from 'react';
import './ViewContact.css';

const data = [
  {
    id: 1,
    name: 'dhanu',
    phone: '25235325',
    email: 'Top Speed Security Service',
    subject: 'dfdsff',
    description: 'Cushion Chairs ( With Cover & Bow )',
    date: 'May 15, 2025',
  },
     {
    id: 2,
    name: 'dhanu',
    phone: '25235325',
    email: 'Top Speed Security Service',
    subject: 'dfdsff',
    description: 'Cushion Chairs ( With Cover & Bow )',
    date: 'May 15, 2025',
  },
];

function ViewContact
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
              <th>Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Subject</th>
           
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirst + index + 1}</td>
               
                <td className="ve-bold">{item.name}</td>
                <td>{item.phone}</td>
                <td><span className="ve-status-badge">{item.email}</span></td>
                <td>{item.subject}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
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

export default ViewContact;
