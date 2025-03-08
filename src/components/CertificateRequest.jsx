import React, { useEffect, useState } from "react";
import axios from "axios";

const CertificateRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/view-certificate");
      setRequests(response.data.data);
    } catch (err) {
      setError("Failed to fetch certificate requests");
    } finally {
      setLoading(false);
    }
  };

  const verifyCertificate = async (job) => {
    try {
      await axios.patch(`http://localhost:8080/status-change/${job?._JobId}`, { status : "verified"});

      // Refresh the requests after verification
      fetchRequests();

      alert("Certificate verified successfully!");
    } catch (err) {
      alert("Failed to verify the certificate.");
      console.error(err);
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
    noRequests: {
      textAlign: "center",
      color: "#777",
      fontSize: "18px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      width: "100%",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderLeft: "5px solid #007bff",
      width: "100%",
      transition: "transform 0.2s ease-in-out",
    },
    cardHover: {
      transform: "translateY(-5px)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#444",
    },
    cardText: {
      fontSize: "16px",
      color: "#666",
      marginBottom: "10px",
    },
    verifyButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background 0.2s",
    },
    verifiedButton: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "bold",
    },
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    loader: {
      border: "5px solid #f3f3f3",
      borderTop: "5px solid #007bff",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      animation: "spin 1s linear infinite",
    },
    spinAnimation: `@keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`,
  };

  if (loading)
    return (
      <div style={styles.loaderContainer}>
        <style>{styles.spinAnimation}</style>
        <div style={styles.loader}></div>
      </div>
    );

  if (error) return <p style={styles.errorMessage}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Certificate Requests</h2>

      {requests.length === 0 ? (
        <p style={styles.noRequests}>No certificate requests found.</p>
      ) : (
        <div style={styles.grid}>
          {requests.map((request) => (
            <div
              key={request._id}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h3 style={styles.cardTitle}>{request.title}</h3>
              <p style={styles.cardText}><strong>Description:</strong> {request.description}</p>
              <p style={styles.cardText}><strong>Duration:</strong> {request.duration}</p>
              <p style={styles.cardText}><strong>Location:</strong> {request.location}</p>
              <p style={styles.cardText}><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
              <p style={styles.cardText}><strong>Status:</strong> {request.status}</p>
              <button
                style={request.status === "verified" ? { ...styles.verifyButton, ...styles.verifiedButton } : styles.verifyButton}
                onClick={() => verifyCertificate(request._id, "verified")}
                disabled={request.status === "verified"}
              >
                {request.status === "verified" ? "Verified" : "Verify"}
              </button>


            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateRequest;
