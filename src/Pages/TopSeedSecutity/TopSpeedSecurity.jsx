import React, { useState } from 'react';
import './TopSpeedSecurity.css';
function TopSpeedSecurity() {
  const [image, setImage] = useState(null);
  const [events, setEvents] = useState('');
   const [name, setName] = useState('');
  const [ratings, setRatings] = useState('');
  const [isBookable, setIsBookable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('file', image);
      formData.append('number_of_events', events);
      formData.append('heading', name);
      formData.append('rating', ratings);
      formData.append('availability_status', isBookable);

      const response = await fetch('https://karthikcreation.ap-1.evennode.com/api/admin/addArtist', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
          // Don't add 'Content-Type': it will be set automatically for FormData
        },
        body: formData
      });


      const data = await response.json();

      if (response.ok) {
        alert('Artist added successfully!');
        // Reset form
        setImage(null);
        setEvents('');
        setRatings('');
        setIsBookable(false);
      } else {
        alert('Failed to add artist: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="security-service-wrapper">
      <div className="security-service-form">
        <h2 className="form-title">Add Performer Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Events</label>
            <input
              type="number"
              name="eventsCount"
              value={events}
              onChange={(e) => setEvents(e.target.value)}
              placeholder="Number of Events"
              className="form-control"
              required
              min={0}
            />
          </div>
          <div className="form-group">
            <label>Events Name</label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Events Name"
              className="form-control"
              required
              min={0}
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              name="rating"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
              placeholder="Rating (0 to 5)"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="isBookable"
                checked={isBookable}
                onChange={(e) => setIsBookable(e.target.checked)}
              />
              Bookable
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn save" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TopSpeedSecurity;
