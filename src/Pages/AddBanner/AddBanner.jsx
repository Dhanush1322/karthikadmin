import React, { useState } from 'react';
import './AddBanner.css'; // optional: for styling

function AddBanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [loading, setLoading] = useState(false); // ← add this

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert('Please select an image.');
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('No token found. Please login.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage); // ← should be 'img', not 'file'

    try {
      setLoading(true);
      const response = await fetch('https://karthikcreation.ap-1.evennode.com/api/admin/addBanner', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status) {
        setUploadMessage('✅ ' + result.message);
        setSelectedImage(null);
        setPreviewUrl(null);
      } else {
        setUploadMessage('❌ Failed to upload banner.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadMessage('❌ An error occurred while uploading.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-banner-container">
      <h2>Add Banner Image</h2>
      <form onSubmit={handleSubmit} className="add-banner-form">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
      </form>
    </div>
  );
}

export default AddBanner;
