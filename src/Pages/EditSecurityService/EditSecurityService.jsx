import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import './EditSecurityService.css';

function EditSecurityService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [subheadings, setSubheadings] = useState(['']);
  const [availability, setAvailability] = useState('Available');

  useEffect(() => {
  const fetchServiceData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        'https://karthikcreation.ap-1.evennode.com/api/admin/getService',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.Status && Array.isArray(response.data.data)) {
        const service = response.data.data.find((item) => item._id === id);
        if (service) {
          setHeading(service.heading || '');
          setSubheadings(service.subheading || ['']);
          setAvailability(service.availability_status || 'Available');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Not Found',
            text: 'Service not found for given ID.',
            confirmButtonColor: '#d33',
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Could not fetch service data.',
        confirmButtonColor: '#d33',
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
        confirmButtonColor: '#f0ad4e',
      });
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append('file', image);
    }
    formData.append('heading', heading);
    subheadings.forEach((sub, index) => {
      formData.append(`subheading[${index}]`, sub);
    });
    formData.append('availability_status', availability);

    const token = localStorage.getItem('adminToken');

    try {
      const response = await axios.put(
        `https://karthikcreation.ap-1.evennode.com/api/admin/updateServiceData/${id}`,
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
        text: 'Service updated successfully.',
        confirmButtonColor: '#3085d6',
      });

      navigate('/SecurityServiceTable'); // or redirect where you need
    } catch (error) {
      console.error('Error updating service:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update service.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="security-service-wrapper">
      <div className="security-service-form">
        <h2 className="form-title">Edit Security Service</h2>

        <div className="form-group">
          <label>Upload New Image (optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
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
            <label>Subheading {index + 1}</label>
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
          <button className="btn cancel" type="button" onClick={() => navigate(-1)}>
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

export default EditSecurityService;
