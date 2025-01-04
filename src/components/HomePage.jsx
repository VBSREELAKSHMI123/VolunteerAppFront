import React, { useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // Call useNavigate here

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = async (event) => {
    event.preventDefault();
    console.log(data);
    try {
      const response = await axios.post("http://localhost:8080/ulogin", data);
      console.log(response.data);
      if (response.data.status === "success") {
        // Store the token, user ID, user name, and other details
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user_id", response.data.user_id);
        sessionStorage.setItem("user_name", response.data.user_name);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("phone", response.data.phone);
        sessionStorage.setItem("address", response.data.address);

        // Navigate to UserDashboard
        navigate("/userdash");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="container-fluid p-0" style={{ marginTop: '0', height: '100vh' }}>
      <NavBar />
      <div className="row" style={{ height: '100%' }}>
        <div className="col-12">
          <div
            id="carouselExample"
            className="carousel slide"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              borderRadius: '0',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <div className="carousel-inner" style={{ height: '100%' }}>
              <div className="carousel-item active" style={{ height: '100%' }}>
                <img
                  src="globe.jpg"
                  className="d-block w-100"
                  alt="First slide"
                  style={{ height: '100%', objectFit: 'cover' }}
                />
                <div
                  className="login-box"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    maxWidth: '400px',
                    width: '100%',
                  }}
                >
                  <h2 className="text-center">User Login</h2>
                  <form onSubmit={readValue}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={inputHandler}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={inputHandler}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Login</button>
                  </form>
                </div>
              </div>
              {/* Other carousel items */}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
