import React, { useState, useEffect } from 'react';
import './TopSpeedTable.css';

const API_URL = 'http://karthikcreation.ap-1.evennode.com/api/admin/getAllTopSpeedSecurityService';
const IMAGE_API_BASE_URL = 'http://karthikcreation.ap-1.evennode.com/api/admin/viewTopSpeedSecurityServiceFile/';
const AUTH_TOKEN = localStorage.getItem('adminToken');

function TopSpeedTable() {
  const [data, setData] = useState([]);
  const [imageUrls, setImageUrls] = useState({}); // id => objectURL
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Fetch data on mount
  useEffect(() => {
    fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.Status && Array.isArray(result.data)) {
          setData(result.data);
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Fetch images with auth headers as blobs
  useEffect(() => {
    // For current page data only, to optimize
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    currentData.forEach(item => {
      if (!item.img || imageUrls[item._id]) return; // skip if no image or already fetched

      fetch(`${IMAGE_API_BASE_URL}${item.img}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Image fetch failed');
          return res.blob();
        })
        .then(blob => {
          const objectUrl = URL.createObjectURL(blob);
          setImageUrls(prev => ({ ...prev, [item._id]: objectUrl }));
        })
        .catch(err => {
          console.error('Error fetching image:', err);
          // fallback or do nothing
        });
    });

    // Cleanup object URLs when component unmounts or data changes
    return () => {
      Object.values(imageUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [data, currentPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const changePage = (direction) => {
    setCurrentPage(prev => {
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
              <th>Heading</th>
              <th>Sub Heading</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            )}
            {data.length > 0 && data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((item, index) => (
              <tr key={item._id || item.id}>
                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td>
                  {imageUrls[item._id] ? (
                    <img
                      src={imageUrls[item._id]}
                      alt="equipment"
                      className="equipment-img"
                    />
                  ) : (
                    <span>Loading Image...</span>
                  )}

                </td>
                <td className="bold">{item.heading || item.name}</td>
                <td>{item.subheading || item.description}</td>
                <td>
                  <span className="status-badge">{item.availability_status || item.status}</span>
                </td>
                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</td>
                <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ''}</td>
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
       
      </div>
    </div>
  );
}

export default TopSpeedTable;
