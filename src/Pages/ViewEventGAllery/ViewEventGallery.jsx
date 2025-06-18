import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewEventGallery() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');

      try {
        const response = await fetch(
          'https://karthikcreation.ap-1.evennode.com/api/admin/getAllEventGallery',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const result = await response.json();

        if (result.status && result.data.Status) {
          const raw = result.data.data[0];
          const promises = [];

          for (const category in raw) {
            if (
              Array.isArray(raw[category]) &&
              ['corporate', 'all', 'wedding', 'exhibitions', 'operations', 'entertainments', 'products'].includes(category)
            ) {
              for (const item of raw[category]) {
                const promise = fetchImageWithToken(item.img, token).then((imageBlob) => {
                  const imageUrl = URL.createObjectURL(imageBlob);
                  return {
                    ...item,
                    category,
                    imageUrl,
                  };
                });
                promises.push(promise);
              }
            }
          }

          const merged = await Promise.all(promises);
          setData(merged);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    const fetchImageWithToken = async (imgPath, token) => {
      const response = await fetch(
        `https://karthikcreation.ap-1.evennode.com/api/admin/viewEventGalleryFile?fileUrl=${imgPath}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return await response.blob();
    };

    fetchData();
  }, []);

  const handleDelete = async (itemId, itemType) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const token = localStorage.getItem('adminToken');

    try {
      const response = await axios.request({
        method: 'DELETE',
        url: 'https://karthikcreation.ap-1.evennode.com/api/admin/deleteEventGallery',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          type: itemType,
          id: itemId,
        },
      });

      if (response.data.status) {
        alert('Deleted successfully');
        // Remove deleted item without reload
        setData((prev) => prev.filter((item) => item._id !== itemId));
      } else {
        alert('Failed to delete: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Delete failed:', error.response || error.message);
      alert('Error deleting item');
    }
  };

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
      <div className="table-scroll">
        <table className="equipment-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>ID</th>
              <th>Category</th>
              <th>Image/Video</th>
              <th>Heading</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item._id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{item._id}</td>
                <td>{item.category}</td>
                <td>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="event"
                      className="equipment-img"
                      style={{ width: '100px', height: '80px', objectFit: 'cover' }}
                    />
                  ) : (
                    'Loading...'
                  )}
                </td>
                <td>{item.heading || '-'}</td>
                <td>{item.description || '-'}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      marginRight: '8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/EditEventGallery/${item._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(item._id, item.category)}
                  >
                    Delete
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

export default ViewEventGallery;
