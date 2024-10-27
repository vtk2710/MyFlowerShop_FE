import { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const ReportAdmin = () => {
  const [reports, setReports] = useState([]);

  // Lấy dữ liệu báo cáo từ API khi component được mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7198/api/Report/GetAllReports"
        );

        // Kiểm tra nếu response.data là mảng hoặc chứa mảng $values
        const data = response.data.$values || response.data;

        if (Array.isArray(data)) {
          setReports(
            data.map((report) => ({
              reportId: report.reportId,
              userId: report.userId,
              flowerId: report.flowerId,
              sellerId: report.sellerId,
              reportReason: report.reportReason,
              reportDescription: report.reportDescription,
              status: report.status || "Pending",
              key: report.reportId, // Đảm bảo mỗi key là duy nhất
            }))
          );
        } else {
          console.error("API response is not an array:", response.data);
          message.error("Failed to load reports data.");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        message.error("Failed to fetch reports. Please try again.");
      }
    };

    fetchReports();
  }, []);

  // Hàm cập nhật trạng thái báo cáo
  const updateReportStatus = async (reportId, status) => {
    try {
      // Tạo FormData để gửi status dưới dạng multipart/form-data
      const formData = new FormData();
      formData.append("Status", status);

      const response = await axios.put(
        `https://localhost:7198/api/Report/UpdateReportStatus/${reportId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        message.success(`Report ${status} successfully`);
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.reportId === reportId ? { ...report, status } : report
          )
        );
      } else {
        throw new Error("Failed to update report status");
      }
    } catch (error) {
      console.error("Error updating report status:", error);
      message.error("Failed to update report status. Please try again.");
    }
  };
  // Cấu hình các cột cho bảng hiển thị báo cáo
  const columns = [
    {
      title: "Report ID",
      dataIndex: "reportId",
      key: "reportId",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Flower ID",
      dataIndex: "flowerId",
      key: "flowerId",
    },
    {
      title: "Seller ID",
      dataIndex: "sellerId",
      key: "sellerId",
    },
    {
      title: "Report Reason",
      dataIndex: "reportReason",
      key: "reportReason",
    },
    {
      title: "Report Description",
      dataIndex: "reportDescription",
      key: "reportDescription",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>,
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => updateReportStatus(record.reportId, "Resolved")}
            disabled={
              record.status === "Resolved" || record.status === "Dismissed"
            }
          >
            Resolve
          </Button>
          <Button
            type="link"
            onClick={() => updateReportStatus(record.reportId, "Dismissed")}
            disabled={
              record.status === "Resolved" || record.status === "Dismissed"
            }
          >
            Dismiss
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
    </div>
  );
};

export default ReportAdmin;
