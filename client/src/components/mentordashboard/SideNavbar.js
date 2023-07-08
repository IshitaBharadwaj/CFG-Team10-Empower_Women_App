import React from 'react';
import './SideNavbar.css'; // Import the CSS file for styling

const SideNavbar = () => {
  return (
    <div className="side-nav">
      <ul>
        <li>Dashboard</li>
        <li>Studly Modules</li>
        <li>Calender</li>
        <li>Feedback Form</li>
        <li>Sign Out</li>
      </ul>
    </div>
  );
};

export default SideNavbar;