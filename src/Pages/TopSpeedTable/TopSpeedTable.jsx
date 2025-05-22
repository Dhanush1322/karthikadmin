
import React, { useState } from 'react';
import './TopSpeedTable.css';

const data = [
  {
    id: 1,
    image: 'https://via.placeholder.com/60',
    name: 'Sofas & Chairs',
    description: 'Cushion Chairs ( With Cover & Bow )',
    status: 'Available',
    date: 'May 15, 2025',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/60',
    name: 'Sound & Lighting',
    description: 'Podiums',
    status: 'Available',
    date: 'May 12, 2025',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/60',
    name: 'Cooling Solutions',
    description: 'A/C Units',
    status: 'Available',
    date: 'May 10, 2025',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/60',
    name: 'Event Support Equipment',
    description: 'Barricades & Bollards',
    status: 'Available',
    date: 'May 8, 2025',
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/60',
    name: 'Maxima Stalls',
    description: 'German Pagoda ( All Size )',
    status: 'Available',
    date: 'May 5, 2025',
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/60',
    name: 'Event Furniture',
    description: 'Carpets ( All Colors & Designs )',
    status: 'Available',
    date: 'May 3, 2025',
  }
];

function TopSpeedTable() {
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
    <div className="table-container">
      <h2 className="table-title">Top Speed Security Service</h2>
      <div className="table-scroll">
        <table className="equipment-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Image</th>
              <th>Equipment Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirst + index + 1}</td>
                <td><img src={item.image} alt="equipment" className="equipment-img" /></td>
                <td className="bold">{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <span className="status-badge">{item.status}</span>
                </td>
                <td>{item.date}</td>
                <td className="action-btns">
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-section">
        <div>
          <button
            onClick={() => changePage('prev')}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <button
            onClick={() => changePage('next')}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
        <div className="action-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save Service</button>
        </div>
      </div>
    </div>
  );
}

export default TopSpeedTable;
