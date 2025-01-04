import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RequestVolunteer = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    phone: "",
    duration: "",
    user_id: ""
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      setData((prevData) => ({
        ...prevData,
        user_id: userId
      }));
    }
  }, []);

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/addrequest", data)
      .then((response) => {
        if (response.data.status === "success") {
          alert("REQUESTED SUCCESSFULLY");
        } else {
          alert("REQUEST FAILED");
        }
      })
      .catch((error) => {
        console.error('Error making request:', error);
        alert("REQUEST FAILED");
      });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Request for Trainee</h2>
        <form onSubmit={readValue}>
          <div className="mb-3">
            <label className="form-label">Organization Name</label>
            <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Description</label>
            <input type="text" className="form-control" name="description" value={data.description} onChange={inputHandler} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" name="phone" value={data.phone} onChange={inputHandler} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Duration</label>
            <input type="text" className="form-control" name="duration" value={data.duration} onChange={inputHandler} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestVolunteer;
