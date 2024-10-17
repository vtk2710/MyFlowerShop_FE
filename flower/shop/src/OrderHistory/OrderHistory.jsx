import { useState, useEffect } from 'react';
import Header from './Navbar';
import './OrderHistory.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { allOrders } from '../Share/history';
import { TruckOutlined, UserOutlined, PhoneOutlined, CreditCardOutlined, CalendarOutlined, EnvironmentOutlined, ProfileOutlined, GiftOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { Modal, Button } from 'antd'; // Import Ant Design modal component
import Footer from './Footer';

const OrderHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'all';

    const tabs = [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'Shipping', value: 'shipping' },
        { label: 'Delivery', value: 'delivery' },
        { label: 'Completed', value: 'completed' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Returned product/money', value: 'returned' }
    ];

    const [selectedTab, setSelectedTab] = useState(type);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // Thêm searchQuery để lưu từ khóa tìm kiếm
    const [visibleModal, setVisibleModal] = useState(false); // State for modal visibility
    const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order details

    const itemsPerPage = 5;

    useEffect(() => {
        setSelectedTab(type);
        const filteredOrders = type === 'all' ? allOrders : allOrders.filter(order => order.status === type);
        setOrders(filteredOrders);
        setCurrentPage(1);
    }, [type, location.search]);

    const handleTabClick = (tabValue) => {
        navigate(`/orderhistory?type=${tabValue}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleBuyAgainClick = (order) => {
        navigate(`/${order.category}`);
    };

    const handleFeedbackClick = (order) => {
        navigate('/feedback', { state: { order } });
    };

    // Thêm hàm mở modal để hiển thị chi tiết đơn hàng
    const handleViewDetailClick = (order) => {
        setSelectedOrder(order); // Đặt đơn hàng đã chọn để hiển thị trong modal
        setVisibleModal(true); // Mở modal
    };

    const handleModalClose = () => {
        setVisibleModal(false); // Đóng modal
    };

    // Tính toán để hiển thị các đơn hàng trên trang hiện tại
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;

    const filteredOrders = orders.filter(order =>
        order.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const shouldShowBuyAgainButton = (status) => {
        return status === 'completed' || status === 'canceled' || type === 'all';
    };

    return (
        <div className="order-history-wrapper">
            <div className="order-history-container">
                <Header />
                <div className="tabs-container">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`tab-item ${selectedTab === tab.value ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick(tab.value)}
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
                    {currentOrders.length === 0 ? (
                        <p>No order here.</p>
                    ) : (
                        currentOrders.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-image">
                                    <img src={order.imageUrl} alt={order.productName} />
                                </div>
                                <div className="order-info">
                                    <h3>{order.productName}</h3>
                                    <button
                                        className="view-detail-button"
                                        onClick={() => handleViewDetailClick(order)}
                                    >
                                        View Detail
                                    </button>
                                    <p className="total-price">
                                        <span className="price-label">Money:</span>
                                        <span className="price-amount">{order.total.toLocaleString()} VND</span>
                                    </p>
                                    {order.status === 'completed' && (
                                        <div className="delivery-status">
                                            <TruckOutlined style={{ marginRight: '8px' }} />
                                            <span>Deliver Success</span>
                                        </div>
                                    )}
                                </div>
                                <div className="order-actions">
                                    {shouldShowBuyAgainButton(order.status) && (
                                        <button
                                            className="buy-again-button"
                                            onClick={() => handleBuyAgainClick(order)}
                                        >
                                            Buy again
                                        </button>
                                    )}
                                    <button 
                                        className="contact-seller-button" 
                                        onClick={() => handleFeedbackClick(order)}
                                    >
                                        Feedback
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {totalPages > 1 && (
                    <div className="pagination">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            &laquo;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                        >
                            &raquo;
                        </button>
                    </div>
                )}

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

                <Footer /> 
            </div>
        </div>
    );
};

export default OrderHistory;
