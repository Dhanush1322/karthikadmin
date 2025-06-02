import React, { useState, useEffect } from 'react';
import './SecurityServiceTable.css';
import { useNavigate } from 'react-router-dom';

const AUTH_TOKEN = localStorage.getItem('adminToken');

function SecurityServiceTable() {
  const [data, setData] = useState([]);
  const [images, setImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const navigate = useNavigate(); // ✅ FIX: Declare navigate here

  useEffect(() => {
    fetch('http://karthikcreation.ap-1.evennode.com/api/admin/getService', {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.Status && Array.isArray(result.data)) {
          setData(result.data);

          const newImages = {};
          for (const item of result.data) {
            if (item.img) {
              const response = await fetch(
                `http://karthikcreation.ap-1.evennode.com/api/admin/viewServiceFile/${item.img}`,
                {
                  headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                  },
                }
              );
              const blob = await response.blob();
              newImages[item._id] = URL.createObjectURL(blob);
            }
          }
          setImages(newImages);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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

  return (
    <div className="table-container">
      <h2 className="table-title">Karthik Creations Security Service</h2>
      <div className="table-scroll">
        <table className="equipment-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Image</th>
              <th>Heading</th>
              <th>Sub Heading</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item._id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>
                  {images[item._id] ? (
                    <img
                      src={images[item._id]}
                      alt="equipment"
                      className="equipment-img"
                    />
                  ) : (
                    <span>Loading...</span>
                  )}
                </td>
                <td className="bold">{item.heading}</td>
                <td>{item.subheading?.join(', ')}</td>
                <td>
                  <span className="status-badge">{item.availability_status}</span>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/EditSecurityService/${item._id}`)}
                  >
                    ✏️
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-section">
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
    </div>
  );
}

export default SecurityServiceTable;
