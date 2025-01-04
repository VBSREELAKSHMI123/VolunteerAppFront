import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from './NavBar';

const AssignJob = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    assignedVolunteer: '', // This will store the selected volunteer's _id
    duration: '',
    location: '',
    date: ''
  });
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch list of volunteers when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/vview')
      .then(response => {
        const availableVolunteers = response.data.filter(volunteer => volunteer.available); // Filter only available volunteers
        setVolunteers(availableVolunteers);
      })
      .catch(error => {
        console.error("Error fetching volunteers:", error);
        setError('Failed to load volunteers.');
      });
  }, []);

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitJob = () => {
    if (!data.assignedVolunteer) {
      alert('Please select a volunteer.');
      return;
    }

    axios.post('http://localhost:8080/assignjob', data)
      .then(response => {
        if (response.data.status === 'success') {
          alert('Job assigned successfully.');
          
          // Notify VolunteerDashboard about the new job assignment
          window.postMessage({ type: 'NEW_JOB', title: data.title }, "*");
        } else {
          alert('Failed to assign job');
        }
      })
      .catch(error => {
        console.error('Error assigning job:', error);
        setError('Failed to assign job.');
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Assign Job to Volunteer</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4 shadow-sm">
              <div className="form-group mb-3">
                <label>Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="title" 
                  value={data.title} 
                  onChange={inputHandler} 
                />
              </div>
              <div className="form-group mb-3">
                <label>Description</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="description" 
                  value={data.description} 
                  onChange={inputHandler} 
                />
              </div>
              <div className="form-group mb-3">
                <label>Duration</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="duration" 
                  value={data.duration} 
                  onChange={inputHandler} 
                />
              </div>
              <div className="form-group mb-3">
                <label>Volunteer</label>
                <select 
                  className="form-control" 
                  name="assignedVolunteer" 
                  value={data.assignedVolunteer} 
                  onChange={inputHandler}
                >
                  <option value="">Select Volunteer</option>
                  {volunteers.map((volunteer) => (
                    <option key={volunteer._id} value={volunteer._id}>
                      {volunteer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Location</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="location" 
                  value={data.location} 
                  onChange={inputHandler} 
                />
              </div>
              <div className="form-group mb-4">
                <label>Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="date" 
                  value={data.date} 
                  onChange={inputHandler} 
                />
              </div>
              <button className="btn btn-success btn-block" onClick={submitJob}>
                Assign Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignJob;
