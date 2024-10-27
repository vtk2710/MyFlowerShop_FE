import { CalendarOutlined, CreditCardOutlined, EnvironmentOutlined, GiftOutlined, PhoneOutlined, ProfileOutlined, TruckOutlined, UserOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Button, Image, Modal, Table, Tag } from 'antd'; // Import Ant Design modal component
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrderDetailByCustomer } from '../../API/orderDetails/orderDetails';

import './OrderHistory.scss';
import { groupBy } from '../../utils/groupBy';


const OrderHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState([]);

    const tabs = [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Shipping', value: 'shipping' },
        { label: 'Delivery', value: 'delivery' },
        { label: 'Completed', value: 'completed' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Returned product/money', value: 'returned' }
    ];

    const [selectedTab, setSelectedTab] = useState(tabs[0].value);
    //const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // Thêm searchQuery để lưu từ khóa tìm kiếm
    const [visibleModal, setVisibleModal] = useState(false); // State for modal visibility
    const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order details

    useEffect(() => {
        getOrderDetailByCustomer(
            selectedTab !== "all" ? selectedTab : undefined
        ).then((data) => {
            setAllOrders(data?.$values || [])
        }).catch(() => {
            setAllOrders([])
        })
    }, [selectedTab, location.search]);

    const groupedOrders = groupBy(allOrders || [], (o) => o?.orderId);
    const mainOrders = Object.keys(groupedOrders).map(orderId => ({
        key: orderId,
        orderId,
        customerName: groupedOrders[orderId][0].customerName,
        createdAt: groupedOrders[orderId][0].createdAt,
        addressDescription: groupedOrders[orderId][0].addressDescription,
        deliveryMethod: groupedOrders[orderId][0].deliveryMethod,
    }));

    const mainColumns = [
        { title: "Order ID", align: "center", dataIndex: "orderId", key: "orderId" },
        { title: "Customer", align: "center", dataIndex: "customerName", key: "customerName" },
        { title: "Address", align: "center", dataIndex: "addressDescription", key: "addressDescription" },
        {
            align: "center",
            title: "Delivery Method",
            dataIndex: "deliveryMethod",
            key: "deliveryMethod",
        },
        {
            title: "Created At",
            align: "center",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => new Date(createdAt).toLocaleDateString(),
        },
    ];

    // Render additional row details for each order
    const expandedRowRender = (record) => {
        const subColumns = [
            {
                title: "Flower",
                key: "flowerName",
                render: (text, item) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Image src={item.flowerImage} alt={item.flowerName} width={50} />
                        <span style={{ marginLeft: 8 }}>{item.flowerName}</span>
                    </div>
                ),
            },
            { title: "Shop name", align: "center", dataIndex: "shopName", key: "shopName" },
            { title: "Quantity", align: "center", dataIndex: "amount", key: "amount" },
            { title: "Price", align: "center", dataIndex: "price", key: "price", render: (price) => `₫${price.toLocaleString()}` },
            {
                title: "Status", align: "center",
                dataIndex: "status",
                key: "status",
                render: (status) => {
                    let color;
                    switch (status) {
                        case "Pending": color = "gold"; break;
                        case "Delivered": color = "green"; break;
                        case "Canceled": color = "red"; break;
                        case "Accepted": color = "blue"; break;
                        case "Pending Delivery": color = "orange"; break;
                        default: color = "default";
                    }
                    return <Tag color={color}>{status}</Tag>;
                },
            }
        ];

        // Display each order item for the expanded row
        return (
            <Table
                columns={subColumns}
                dataSource={groupedOrders[record.orderId]}
                rowKey="orderDetailId"
                pagination={false}
            />
        );
    };


    const handleBuyAgainClick = (order) => {
        navigate(`/${order.category}`);
    };

    const handleFeedbackClick = (order) => {
        navigate('/feedback', { state: { order } });
    };

    const handleModalClose = () => {
        setVisibleModal(false); // Đóng modal
    };


    const shouldShowBuyAgainButton = (status) => {
        return status === 'completed' || status === 'canceled' || type === 'all';
    };

    return (
        <>
            <div className="order-history-wrapper">
                <div className="order-history-container">
                    <div className="tabs-container">
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                className={`tab-item ${selectedTab === tab.value ? 'active-tab' : ''}`}
                                onClick={() => setSelectedTab(tab.value)}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="You can search by Product Name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="orders-content">
                        <Table
                            columns={mainColumns}
                            dataSource={mainOrders}
                            expandable={{ expandedRowRender }}
                            rowKey="orderId"
                            pagination={{ pageSize: 5 }}
                        />
                    </div>                   

                    {/* Modal for showing order details */}
                    <Modal
                        title="Order Details"
                        visible={visibleModal}
                        onCancel={handleModalClose}
                        footer={[
                            <Button key="close" onClick={handleModalClose}>Close</Button>
                        ]}
                    >
                        {selectedOrder && (
                            <div className="order-details-modal">
                                <img
                                    src={selectedOrder.imageUrl}
                                    alt={selectedOrder.productName}
                                    className="modal-image"
                                />
                                <div className="order-details-content">
                                    <div className="order-details-column">
                                        <p><ProfileOutlined /> Order ID: {selectedOrder.id}</p>
                                        <p><GiftOutlined /> Flower ID: {selectedOrder.flowerId}</p>
                                        <p><UserOutlined /> User ID: {selectedOrder.userId}</p>
                                        <p><PhoneOutlined /> Phone Number: {selectedOrder.phoneNumber}</p>
                                    </div>
                                    <div className="order-details-column">
                                        <p><CreditCardOutlined /> Payment Method: {selectedOrder.paymentMethod}</p>
                                        <p><TruckOutlined /> Delivery Method: {selectedOrder.deliveryMethod}</p>
                                        <p><CalendarOutlined /> Created Date: {new Date(selectedOrder.createdDate).toLocaleDateString()}</p>
                                        <p><EnvironmentOutlined /> Address: {selectedOrder.address}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default OrderHistory;
