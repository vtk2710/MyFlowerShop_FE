/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Table, Tag, Button, Modal, message } from "antd";
import axios from "axios";

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
    createDate: "2024-10-01", // Ngày tạo báo cáo
    shopName: "Rose Boutique", // Tên cửa hàng bị báo cáo
    lastUpdateDate: "2024-10-03", // Lần cập nhật cuối cùng
  },
  {
    key: "2",
    username: "Tran Thi B",
    email: "tranthib@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The flowers were delivered 3 hours later than the promised time.",
    status: "Not processed",
    createDate: "2024-10-02",
    shopName: "Lily Garden",
    lastUpdateDate: "2024-10-04",
  },
  {
    key: "3",
    username: "Le Van C",
    email: "levanc@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The roses were crushed and didn't look like the advertised photos.",
    status: "Not processed",
    createDate: "2024-10-03",
    shopName: "Tulip Haven",
    lastUpdateDate: "2024-10-05",
  },
  {
    key: "4",
    username: "Pham Thi D",
    email: "phamthid@gmail.com",
    issueType: "Poor Feedback",
    description: "The shop delivered the wrong type of flowers I ordered.",
    status: "Not processed",
    createDate: "2024-10-04",
    shopName: "Daisy Fields",
    lastUpdateDate: "2024-10-06",
  },
  {
    key: "5",
    username: "Tran Van E",
    email: "tranvane@gmail.com",
    issueType: "Poor Feedback",
    description: "The lilies had a strange smell and were not fresh.",
    status: "Not processed",
    createDate: "2024-10-05",
    shopName: "Orchid Paradise",
    lastUpdateDate: "2024-10-07",
  },
  {
    key: "6",
    username: "Nguyen Thi F",
    email: "nguyenthif@gmail.com",
    issueType: "Poor Feedback",
    description:
      "Customer service was very slow when I requested to exchange flowers.",
    status: "Not processed",
    createDate: "2024-10-06",
    shopName: "Sunflower Express",
    lastUpdateDate: "2024-10-08",
  },
  {
    key: "7",
    username: "Do Van G",
    email: "dovang@gmail.com",
    issueType: "Poor Feedback",
    description: "The orchids delivered were wilted and had fallen petals.",
    status: "Not processed",
    createDate: "2024-10-07",
    shopName: "Lotus Harmony",
    lastUpdateDate: "2024-10-10",
  },
  {
    key: "8",
    username: "Hoang Thi H",
    email: "hoangthih@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The wedding flowers were not as agreed upon, very disappointed.",
    status: "Not processed",
    createDate: "2024-10-08",
    shopName: "Wedding Flora",
    lastUpdateDate: "2024-10-11",
  },
  {
    key: "9",
    username: "Vu Van I",
    email: "vuvani@gmail.com",
    issueType: "Poor Feedback",
    description:
      "The bouquet arrived with broken stems, and the quality was subpar.",
    status: "Not processed",
    createDate: "2024-10-09",
    shopName: "Blossom Dreams",
    lastUpdateDate: "2024-10-12",
  },
  {
    key: "10",
    username: "Nguyen Van J",
    email: "nguyenvanj@gmail.com",
    issueType: "Poor Feedback",
    description: "I received sunflowers instead of the roses I ordered.",
    status: "Not processed",
    createDate: "2024-10-10",
    shopName: "Sunflower Bliss",
    lastUpdateDate: "2024-10-13",
  },
];

const ReportAdmin = () => {
  const [reports, setReports] = useState([]); // Danh sách báo cáo
  const [selectedReport, setSelectedReport] = useState(null); // Báo cáo đang được chọn để xem chi tiết
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiện/ẩn modal

  // Tải dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7198/api/Report/GetAllReports"
        );
        setReports(response.data); // Lưu dữ liệu báo cáo từ server vào state
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  // Hàm để mở modal và xem chi tiết báo cáo
  const viewReport = (record) => {
    setSelectedReport(record); // Đặt báo cáo được chọn
    setIsModalVisible(true); // Hiển thị modal
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedReport(null);
  };

  // Hàm đánh dấu báo cáo đã xử lý (gửi yêu cầu cập nhật trạng thái qua API)
  const markAsResolved = async (reportId) => {
    try {
      const response = await axios.put(
        `https://localhost:7198/api/Report/UpdateReportStatus/${reportId}`,
        {
          status: "Processed",
        }
      );

      if (response.status === 200) {
        // Cập nhật trạng thái của báo cáo trong danh sách báo cáo
        const updatedReports = reports.map((report) =>
          report.reportId === reportId
            ? { ...report, status: "Processed" }
            : report
        );
        setReports(updatedReports); // Cập nhật state báo cáo
        message.success("The report has been marked as processed.");
      } else {
        throw new Error("Failed to update report status");
      }
    } catch (error) {
      message.error("Failed to update report status. Please try again.");
      console.error("Error updating report status:", error);
    }
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Processed" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => viewReport(record)}>
            View Details
          </Button>
          <Button
            type="link"
            onClick={() => markAsResolved(record.reportId)}
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
      <Table
        columns={columns}
        dataSource={reports}
        pagination={{ pageSize: 7 }} // Số dòng tối đa trên mỗi trang
      />

      {/* Modal để hiển thị chi tiết báo cáo */}
      {selectedReport && (
        <Modal
          title="Report Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
          <p>
            <strong>Sender:</strong> {selectedReport.username || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {selectedReport.email || "N/A"}
          </p>
          <p>
            <strong>Issue Type:</strong> {selectedReport.issueType || "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {selectedReport.description || "N/A"}
          </p>
          <p>
            <strong>Shop Name:</strong> {selectedReport.shopName || "N/A"}
          </p>
          <p>
            <strong>Created Date:</strong> {selectedReport.createDate || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {selectedReport.status || "N/A"}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default ReportAdmin;
