import { useState } from 'react';
import { Table, Button, notification } from 'antd';
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

    // Hiển thị thông báo khi phản hồi
    const customerName = feedback.find((fb) => fb.id === id).customer;
    notification.success({
      message: 'Response Sent',
      description: `You have successfully responded to ${customerName}'s feedback.`,
      placement: 'topRight',
    });
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Status',
      dataIndex: 'responded',
      key: 'responded',
      render: (responded) => (responded ? 'Responded' : 'Not Responded'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => respondToFeedback(record.id)}
          disabled={record.responded}
        >
          {record.responded ? 'Responded' : 'Respond'}
        </Button>
      ),
    },
  ];

  return (
    <div className="feedback-management">
      <h2>Manage Feedback</h2>
      <Table
        columns={columns}
        dataSource={feedback}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default FeedbackManagement;
