import React from 'react';
import './Header.css';
import { Bell, Mail, Search, Menu } from 'lucide-react';

function Header({ onHamburgerClick }) {
  return (
    <div className="header-container">
      <div className="header-left">
        {/* Hamburger for mobile */}
        <button className="hamburger" onClick={onHamburgerClick}>
          <Menu size={24} />
        </button>
        <div className='welcome'>
          <h2>Dashboard</h2>
          <p>Welcome back</p>
        </div>
      </div>
      <div className="header-right">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search" />
        </div>
        <Bell className="icon" size={20} />
        <Mail className="icon" size={20} />
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="profile-pic"
        />
      </div>
    </div>
  );
}

export default Header;
