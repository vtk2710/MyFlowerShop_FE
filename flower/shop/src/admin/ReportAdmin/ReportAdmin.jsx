import { useState } from "react";
import { Table, Tag, Button, Modal, message } from "antd";

// Dữ liệu báo cáo giả lập
const initialReports = [
  {
    key: "1",
    username: "Nguyen Van A",
    email: "nguyenvana@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The lotus flowers were wilted when I received them, very poor quality.",
    status: "Not processed",
  },
  {
    key: "2",
    username: "Tran Thi B",
    email: "tranthib@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The flowers were delivered 3 hours later than the promised time.",
    status: "Not processed",
  },
  {
    key: "3",
    username: "Le Van C",
    email: "levanc@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The roses were crushed and didn't look like the advertised photos.",
    status: "Not processed",
  },
  {
    key: "4",
    username: "Pham Thi D",
    email: "phamthid@gmail.com",
    issueType: "Poor Feedback",
    description: "The shop delivered the wrong type of flowers I ordered.",
    status: "Not processed",
  },
  {
    key: "5",
    username: "Tran Van E",
    email: "tranvane@gmail.com",
    issueType: "Poor Feedback",
    description: "The lilies had a strange smell and were not fresh.",
    status: "Not processed",
  },
  {
    key: "6",
    username: "Nguyen Thi F",
    email: "nguyenthif@gmail.com",
    issueType: "Poor Feedback",
    description:
      "Customer service was very slow when I requested to exchange flowers.",
    status: "Not processed",
  },
  {
    key: "7",
    username: "Do Van G",
    email: "dovang@gmail.com",
    issueType: "Poor Feedback",
    description: "The orchids delivered were wilted and had fallen petals.",
    status: "Not processed",
  },
  {
    key: "8",
    username: "Hoang Thi H",
    email: "hoangthih@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The wedding flowers were not as agreed upon, very disappointed.",
    status: "Not processed",
  },
  {
    key: "9",
    username: "Vu Van I",
    email: "vuvani@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The bouquet arrived with broken stems, and the quality was subpar.",
    status: "Not processed",
  },
  {
    key: "10",
    username: "Nguyen Van J",
    email: "nguyenvanj@gmail.com",
    issueType: "Poor Feedback",
    description: "I received sunflowers instead of the roses I ordered.",
    status: "Not processed",
  },
];

const ReportAdmin = () => {
  const [reports, setReports] = useState(initialReports); // Danh sách báo cáo
  const [selectedReport, setSelectedReport] = useState(null); // Báo cáo đang được chọn để xem chi tiết
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiện/ẩn modal

  // Hàm để mở modal và xem chi tiết báo cáo
  const viewReport = (record) => {
    setSelectedReport(record); // Đặt báo cáo được chọn
    setIsModalVisible(true); // Hiển thị modal
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false); // Ẩn modal
    setSelectedReport(null); // Xóa báo cáo được chọn
  };

  // Hàm đánh dấu báo cáo đã xử lý
  const markAsResolved = (key) => {
    const updatedReports = reports.map((report) =>
      report.key === key ? { ...report, status: "Processed" } : report
    );
    setReports(updatedReports); // Cập nhật danh sách báo cáo
    message.success("The report has been marked as processed.");
  };

  // Cột của bảng hiển thị báo cáo
  const columns = [
    {
      title: "Sender",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Issue Type",
      dataIndex: "issueType",
      key: "issueType",
    },
    {
      title: "Description",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đã xử lý" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => viewReport(record)}>
            View Details
          </Button>
          <Button
            type="link"
            onClick={() => markAsResolved(record.key)}
            disabled={record.status === "Processed"}
          >
            Mark as Processed
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Manage reports from users</h1>
      <Table columns={columns} dataSource={reports} pagination={false} />

      {/* Modal để hiển thị chi tiết báo cáo */}
      {selectedReport && (
        <Modal
          title="Chi tiết báo cáo"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Đóng
            </Button>,
          ]}
        >
          <p>
            <strong>Sender:</strong> {selectedReport.username}
          </p>
          <p>
            <strong>Email:</strong> {selectedReport.email}
          </p>
          <p>
            <strong>Issue Type:</strong> {selectedReport.issueType}
          </p>
          <p>
            <strong>Description:</strong> {selectedReport.description}
          </p>
          <p>
            <strong>Status:</strong> {selectedReport.status}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default ReportAdmin;
