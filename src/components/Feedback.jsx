import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8080/feedbacks'); // Create this endpoint to fetch all feedback
        if (response.data.status === 'success') {
          setFeedbackList(response.data.feedback);
        } else {
          console.error('No feedback found.');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Feedback</h2>
      {feedbackList.length > 0 ? (
        feedbackList.map((feedback) => (
          <div key={feedback._id} style={styles.card}>
            <div style={styles.cardBody}>
              <h5 style={styles.cardTitle}>{feedback.user_name}</h5>
              <p style={styles.cardText}>{feedback.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={styles.noFeedback}>No feedback submitted yet.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f4f6f8',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardBody: {
    padding: '10px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  cardText: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.5',
  },
  noFeedback: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#888',
  },
};

export default Feedback;
