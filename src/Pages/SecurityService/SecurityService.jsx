import React, { useState } from 'react';
import './SecurityService.css';

function SecurityService() {
  const [subheadings, setSubheadings] = useState(['']);

  const handleSubheadingChange = (index, value) => {
    const updated = [...subheadings];
    updated[index] = value;
    setSubheadings(updated);
  };

  const addSubheading = () => {
    setSubheadings([...subheadings, '']);
  };

  return (
    <div className="security-service-wrapper">
      <div className="security-service-form">
        <h2 className="form-title">Karthik Creations Security Service</h2>

        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" className="form-control" />
        </div>

        <div className="form-group">
          <label>Heading</label>
          <input
            type="text"
            className="form-control"
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
          <select className="form-control">
            <option>Available</option>
            <option>Not Available</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn cancel">Cancel</button>
          <button className="btn save">Save Service</button>
        </div>
      </div>
    </div>
  );
}

export default SecurityService;
