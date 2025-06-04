import React from 'react';
import { Home, Shield, Zap, Users, X, BookOpen, Phone, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('adminToken'); // Remove token
  navigate('/'); // Redirect to login page
};
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Mobile Close Button */}
      <button className="close-btn" onClick={onClose}>
        <X size={24} />
      </button>

      <div className="sidebar-content">
        <div className="logo-section">
          <img src="/logo/logo.png" alt="Logo" className="logo" />
          <p className="tagline">A legacy of excellence</p>
        </div>
        <hr />

        <div>
          <p className="menu-title">MAIN MENU</p>
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `menu-button ${isActive ? 'active' : ''}`
            }
          >
            <Home className="menu-icon" />
            Home
          </NavLink>
        </div>

        <div className="services-section">
          <p className="menu-title">SERVICES</p>
          <ul className="services-list">
             <li>
              <NavLink to="/AddEventGAllery" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Shield className="menu-icon" />
                Add Event Gallary
              </NavLink>
            </li>
            <li>
              <NavLink to="/SecurityService" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Shield className="menu-icon" />
                Security Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/SecurityServiceTable" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Shield className="menu-icon" />
                View Security Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/artist-coordination" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Users className="menu-icon" />
                Artist Coordination
              </NavLink>
            </li>
            <li>
              <NavLink to="/ArtistsCoordinationTable" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Users className="menu-icon" />
                View Artists Coordination
              </NavLink>
            </li>
            <li>
              <NavLink to="/SpeedSecurity" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Zap className="menu-icon" />
                Top Speed Security Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/TopSpeedTable" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Zap className="menu-icon" />
                View Top Speed Security Services
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="services-section">
          <p className="menu-title">BOOKING</p>
          <ul className="services-list">
            <li>
              <NavLink to="/ViewEnquiey" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <BookOpen className="menu-icon" />
                View Booking
              </NavLink>
            </li>
             <li>
              <NavLink to="/ConfirmBooking" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <BookOpen className="menu-icon" />
               Confirm Booking
              </NavLink>
            </li>
             <li>
              <NavLink to="/CancelBooking" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <BookOpen className="menu-icon" />
                Cancel Booking
              </NavLink>
            </li>
            <li>
              <NavLink to="/Contact" className={({ isActive }) => `service-item ${isActive ? 'active' : ''}`}>
                <Phone className="menu-icon" />
                View Enquiry
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="services-section">
          <p className="menu-title">Logout</p>
          <ul className="services-list">
           <li onClick={handleLogout} className="service-item logout-btn">
  <LogOut className="menu-icon" />
  Logout Now?
</li>

          </ul>
        </div>

        <div className="footer">© 2025 Karthik Security</div>
      </div>
    </div>
  );
}

export default Sidebar;
