import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>מערכת שיבוץ חדרים</h2>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">מסך הבית</Link>
        </li>
        <li className={location.pathname === '/rooms' ? 'active' : ''}>
          <Link to="/rooms">ניהול חדרים</Link>
        </li>
        <li className={location.pathname === '/scheduling' ? 'active' : ''}>
          <Link to="/scheduling">שיבוץ חדר</Link>
        </li>
        <li className={location.pathname === '/requests' ? 'active' : ''}>
          <Link to="/requests">בקשות ממתינות</Link>
        </li>
      </ul>
      <div className="navbar-user">
        <span>שלום, מנהלת מערכת</span>
      </div>
    </nav>
  );
};

export default Navbar;