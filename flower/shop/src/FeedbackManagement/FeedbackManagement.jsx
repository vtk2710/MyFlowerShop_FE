import { useState } from 'react';
import './FeedbackManagement.scss';

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([
    { id: 1, customer: 'John Doe', comment: 'I was impressed with the quick delivery service. The flowers arrived on time and in perfect condition. I will definitely order again!', responded: false },
    { id: 2, customer: 'Jane Smith', comment: 'I appreciate the customization options available. The personalized bouquet was exactly what I wanted for my wedding day!', responded: false },
    { id: 3, customer: 'Noah Moore', comment: 'The prices are reasonable compared to other flower shops, and the quality is exceptional. Highly recommend!', responded: false },
    { id: 4, customer: 'Isabella Taylor', comment: 'I received a bouquet as a gift, and I was blown away by how long the flowers lasted. They stayed vibrant for over a week!', responded: false },
    { id: 5, customer: 'Mia Thomas', comment: 'Customer service was very helpful when I had questions about my order. They responded quickly and were very friendly.', responded: false },
  ]);

  const respondToFeedback = (id) => {
    setFeedback((prevFeedback) =>
      prevFeedback.map((fb) =>
        fb.id === id ? { ...fb, responded: true } : fb
      )
    );
  };

  return (
    <div className="feedback-management">
      <h2>Manage Feedback</h2>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((fb) => (
            <tr key={fb.id}>
              <td>{fb.customer}</td>
              <td>{fb.comment}</td>
              <td>{fb.responded ? 'Responded' : 'Not Responded'}</td>
              <td>
                <button
                  onClick={() => respondToFeedback(fb.id)}
                  disabled={fb.responded} // Disable button if already responded
                >
                  {fb.responded ? 'Responded' : 'Respond'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackManagement;
