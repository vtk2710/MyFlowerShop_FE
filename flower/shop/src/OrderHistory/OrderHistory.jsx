// OrderHistory.js
import { useState, useEffect } from 'react';
import Header from './Navbar';
import './OrderHistory.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { allOrders } from '../Share/history';
import { TruckOutlined } from '@ant-design/icons';
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
        switch (order.category) {
            case 'birthday':
                navigate('/birthday');
                break;
            case 'wedding':
                navigate('/wedding');
                break;
            case 'congratulatory':
                navigate('/congratulate');
                break;
            case 'holiday':
                navigate('/holiday');
                break;
            case 'valentine':
                navigate('/valentine');
                break;
            case 'christmas':
                navigate('/christmas');
                break;
            case 'newyear':
                navigate('/newyear');
                break;
            case 'table':
                navigate('/table');
                break;
            case 'orchid':
                navigate('/orchid');
                break;
            default:
                navigate('/');
                break;
        }
    };

    const handleFeedbackClick = (order) => {
        navigate(`/feedback`, { state: { order } });
    };

    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = type === 'all' ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : orders;

    const totalPages = Math.ceil(orders.length / itemsPerPage);

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
                    <input type="text" placeholder="You can search by Shop name, Order ID or Product Name" />
                </div>
                <div className="orders-content">
                    {currentOrders.length === 0 ? (
                        <p>Không có đơn hàng nào.</p>
                    ) : (
                        currentOrders.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-image">
                                    <img src={order.imageUrl} alt={order.productName} />
                                </div>
                                <div className="order-info">
                                    <h3>{order.shopName}</h3>
                                    <p>Date: {order.date}</p>
                                    <p>Flower: {order.productName}</p>
                                    <p>Quantity: {order.quantity}</p>
                                    <p className="total-price">
                                        <span className="price-label">Money:</span>
                                        <span className="price-amount">{order.total.toLocaleString()} VND</span>
                                    </p>
                                    {(order.status === 'completed' && (
                                        <div className="delivery-status">
                                            <TruckOutlined style={{ marginRight: '8px' }} />
                                            <span>Deliver Success</span>
                                        </div>
                                    ))}
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
                {type === 'all' && totalPages > 1 && (
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
            </div>
            <Footer /> 
        </div>
    );
};

export default OrderHistory;
