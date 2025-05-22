import React, { useState } from 'react';


function TopSpeedSecurity() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: '',
    eventsCount: '',
    description: '',
    genres: '',
    imageUrl: '',
    isBookable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit performer data:', formData);
    // Send to backend here
  };

  return (
    <div className="security-service-wrapper">
      <div className="security-service-form">
        <h2 className="form-title">Add Performer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Performer Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Performer Name"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role (e.g., DJ, Band)"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating (e.g., 4.8)"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Events</label>
            <input
              name="eventsCount"
              value={formData.eventsCount}
              onChange={handleChange}
              placeholder="Number of Events"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-control form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label>Genres</label>
            <input
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              placeholder="Genres (comma-separated)"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="isBookable"
                checked={formData.isBookable}
                onChange={handleChange}
              />
              Bookable
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn save">Save Performer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TopSpeedSecurity;
