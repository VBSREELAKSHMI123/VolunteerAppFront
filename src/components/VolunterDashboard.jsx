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
  const _id = sessionStorage.getItem('_id');
  const token = sessionStorage.getItem('token');

  console.log(jobs);


  const fetchJob = async () => {
    console.log("test");

    try {
      if (_id && token) {
        // Fetch assigned jobs for the volunteer
        const res = await axios
          .get(`http://localhost:8080/jview/${_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })

        if (res.data.length > 0) {
          setJobs(res.data);
          const jobTitles = res.data.map(job => job.title).join(', ');
          // alert(`New job(s) assigned to you: ${jobTitles}`);
        } else {
          setError('No approved jobs found for this volunteer.');
        }
        setLoading(false)
      }
    } catch (err) {
      console.log(err);

    }
  }

  const fetchVolunteerDetails = async () => {
    try {
      const res = await axios
        .get(`http://localhost:8080/volunteer/${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

      if (res) {
        setVolunteerDetails(res.data.volunteer);
        setAvailable(res.data.volunteer.available);
        setLoading(false)
      } else {
        setError('Failed to fetch volunteer details.');
      }
    } catch (err) {
      console.log(err);
      setError('Volunteer ID or token not found.');

    }
  }

  useEffect(() => {
    fetchJob()
    // Fetch volunteer details
    fetchVolunteerDetails()

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
          console.log(response);
          fetchJob()
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

  const handleRequest = (job) => {
    switch (job.status) {
      case "request":
        requestCer(job)
        break;
      case "pending":
        alert("Waiting")

        break;
      case "verified":
        alert("verified certificate")
        break;
      default:
        break;
    }
  }


  const requestCer = async (job) => {

    const volunteerId = sessionStorage.getItem('_id');

    if (!job || !job._id) {
      console.log("Invalid job data:", job);
      alert("Invalid job data. Cannot request a certificate.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/request-certificate", { volunteerId, job })
      console.log(res);

      if (res.data.status === "success") {
        console.log("Response received:", res.data);
        JobUpdate(job)
      }
    } catch (err) {
      console.log(err);

    }
  }

  const JobUpdate = async (job) => {
    console.log(job);
    try {
      const res = await axios.patch(`http://localhost:8080/status-change/${job?._id}`, { status:"pending" })

      console.log(res);
      
      if (res.data.status === "success") {
        await fetchJob()
      }
    } catch (err) {
        console.log(err);
        
    }
  }


  const requestCertificate = (job) => {
    console.log("Button clicked! Job data:", job);

    const volunteerId = sessionStorage.getItem('_id');

    if (!job || !job._id) {
      console.log("Invalid job data:", job);
      alert("Invalid job data. Cannot request a certificate.");
      return;
    }

    axios.post(`http://localhost:8080/request-certificate`, { volunteerId, job })
      .then((response) => {
        console.log("Response received:", response.data);



        // Extract status from response, fallback to "request" if not provided
        // const updatedStatus = response.data.certificateStatus || "request";

        console.log("res", response.data.certificateStatus);


        // console.log("Updated status from backend:", updatedStatus);

        // switch (updatedStatus) {
        //   case "request":
        //     alert(response.data.message || 'Certificate request sent successfully!');
        //     break;
        //   case "pending":
        //     alert("Request is pending");
        //     break;
        //   case "verified":
        //     alert("Certificate already verified");
        //     break;
        //   default:
        //     console.log("Unexpected status:", updatedStatus);
        //     break;
        // }

        // // Update the job status in the UI
        // setJobs((prevJobs) =>
        //   prevJobs.map((j) =>
        //     j._id === job._id ? { ...j, status: updatedStatus, certificateRequested: true } : j
        //   )
        // );
      })
      .catch((error) => {
        console.error("Certificate Request Error:", error.response?.data || error);
        alert('Failed to request certificate.');
      });
  };



  console.log(jobs);



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
                            disabled={job.accepted || job.rejected}>
                            {job.rejected ? 'Rejected' : 'Reject'}
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              handleRequest(job)
                              console.log(job);

                            }}
                          >
                            {job.status === "verified"
                              ? "Download Certificate"
                              : job.status === "request"
                                ? "Requested Certificate"
                                : "Pending"}
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
