import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [verifiedItems, setVerifiedItems] = useState({});
  const navigate = useNavigate();

  const fetchData = () => {
    axios.get("http://localhost:8080/rview")
      .then((response) => {
        setData(response.data);
        const verificationStatus = {};
        response.data.forEach((item, index) => {
          verificationStatus[index] = item.verified;
        });
        setVerifiedItems(verificationStatus);
      })
      .catch((error) => {
        console.error("Error in Display", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyClick = (index, itemId, userId) => {
    axios.post(`http://localhost:8080/verify/${itemId}`)
      .then((response) => {
        if (response.data.status === 'success') {
          setVerifiedItems((prevState) => ({
            ...prevState,
            [index]: true,
          }));

          const { verificationMessage, description } = response.data.updatedRequest;
          notifyUser(userId, verificationMessage, description);

          alert("Verification successful.");
        }
      })
      .catch((error) => {
        console.error("Error verifying item", error);
      });
  };

  const notifyUser = (userId, message, description) => {
    axios.post(`http://localhost:8080/notify/${userId}`, { message, description })
      .then(() => {
        console.log('User notified successfully');
      })
      .catch((error) => {
        console.error('Error notifying user', error);
      });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('admin_id');
    navigate('/alogin');
  };

  const cardStyle = {
    border: '2px solid #007bff', // Blue border for all cards
    borderRadius: '10px', // Rounded corners
    transition: 'box-shadow 0.3s ease', // Smooth shadow transition
    marginBottom: '15px', // Space between cards
    padding: '15px',
  };

  const verifiedCardStyle = {
    ...cardStyle,
    borderColor: 'green', // Green border for verified cards
    backgroundColor: '#e7f9e7', // Light green background
  };

  const unverifiedCardStyle = {
    ...cardStyle,
    borderColor: 'orange', // Orange border for unverified cards
    backgroundColor: '#fff3cd', // Light yellow background
  };

  return (
    <div className="container-fluid" style={{ position: 'relative', height: '100vh' }}>
      <NavBar />
      <br /><br />

      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row" style={{ height: '100%', overflow: 'hidden' }}>
        {/* Left Side: Buttons */}
        <div className="col-md-3" style={{ position: 'absolute', left: 0, top: 70, bottom: 0, overflowY: 'auto', padding: '10px', backgroundColor: '#f8f9fa', borderRight: '1px solid #ddd' }}>
          <h5 className="card-title">Admin Actions</h5>
          <div className="d-grid gap-2">
            <Link className="btn btn-secondary" to={'/search'}>SEARCH</Link>
            <Link className="btn btn-secondary" to={'/assignjob'}>Assign Job</Link>
            <Link className="btn btn-secondary" to={'/vvol'}>View Volunteer</Link>
            <Link className="btn btn-secondary" to={'/jobview'}>View Job</Link>
            <Link className="btn btn-secondary" to={'/jobs'}>Add Job</Link>
            <Link className="btn btn-secondary" to={'/feedback'}>View Feedback</Link>
            <Link className="btn btn-secondary" to={'/crequest'}>Certificate Request</Link>
          </div>
        </div>

        {/* Right Side: Card View */}
        <div className="col-md-9" style={{ position: 'absolute', right: 0, top: 70, bottom: 0, overflowY: 'auto', padding: '10px' }}>
          <h5>Requests for Verification:</h5>
          {data.map((value, index) => (
            <div
              className="card mb-3"
              key={index}
              style={verifiedItems[index] ? verifiedCardStyle : unverifiedCardStyle} // Apply conditional styles
            >
              <div className="card-body">
                <h5 className="card-title">{value.name}</h5>
                <p className="card-text">{value.description}</p>
                <p className="card-text"><strong>Phone:</strong> {value.phone}</p>
                <p className="card-text"><strong>Duration:</strong> {value.duration}</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleVerifyClick(index, value._id, value.user_id)}
                  disabled={verifiedItems[index]}
                >
                  Verify
                </button>
                {verifiedItems[index] && <span style={{ marginLeft: '10px', color: 'green' }}>✔ Verified</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
