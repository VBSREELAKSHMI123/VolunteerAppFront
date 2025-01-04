import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobView = () => {
  // State to hold job data
  const [jobs, setJobs] = useState([]);

  // Fetch jobs when component mounts
  useEffect(() => {
    axios.get("http://localhost:8080/jobview")
      .then((response) => {
        console.log('Jobs received:', response.data); // Log the response data
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    margin: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff'
  };

  const titleStyle = {
    fontSize: '20px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '10px',
  };

  const infoStyle = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  };

  return (
    <div style={{ padding: '20px' }}>
    <center><h1>Available Jobs</h1></center>  
      {jobs.length > 0 ? (
        <div>
          {jobs.map((job) => (
            <div key={job._id} style={cardStyle}>
              <h3 style={titleStyle}>{job.title}</h3>
              <p style={descriptionStyle}>{job.description}</p>
              <p style={infoStyle}><strong>Duration:</strong> {job.duration}</p>
              <p style={infoStyle}><strong>Location:</strong> {job.location}</p>
              <p style={infoStyle}><strong>Joining Date:</strong> {job.date}</p>
              <p style={infoStyle}><strong>Assigned Date:</strong> {formatDate(job.createdAt)}</p>
              {/* Display the assigned volunteer's name */}
              <p style={infoStyle}><strong>Assigned Volunteer:</strong> {job.assignedVolunteer ? job.assignedVolunteer.name : 'Not assigned'}</p>
              <p style={infoStyle}><strong>Status:</strong> {job.accepted ? 'Accepted' : job.rejected ? 'Rejected' : 'Pending'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default JobView;
