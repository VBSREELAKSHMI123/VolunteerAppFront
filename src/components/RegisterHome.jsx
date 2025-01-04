import React from 'react';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';

const RegisterHome = () => {
  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <NavBar />
      <div
        style={{
          padding: '40px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#333', fontWeight: 'bold', marginBottom: '20px' }}>
          Register as
        </h2>
        <div className="d-grid gap-3 col-md-6 mx-auto">
          <Link
            className="btn btn-lg btn-primary"
            style={{
              padding: '15px 20px',
              fontSize: '1.25rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease-in-out',
            }}
            to={'/uregister'}
          >
            User
          </Link>
          <Link
            className="btn btn-lg btn-success"
            style={{
              padding: '15px 20px',
              fontSize: '1.25rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease-in-out',
            }}
            to={'/vregister'}
          >
            Volunteer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterHome;
