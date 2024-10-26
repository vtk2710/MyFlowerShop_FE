/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './FeedbackManagement.scss';

// Mapping service quality numbers to their respective text labels
const serviceQualityLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
};

const FeedbackManagement = ({ feedbackList }) => {
  // useEffect để tự động cập nhật danh sách phản hồi từ localStorage
  useEffect(() => {
    const savedFeedback = localStorage.getItem('feedbackList');
    if (savedFeedback) {
      setFeedbackList(JSON.parse(savedFeedback));
    }
  }, []);

  const [feedbackListState, setFeedbackList] = useState(feedbackList || []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating', render: (rating) => (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={star <= rating ? "star selected" : "star"}
          />
        ))}
      </div>
    )},
    { title: 'Time Delivery', dataIndex: 'timeDelivery', key: 'timeDelivery' },
    { 
      title: 'Service Quality', 
      dataIndex: 'serviceQuality', 
      key: 'serviceQuality',
      render: (serviceQuality) => serviceQualityLabels[serviceQuality]
    },
    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
  ];

  return (
    <div className="feedback-management">
      <h2>Manage Feedback</h2>
      <Table
        columns={columns}
        dataSource={feedbackListState}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default FeedbackManagement;
