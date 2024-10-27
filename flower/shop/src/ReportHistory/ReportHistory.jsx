import { useState, useEffect } from 'react';
import { Table } from 'antd';
import './ReportHistory.scss';

const ReportHistory = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/reports');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const columns = [
        { title: 'Report ID', dataIndex: 'reportId', key: 'reportId' },
        { title: 'User ID', dataIndex: 'userId', key: 'userId' },
        { title: 'Flower ID', dataIndex: 'flowerId', key: 'flowerId' },
        { title: 'Seller ID', dataIndex: 'sellerId', key: 'sellerId' },
        { title: 'Report Reason', dataIndex: 'reportReason', key: 'reportReason' },
        { title: 'Description', dataIndex: 'reportDescription', key: 'reportDescription' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Created date', dataIndex: 'createddate', key: 'createddate' },
        { title: 'Updated date', dataIndex: 'updatedate', key: 'updatedate' },
    ];

    return (
        <div className="report-history-container">
            <h1 className="report-history-title">Report History</h1>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    ...pagination,
                    total: data.length,
                    showSizeChanger: false,
                }}
                onChange={handleTableChange}
                rowKey="reportId"
            />
        </div>
    );
};

export default ReportHistory;
