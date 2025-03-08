import React, { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/view-jobs");
      setJobs(response.data.data);
    } catch (err) {
      setError("Failed to fetch job listings");
    } finally {
      setLoading(false);
    }
  };

  const verifyJob = async (jobId) => {
    try {
      await axios.patch(`http://localhost:8080/status-change/${jobId}`, { status: "verified" });
      fetchJobs();
      alert("Job verified successfully!");
    } catch (err) {
      alert("Failed to verify the job.");
    }
  };

  const styles = {
    container: {
      width: "100%",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      color: "#333",
      marginBottom: "20px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderLeft: "5px solid #007bff",
      transition: "transform 0.2s ease-in-out",
    },
    verifyButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    verifiedButton: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading jobs...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Job Listings</h2>
      {jobs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No jobs found.</p>
      ) : (
        <div style={styles.grid}>
          {jobs.map((job) => (
            <div key={job._id} style={styles.card}>
              <h3>{job.title}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Duration:</strong> {job.duration}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Date:</strong> {new Date(job.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {job.status}</p>
              {job.assignedVolunteer && (
                <p><strong>Volunteer:</strong> {job.assignedVolunteer.name} ({job.assignedVolunteer.email})</p>
              )}
              <button
                style={job.status === "verified" ? { ...styles.verifyButton, ...styles.verifiedButton } : styles.verifyButton}
                onClick={() => verifyJob(job._id)}
                disabled={job.status === "verified"}
              >
                {job.status === "verified" ? "Verified" : "Verify"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
