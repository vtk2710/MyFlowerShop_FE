import { useLocation, useNavigate } from 'react-router-dom';
import './FeedbackPage.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

const FeedbackPage = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const navigate = useNavigate();
    const [rating, setRating] = useState(0); 
    const [comment, setComment] = useState(''); 
    const [userName, setUserName] = useState(''); 

    if (!order) {
        return <p>No order data available.</p>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedbackData = {
            customer: userName, 
            comment: comment,
            responded: false,
        };

        navigate('/seller', { state: { activeSection: 'feedback', feedback: feedbackData } });
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    return (
        <div className="feedback-page-wrapper">
            <div className="feedback-container">
                <h2>Feedback Page</h2>
                <div className="order-summary">
                    <div className="order-image">
                        <img src={order.imageUrl} alt={order.productName} />
                    </div>
                    <div className="order-details">
                        <h3>{order.shopName}</h3>
                        <p><strong>Date:</strong> {order.date}</p>
                        <p><strong>Flower:</strong> {order.productName}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <p><strong>Total:</strong> {order.total.toLocaleString()} VND</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User Name:</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} 
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faStar} /> Rating:
                        </label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FontAwesomeIcon
                                    key={star}
                                    icon={faStar}
                                    className={star <= rating ? "star selected" : "star"}
                                    onClick={() => handleStarClick(star)} 
                                />
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faClock} /> Time of Delivery:
                        </label>
                        <select>
                            <option value="on-time">On Time</option>
                            <option value="late">Late</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faThumbsUp} /> Service Quality:
                        </label>
                        <select>
                            <option value={0}>Select Service Rating</option>
                            <option value={1}>1 - Poor</option>
                            <option value={2}>2 - Fair</option>
                            <option value={3}>3 - Good</option>
                            <option value={4}>4 - Very Good</option>
                            <option value={5}>5 - Excellent</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faComment} /> Comment:
                        </label>
                        <textarea
                            placeholder="Write your feedback here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faThumbsUp} /> Would you recommend this product?
                        </label>
                        <select>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
