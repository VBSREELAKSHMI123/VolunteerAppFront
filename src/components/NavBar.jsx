import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">Volunteer_Connect</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/lhome">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/rhome">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
