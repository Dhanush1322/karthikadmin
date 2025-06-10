import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const categories = [
  'all',
  'corporate',
  'wedding',
  'exhibitions',
  'operations',
  'entertainments',
  'products',
];

function EditEventGallery() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('adminToken');

  // Fetch and set form data based on ID
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get(
          'https://karthikcreation.ap-1.evennode.com/api/admin/getAllEventGallery',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status && response.data.data.Status) {
          const eventData = response.data.data.data[0];

          for (let cat of categories) {
            const items = eventData[cat];
            if (Array.isArray(items)) {
              const found = items.find((item) => item._id === id);
              if (found) {
                setCategory(cat);
                setHeading(found.heading || '');
                setDescription(found.description || '');
                setPreviewUrl(
                  `https://karthikcreation.ap-1.evennode.com/api/admin/viewEventGalleryFile/${found.img}`
                );
                break;
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchGalleryData();
  }, [id, token]);

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
      formData.append('id', id);
      formData.append('type', category);
      if (category === 'all') {
        formData.append('heading', heading);
        formData.append('description', description);
      }
      formData.append('file', file);

      const response = await axios.patch(
        'https://karthikcreation.ap-1.evennode.com/api/admin/updateEventGallery',
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
        setTimeout(() => navigate('/ViewEventGallery'), 1500);
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
      <h2>Edit Event Gallery</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Select Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>

        {previewUrl && (
          <div style={{ margin: '10px 0' }}>
            <strong>Previous Media:</strong><br />
            {mediaType === 'image' ? (
              <img src={previewUrl} alt="preview" style={{ width: '200px', height: 'auto' }} />
            ) : (
              <video src={previewUrl} controls width="300" />
            )}
          </div>
        )}

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
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>

      {message && (
        <p className={message.includes('success') ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default EditEventGallery;
