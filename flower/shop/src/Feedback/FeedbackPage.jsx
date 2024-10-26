import { useLocation } from 'react-router-dom';
import './FeedbackPage.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { ProfileOutlined, PhoneOutlined, CalendarOutlined, EnvironmentOutlined, TruckOutlined, CreditCardOutlined, GiftOutlined, NumberOutlined, UserOutlined } from '@ant-design/icons';
import { notification, Modal, Button } from 'antd'; // Import notification and modal components

const FeedbackPage = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const [rating, setRating] = useState(0); 
    const [comment, setComment] = useState('');
    const [timeDelivery, setTimeDelivery] = useState('on-time'); // State to store Time of Delivery
    const [serviceQuality, setServiceQuality] = useState(0); // State to store Service Quality
    const [visibleModal, setVisibleModal] = useState(false); // State to control modal visibility

    if (!order) {
        return <p>No order data available.</p>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedbackData = {
            comment: comment,
            rating: rating,
            timeDelivery: timeDelivery, // Include Time of Delivery in feedback data
            serviceQuality: serviceQuality, // Include Service Quality in feedback data
            responded: false,
        };

        // Lưu phản hồi vào localStorage
        const savedFeedback = JSON.parse(localStorage.getItem('feedbackList')) || [];
        const newFeedback = [...savedFeedback, { id: savedFeedback.length + 1, ...feedbackData }];
        localStorage.setItem('feedbackList', JSON.stringify(newFeedback));

        // Hiển thị thông báo thành công
        notification.success({
            message: 'Feedback Submitted',
            description: 'Thank you for your feedback!',
            placement: 'topRight',
        });

        // Reset form sau khi submit
        setComment('');
        setRating(0);
        setTimeDelivery('on-time');
        setServiceQuality(0);
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    // Hàm mở modal chi tiết đơn hàng
    const handleViewDetailClick = () => {
        setVisibleModal(true); // Mở modal
    };

    const handleModalClose = () => {
        setVisibleModal(false); // Đóng modal
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
                        <h3><strong>Product:</strong> {order.productName}</h3>
                        <p><strong>Total:</strong> {order.total.toLocaleString()} VND</p>
                        {/* Thêm nút View Detail */}
                        <button className="view-detail-button" onClick={handleViewDetailClick}>
                            View Detail
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
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
                        <select value={timeDelivery} onChange={(e) => setTimeDelivery(e.target.value)}>
                            <option value="on-time">On Time</option>
                            <option value="late">Late</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            <FontAwesomeIcon icon={faThumbsUp} /> Service Quality:
                        </label>
                        <select value={serviceQuality} onChange={(e) => setServiceQuality(Number(e.target.value))}>
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

                {/* Modal hiển thị chi tiết đơn hàng */}
                <Modal
                    title="Order Details"
                    visible={visibleModal}
                    onCancel={handleModalClose}
                    footer={[
                        <Button key="close" onClick={handleModalClose}>Close</Button>
                    ]}
                >
                    {order && (
                        <div className="order-details-modal">
                            <img 
                                src={order.imageUrl} 
                                alt={order.productName} 
                                className="modal-image"
                            />
                            <div className="order-details-content">
                                <div className="order-details-column">
                                    <p><ProfileOutlined /> Order ID: {order.id}</p>
                                    <p><GiftOutlined /> Flower ID: {order.flowerId}</p>
                                    <p><UserOutlined /> Shop Name: {order.shopName}</p> {/* Thêm shop name */}
                                    <p><PhoneOutlined /> Phone Number: {order.phoneNumber}</p>
                                    <p><NumberOutlined /> Quantity: {order.quantity}</p> {/* Thêm quantity */}
                                </div>
                                <div className="order-details-column">
                                    <p><CreditCardOutlined /> Payment Method: {order.paymentMethod}</p>
                                    <p><TruckOutlined /> Delivery Method: {order.deliveryMethod}</p>
                                    <p><CalendarOutlined /> Created Date: {new Date(order.createdDate).toLocaleDateString()}</p>
                                    <p><EnvironmentOutlined /> Address: {order.address}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default FeedbackPage;
