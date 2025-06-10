import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import './EditTopSpeedSecurity.css';

function EditTopSpeedSecurity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [heading, setHeading] = useState('');
  const [subheadings, setSubheadings] = useState(['']);
  const [availability, setAvailability] = useState('Available');

  useEffect(() => {
    const fetchServiceData = async () => {
      const token = localStorage.getItem('adminToken');

      try {
        const response = await axios.get(
          'https://karthikcreation.ap-1.evennode.com/api/admin/getAllTopSpeedSecurityService',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        const matchedItem = data.find((item) => item._id === id);

        if (matchedItem) {
          setHeading(matchedItem.heading || '');
          setSubheadings(matchedItem.subheading || ['']);
          setAvailability(matchedItem.availability_status || 'Available');
          setExistingImage(matchedItem.image); // save for preview
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Not Found',
            text: 'Service not found with the given ID.',
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch service data.',
        });
      }
    };

    fetchServiceData();
  }, [id]);

  const handleSubheadingChange = (index, value) => {
    const updated = [...subheadings];
    updated[index] = value;
    setSubheadings(updated);
  };

  const addSubheading = () => {
    setSubheadings([...subheadings, '']);
  };

  const handleSaveService = async () => {
    if (!heading) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete!',
        text: 'Heading is required.',
      });
      return;
    }

    const formData = new FormData();
    if (image) formData.append('file', image);
    formData.append('heading', heading);
    subheadings.forEach((sub, index) => {
      formData.append(`subheading[${index}]`, sub);
    });
    formData.append('availability_status', availability);

    const token = localStorage.getItem('adminToken');

    try {
      const response = await axios.put(
        `https://karthikcreation.ap-1.evennode.com/api/admin/updateTopSpeedSecurityServiceData/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Service updated successfully!',
      }).then(() => {
        navigate('/TopSpeedTable'); // Redirect to table after update
      });
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to update service.',
      });
    }
  };

  return (
    <div className="security-service-wrapper">
      <div className="security-service-form">
        <h2 className="form-title">Edit Top Speed Security Service</h2>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {existingImage && !image && (
            <img
              src={existingImage}
              alt="Existing"
              style={{ width: '150px', marginTop: '10px' }}
            />
          )}
        </div>

        <div className="form-group">
          <label>Heading</label>
          <input
            type="text"
            className="form-control"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter Heading"
          />
        </div>

        {subheadings.map((sub, index) => (
          <div key={index} className="form-group">
            <label>Subheading {subheadings.length > 1 ? index + 1 : ''}</label>
            <input
              type="text"
              className="form-control"
              value={sub}
              onChange={(e) => handleSubheadingChange(index, e.target.value)}
              placeholder="Enter Subheading"
            />
          </div>
        ))}

        <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
          <button type="button" className="btn save" onClick={addSubheading}>
            + Add Subheading
          </button>
        </div>

        <div className="form-group">
          <label>Availability</label>
          <select
            className="form-control"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option>Available</option>
            <option>Not Available</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn cancel" type="button" onClick={() => navigate('/TopSpeedSecurityTable')}>
            Cancel
          </button>
          <button className="btn save" type="button" onClick={handleSaveService}>
            Update Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTopSpeedSecurity;
