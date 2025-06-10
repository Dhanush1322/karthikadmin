import React, { useEffect, useState } from 'react';
import './ViewBanner.css';

function ViewBanner() {
  const [banners, setBanners] = useState([]);

  // Example static data (replace with actual fetch)
  useEffect(() => {
    // Simulate API response
    const dummyData = [
      { _id: '1', img: 'https://via.placeholder.com/150' },
      { _id: '2', img: 'https://via.placeholder.com/150' },
    ];
    setBanners(dummyData);
  }, []);

  const handleEdit = (id) => {
    alert(`Edit banner with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    if (confirmDelete) {
      // Here you'd call delete API
      setBanners(banners.filter((banner) => banner._id !== id));
    }
  };

  return (
    <div className="view-banner-container">
      <h2>View Banners</h2>
      <table className="banner-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={banner._id}>
              <td>{index + 1}</td>
              <td>
                <img src={banner.img} alt="banner" className="banner-img" />
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(banner._id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(banner._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBanner;
