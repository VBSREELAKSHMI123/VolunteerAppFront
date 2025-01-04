import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [requests, setRequests] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [showAvailableJobs, setShowAvailableJobs] = useState(false);
  
  const userId = sessionStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('user_name');
    const storedUserEmail = sessionStorage.getItem('email');
    const storedUserPhone = sessionStorage.getItem('phone');
    const storedUserAddress = sessionStorage.getItem('address');

    if (storedUserName) {
      setUserName(storedUserName);
      setWelcomeMessage(`Welcome, ${storedUserName}!`);
    }
    setUserEmail(storedUserEmail);
    setUserPhone(storedUserPhone);
    setUserAddress(storedUserAddress);
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/requests/user/${userId}`);
        if (response.data.status === 'success') {
          setRequests(response.data.requests);
        } else {
          console.error('No requests found for this user');
        }
      } catch (error) {
        console.error('Error fetching requests', error);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/ulogin');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await axios.post('http://localhost:8080/udelete', { _id: userId });
        if (response.data.status === 'deleted') {
          sessionStorage.clear();
          alert("Account deleted successfully.");
          navigate('/ulogin');
        } else {
          alert("Failed to delete the account.");
        }
      } catch (error) {
        console.error('Error deleting account', error);
        alert("Error occurred while deleting the account.");
      }
    }
  };

  const handleFeedback = async () => {
    const content = prompt('Please provide your feedback:');
    if (content) {
      const feedbackData = {
        user_name: userName,
        user_id: userId,
        content,
      };

      try {
        const response = await axios.post('http://localhost:8080/submit-feedback', feedbackData);
        if (response.data.status === 'success') {
          alert('Feedback submitted successfully!');
        } else {
          alert('Failed to submit feedback. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred while submitting your feedback.');
      }
    }
  };

  const handleViewAvailableJobs = async () => {
    if (!showAvailableJobs) {
      try {
        const response = await axios.get('http://localhost:8080/updatejobview');
        if (response.data) {
          setAvailableJobs(response.data);
        } else {
          alert('No available job roles at the moment.');
        }
      } catch (error) {
        console.error('Error fetching available jobs:', error);
      }
    }
    setShowAvailableJobs(!showAvailableJobs);
  };

  return (
    <div style={{ 
      backgroundColor: '#e9ecef', // Light gray background color
      padding: '20px', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>User Dashboard</h2>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'row' 
      }}>
        <div style={{ 
          flex: 1, 
          marginRight: '20px',
          backgroundColor: '#f8f9fa', // Set the same background color as VolunteerDashboard
          borderRadius: '10px',
          padding: '20px'
        }}>
          {welcomeMessage && (
            <div className="alert alert-info text-center" style={{ fontSize: '1.2rem' }}>
              {welcomeMessage}
            </div>
          )}

          <div className="card mb-4" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
            <div className="card-body">
              <h5 className="card-title">User Details</h5>
              <p className="card-text"><strong>Name:</strong> {userName}</p>
              <p className="card-text"><strong>Email:</strong> {userEmail}</p>
              <p className="card-text"><strong>Phone:</strong> {userPhone}</p>
              <p className="card-text"><strong>Address:</strong> {userAddress}</p>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Link className="btn btn-secondary btn-block" to={'/vrequest'}>
              Request
            </Link>
            <button className="btn btn-danger btn-block" onClick={handleDeleteAccount}>
              Delete My Account
            </button>
            <button className="btn btn-info btn-block" onClick={handleFeedback}>
              Feedback
            </button>
            <button className="btn btn-primary btn-block" onClick={handleViewAvailableJobs}>
              Available Job Roles
            </button>
          </div>

          {/* Available Job Roles List */}
          {showAvailableJobs && (
            <div className="card mt-3" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
              <div className="card-body">
                <h5 className="card-title">Available Job Roles</h5>
                {availableJobs.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {availableJobs.map((job) => (
                      <li key={job._id} className="list-group-item" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px', margin: '5px 0' }}>
                        {job.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No job roles available.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ 
          flex: 2, 
          backgroundColor: '#f8f9fa', // Set the same background color as VolunteerDashboard
          borderRadius: '10px',
          padding: '20px'
        }}>
          <h5>Your Requests:</h5>
          {requests.length > 0 ? (
            requests.map((request) => (
              <div key={request._id} className="card mb-2" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', backgroundColor: '#fff' }}>
                <div className="card-body">
                  <h5 className="card-title">{request.name}</h5>
                  <p className="card-text">{request.description}</p>
                  <p className="card-text"><strong>Status:</strong> {request.verified ? 'Verified' : 'Pending'}</p>
                  {request.verified && <p className="card-text text-success">{request.verificationMessage}</p>}
                </div>
              </div>
            ))
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
