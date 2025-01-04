import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newJobName, setNewJobName] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/updatejobview');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Add new job
  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/addjob', { name: newJobName });
      if (response.data.status === 'success') {
        fetchJobs(); // Refresh job list
        setNewJobName(''); // Clear input
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  // Search job by name
  const handleSearchJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/jsearch', { name: searchTerm });
      setJobs(response.data); // Display search results
    } catch (error) {
      console.error('Error searching job:', error);
    }
  };

  // Delete job
  const handleDeleteJob = async (id) => {
    try {
      const response = await axios.post('http://localhost:8080/jdelete', { _id: id });
      if (response.data.status === 'deleted') {
        fetchJobs(); // Refresh job list
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>Job Management</h1>

      {/* Add Job Form */}
      <form onSubmit={handleAddJob} style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
        <h2 style={{ color: '#4A90E2' }}>Add New Job</h2>
        <input
          type="text"
          placeholder="Job Name"
          value={newJobName}
          onChange={(e) => setNewJobName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px 20px', color: '#fff', backgroundColor: '#4A90E2', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Job
        </button>
      </form>

      {/* Search Job Form */}
      <form onSubmit={handleSearchJob} style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '60%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px 20px', color: '#fff', backgroundColor: '#4A90E2', border: 'none', borderRadius: '4px', marginLeft: '10px', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      {/* Job List */}
      <h2 style={{ color: '#4A90E2', textAlign: 'center' }}>Job List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map((job) => (
          <li key={job._id} style={{ marginBottom: '15px', padding: '10px', background: '#f2f2f2', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#333' }}>{job.name}</span>
            <button onClick={() => handleDeleteJob(job._id)} style={{ padding: '5px 10px', color: '#fff', backgroundColor: '#E94E77', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
