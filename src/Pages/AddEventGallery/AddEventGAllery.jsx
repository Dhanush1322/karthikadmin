import React, { useState } from 'react';
import axios from 'axios';
import './AddEventGAllery.css';

const categories = [
  'all',
  'corporate',
  'wedding',
  'exhibitions',
  'operations',
  'entertainments',
  'products',
];

function AddEventGallery() {
  const [category, setCategory] = useState('all');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Token from localStorage or context
  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select an image or video file');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('type', category);
      if (category === 'all') {
        formData.append('heading', heading);
        formData.append('description', description);
      }
      formData.append('file', file);

      const response = await axios.post(
        'http://karthikcreation.ap-1.evennode.com/api/admin/createEventGallery',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setMessage('Event Gallery updated successfully');
        setHeading('');
        setDescription('');
        setFile(null);
        setCategory('all');
      } else {
        setMessage('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-gallery">
      <h2>Add Event Gallery</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Select Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </label>

        {category === 'all' && (
          <>
            <label>
              Heading:
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
                placeholder="Enter heading"
              />
            </label>

            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="Enter description"
              />
            </label>
          </>
        )}

        <label>
          Select Media Type:
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>

        <label>
          Upload {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}:
          <input
            type="file"
            accept={`${mediaType}/*`}
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {message && (
        <p
          className={message.includes('success') ? 'success-message' : 'error-message'}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AddEventGallery;
