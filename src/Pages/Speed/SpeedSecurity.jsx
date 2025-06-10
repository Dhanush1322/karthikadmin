
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SpeedSecurity.css';

function SpeedSecurity() {
  const [image, setImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [subheadings, setSubheadings] = useState(['']);
  const [availability, setAvailability] = useState('Available');

  const handleSubheadingChange = (index, value) => {
    const updated = [...subheadings];
    updated[index] = value;
    setSubheadings(updated);
  };

  const addSubheading = () => {
    setSubheadings([...subheadings, '']);
  };

  const handleSaveService = async () => {
    if (!image || !heading) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete!',
        text: 'Please fill all required fields.',
        confirmButtonColor: '#f0ad4e',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('heading', heading);
    subheadings.forEach((sub, index) => {
      formData.append(`subheading[${index}]`, sub);
    });
    formData.append('availability_status', availability);

    const token = localStorage.getItem('adminToken');

    try {
      const response = await axios.post(
        'https://karthikcreation.ap-1.evennode.com/api/admin/addTopSpeedSecurityService',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Success:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Service saved successfully!',
        confirmButtonColor: '#3085d6',
      });

      // Reset form fields after success
      setImage(null);
      setHeading('');
      setSubheadings(['']);
      setAvailability('Available');
      // Clear file input value manually
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to save service!',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="security-service-wrapper">
      <div className="security-service-form">
        <h2 className="form-title">Karthik Creations Speed Security Service</h2>

        <div className="form-group">
          <label>Upload Image</label>
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
          <button className="btn cancel" type="button">
            Cancel
          </button>
          <button className="btn save" type="button" onClick={handleSaveService}>
            Save Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpeedSecurity;

