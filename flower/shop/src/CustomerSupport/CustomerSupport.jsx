import { useState } from 'react';
import './CustomerSupport.scss';

const CustomerSupport = () => {
  const [customerQuestions, setCustomerQuestions] = useState([
    { id: 1, question: 'How do I track my order?', response: '', answered: false },
    { id: 2, question: 'What is your return policy?', response: '', answered: false },
    { id: 3, question: 'Can I customize a bouquet for a special occasion?', response: '', answered: false },
    { id: 4, question: 'Can I place a bulk order for an event?', response: '', answered: false },
    { id: 5, question: 'Can you recommend flowers for a wedding?', response: '', answered: false },
  ]);
  const [editingResponseId, setEditingResponseId] = useState(null);
  const [responseInput, setResponseInput] = useState('');

  const handleResponseChange = (id, response) => {
    if (editingResponseId === id) {
      // Nếu đang chỉnh sửa, lưu phản hồi
      setCustomerQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? { ...question, response, answered: true } : question
        )
      );
      setEditingResponseId(null);
      setResponseInput('');
    } else {
      // Bắt đầu chỉnh sửa phản hồi
      const question = customerQuestions.find((q) => q.id === id);
      setResponseInput(question.response);
      setEditingResponseId(id);
    }
  };

  return (
    <div className="customer-support">
      <h2>Manage Customer Questions</h2>
      <h3>Customer Questions</h3>
      <ul className="questions-list">
        {customerQuestions.map((question) => (
          <li key={question.id}>
            <p><strong>Q:</strong> {question.question}</p>
            {!question.answered ? (
              <div>
                <textarea
                  placeholder="Type your response..."
                  value={editingResponseId === question.id ? responseInput : ''}
                  onChange={(e) => setResponseInput(e.target.value)}
                />
                <button 
                  className="submit-response-button" 
                  onClick={() => handleResponseChange(question.id, responseInput)}
                >
                  {editingResponseId === question.id ? 'Submit Response' : 'Edit Response'}
                </button>
                {editingResponseId === question.id && (
                  <button className="cancel-button" onClick={() => {
                    setEditingResponseId(null);
                    setResponseInput('');
                  }}>
                    Cancel
                  </button>
                )}
              </div>
            ) : (
              <p><strong>A:</strong> {question.response}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerSupport;
