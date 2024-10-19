/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Table, Button, notification } from 'antd';
import './FeedbackManagement.scss';

const FeedbackManagement = ({ feedback }) => {
  // Lấy dữ liệu từ localStorage nếu có, nếu không thì sử dụng mảng mặc định
  const [feedbackList, setFeedbackList] = useState(() => {
    const savedFeedback = localStorage.getItem('feedbackList');
    return savedFeedback ? JSON.parse(savedFeedback) : [
      { id: 1, customer: 'John Doe', comment: 'Great service!', responded: false },
      { id: 2, customer: 'Jane Smith', comment: 'Loved the flowers!', responded: false },
    ];
  });

  // useEffect để thêm phản hồi mới từ FeedbackPage mà không bị lặp lại
  useEffect(() => {
    if (feedback) {
      // Kiểm tra xem phản hồi đã tồn tại chưa, nếu chưa thì mới thêm
      const existingFeedback = feedbackList.find(fb => fb.comment === feedback.comment && fb.customer === feedback.customer);
      if (!existingFeedback) {
        const newFeedback = [...feedbackList, { id: feedbackList.length + 1, ...feedback }];
        setFeedbackList(newFeedback);
        localStorage.setItem('feedbackList', JSON.stringify(newFeedback)); // Lưu vào localStorage
      }
    }
  }, [feedback, feedbackList]);

  // Hàm phản hồi
  const respondToFeedback = (id) => {
    const updatedFeedbackList = feedbackList.map((fb) =>
      fb.id === id ? { ...fb, responded: true } : fb
    );
    setFeedbackList(updatedFeedbackList);
    localStorage.setItem('feedbackList', JSON.stringify(updatedFeedbackList)); // Cập nhật localStorage

    // Hiển thị thông báo khi phản hồi
    const customerName = feedbackList.find((fb) => fb.id === id).customer;
    notification.success({
      message: 'Response Sent',
      description: `You have successfully responded to ${customerName}'s feedback.`,
      placement: 'topRight',
    });
  };

  // Cấu hình cột trong bảng
  const columns = [
    { title: 'Customer Name', dataIndex: 'customer', key: 'customer' },
    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
    { title: 'Status', dataIndex: 'responded', key: 'responded', render: (responded) => (responded ? 'Responded' : 'Not Responded') },
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
        dataSource={feedbackList}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default FeedbackManagement;
