import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';

const ViewVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  // State for search query

  // Fetch all volunteers from the backend
  const fetchVolunteers = () => {
    axios.get("http://localhost:8080/vview")
      .then((response) => {
        setVolunteers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching volunteers:", error);
      });
  };

  // Fetch volunteers based on the search query
  const handleSearch = () => {
    axios.post("http://localhost:8080/vsearch", { name: searchQuery })
      .then((response) => {
        setVolunteers(response.data);  // Update volunteer list based on search results
      })
      .catch((error) => {
        console.error("Error searching volunteers:", error);
      });
  };

  // View certificate (display the certificate image)
  const handleViewCertificate = (certificatePath, volunteerId, verified) => {
    setSelectedCertificate(certificatePath);
    setSelectedVolunteerId(volunteerId);
    setIsVerified(verified);
  };

  // Verify the volunteer certificate
  const handleVerify = () => {
    if (selectedVolunteerId) {
      axios.post(`http://localhost:8080/verify-volunteer/${selectedVolunteerId}`)
        .then((response) => {
          if (response.data.status === 'success') {
            setIsVerified(true);
            alert('Volunteer verified successfully!');
            fetchVolunteers();  // Refresh the volunteers list
          }
        })
        .catch((error) => {
          console.error("Error verifying volunteer:", error);
          alert('Error verifying volunteer');
        });
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <div>
      <NavBar />
      <br />
      <center><h2><b>VOLUNTEERS</b></h2></center>

      {/* Search Bar */}
      <div className="container my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by volunteer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>
      </div>

      <div className="container">
        <div className="row">
          {volunteers.map((volunteer) => (
            <div className="col-md-4" key={volunteer._id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{volunteer.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {volunteer.email}</p>
                  <p className="card-text"><strong>Address:</strong> {volunteer.address}</p>
                  <p className="card-text"><strong>Skill:</strong> {volunteer.skill}</p>
                  <p className="card-text"><strong>Age:</strong> {volunteer.age}</p>
                  <p className="card-text"><strong>Gender:</strong> {volunteer.gender}</p>
                  <p className="card-text"><strong>Phone:</strong> {volunteer.phone}</p>

                  {/* Display verified status */}
                  {volunteer.verified && <p className="text-success">Verified ✅</p>}
                  
                  {/* Display availability status attractively */}
                  <p className={`card-text ${volunteer.available ? 'text-success' : 'text-danger'}`}>
                    <strong>Availability:</strong> {volunteer.available ? 'Available 🟢' : 'Unavailable 🔴'}
                  </p>

                  {/* Button to view certificate */}
                  <button 
                    className="btn btn-success" 
                    onClick={() => handleViewCertificate(volunteer.certificate, volunteer._id, volunteer.verified)}
                  >
                    View Certificate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal to display the certificate */}
        {selectedCertificate && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Certificate</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSelectedCertificate(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <img 
                    src={`http://localhost:8080/images/${selectedCertificate}`} 
                    alt="Certificate" 
                    className="img-fluid"
                  />
                </div>
                <div className="modal-footer">
                  {!isVerified && (
                    <button className="btn btn-success" onClick={handleVerify}>
                      Validate Certificate
                    </button>
                  )}
                  <button className="btn btn-secondary" onClick={() => setSelectedCertificate(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewVolunteer;
