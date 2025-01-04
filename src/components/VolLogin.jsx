import React, { useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VolLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" }); // Clear the error for the field being updated
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const readValue = () => {
    if (!validateForm()) return; // Stop if validation fails

    axios.post("http://localhost:8080/vlogin", data).then(
      (response) => {
        if (response.data.status === "success") {
          // Store the token and volunteer details in sessionStorage
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("_id", response.data._id);
          sessionStorage.setItem("volunteer_name", response.data.volunteer_name);
          sessionStorage.setItem("volunteer_email", response.data.volunteer_email);
          sessionStorage.setItem("volunteer_phone", response.data.volunteer_phone);
          sessionStorage.setItem("volunteer_address", response.data.volunteer_address);
          sessionStorage.setItem("volunteer_skill", response.data.volunteer_skill);
          sessionStorage.setItem("volunteer_age", response.data.volunteer_age);
          sessionStorage.setItem("volunteer_gender", response.data.volunteer_gender);
          sessionStorage.setItem("volunteer_certificate", response.data.volunteer_certificate);
          sessionStorage.setItem("volunteer_verified", response.data.volunteer_verified);
          sessionStorage.setItem("volunteer_available", response.data.volunteer_available);
          // Navigate to the volunteer dashboard
          navigate("/voldash");
        } else {
          alert("Login Failed");
        }
      }
    ).catch((error) => {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    });
  };

  return (
    <div>
      <NavBar /><br />
      <div
        style={{
          height: '100vh',
          backgroundImage: `url('globe.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            width: '300px',
          }}
        >
          <h3 className="text-center"><b>VOLUNTEER LOGIN</b></h3>
          <br />
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name='email'
              value={data.email}
              onChange={inputHandler}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <br />
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name='password'
              value={data.password}
              onChange={inputHandler}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <br />
          <button className="btn btn-success w-100" onClick={readValue}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default VolLogin;
