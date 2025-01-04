import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from './NavBar';
import { useNavigate } from 'react-router-dom';

const VolunteerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volunteerDetails, setVolunteerDetails] = useState({});
  const [available, setAvailable] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const _id = sessionStorage.getItem('_id');
    const token = sessionStorage.getItem('token');
  
    if (_id && token) {
      // Fetch assigned jobs for the volunteer
      axios
        .get(`http://localhost:8080/jview/${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.length > 0) {
            setJobs(response.data);
  
            // Extract job titles and show in alert
            const jobTitles = response.data.map(job => job.title).join(', ');
            alert(`New job(s) assigned to you: ${jobTitles}`);
          } else {
            setError('No approved jobs found for this volunteer.');
          }
        })
        .catch(() => {
          setError('Failed to fetch jobs.');
        });
  
      // Fetch volunteer details
      axios
        .get(`http://localhost:8080/volunteer/${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setVolunteerDetails(response.data.volunteer);
          setAvailable(response.data.volunteer.available);
        })
        .catch(() => {
          setError('Failed to fetch volunteer details.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('Volunteer ID or token not found.');
      setLoading(false);
    }
  }, []);
  
  

  const toggleAvailability = () => {
    const _id = sessionStorage.getItem('_id');
    const token = sessionStorage.getItem('token');

    axios
      .put(
        `http://localhost:8080/update-availability/${_id}`,
        { available: !available },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        if (response.data.status === 'success') {
          setAvailable(!available);
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => {
        setError('Failed to update availability status.');
      });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('volunteer_name');
    navigate('/vlogin');
  };

  const deleteAccount = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmDelete) {
      const _id = sessionStorage.getItem('_id');
      axios
        .post('http://localhost:8080/vdelete', { _id })
        .then((response) => {
          if (response.data.status === 'deleted') {
            sessionStorage.clear();
            navigate('/vlogin');
          } else {
            setError('Failed to delete account.');
          }
        })
        .catch(() => {
          setError('Failed to delete account.');
        });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const acceptJob = (jobId) => {
    const _id = sessionStorage.getItem('_id');
    const token = sessionStorage.getItem('token');

    axios
      .put(
        `http://localhost:8080/accept-job/${jobId}`,
        { volunteerId: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        if (response.data.status === 'success') {
          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId
                ? { ...job, accepted: true, rejected: false }
                : job
            )
          );
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => {
        setError('Failed to accept job.');
      });
  };

  const rejectJob = (jobId) => {
    const _id = sessionStorage.getItem('_id');
    const token = sessionStorage.getItem('token');

    axios
      .put(
        `http://localhost:8080/reject-job/${jobId}`,
        { volunteerId: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        if (response.data.status === 'success') {
          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId
                ? { ...job, accepted: false, rejected: true }
                : job
            )
          );
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => {
        setError('Failed to reject job.');
      });
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #f0f4c3, #81c784)',
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={() => setShowDetails(!showDetails)} // Toggle visibility
          >
            {showDetails ? 'Hide Details' : 'Profile'}
          </button>

          {showDetails && (
            <div
              style={{
                border: '2px solid #ccc',
                padding: '15px',
                borderRadius: '10px',
                marginTop: '15px',
                textAlign: 'left',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                background: '#ffffff',
              }}
            >
              <h2>Welcome, {volunteerDetails.name}</h2>
              <p><strong>Email:</strong> {volunteerDetails.email}</p>
              <p><strong>Phone:</strong> {volunteerDetails.phone}</p>
              <p><strong>Address:</strong> {volunteerDetails.address}</p>
              <p><strong>Skill:</strong> {volunteerDetails.skill}</p>
              <p><strong>Age:</strong> {volunteerDetails.age}</p>
              <p><strong>Gender:</strong> {volunteerDetails.gender}</p>
              <p><strong>Certificate:</strong> {volunteerDetails.certificate}</p>
              <p><strong>Verified:</strong> {volunteerDetails.verified ? 'Yes' : 'No'}</p>
            </div>
          )}

          <div style={{ marginTop: '15px' }}>
            <button
              className={`btn ${available ? 'btn-success' : 'btn-secondary'} w-100 mb-2`}
              onClick={toggleAvailability}
            >
              {available ? 'Available' : 'Unavailable'}
            </button>

            <button
              className="btn btn-danger w-100"
              onClick={deleteAccount}
            >
              Delete My Account
            </button>
          </div>
        </div>

        <div style={{ width: '65%' }}>
          <center>
            <h2>Your Assigned Jobs</h2>
          </center>
          <br />
          <div className="container">
            {loading ? (
              <p>Loading jobs...</p>
            ) : error ? (
              <p>{error}</p>
            ) : jobs.length > 0 ? (
              <div className="row">
                {jobs.map((job) => (
                  <div key={job._id} className="col-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text">Description: {job.description}</p>
                        <p className="card-text">Duration: {job.duration}</p>
                        <p className="card-text">Location: {job.location}</p>
                        <p className="card-text">Joining Date: {job.date}</p>
                        <p className="card-text">
                          Created At: {formatDate(job.createdAt)}
                        </p>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-primary"
                            onClick={() => acceptJob(job._id)}
                            disabled={job.accepted || job.rejected}
                          >
                            {job.accepted ? 'Accepted' : 'Accept'}
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => rejectJob(job._id)}
                            disabled={job.accepted || job.rejected}
                          >
                            {job.rejected ? 'Rejected' : 'Reject'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No jobs assigned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
