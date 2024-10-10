import { useState } from 'react';
import { Modal, Button, Pagination } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import './OrderList.scss';

const OrderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      status: 'Pending Delivery',
      imageUrl: '/image/hoacattuong.jpg',
      productInfo: 'Lisianthus',
      quantity: 3,
      address: '123 Main St, Springfield',
      phone: '555-555-5555',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      status: 'Delivered',
      imageUrl: '/image/hoasen.jpg',
      productInfo: 'Lotus',
      quantity: 1,
      address: '456 Elm St, Springfield',
      phone: '555-666-7777',
      email: 'jane.smith@example.com',
    },
    {
      id: 3,
      customer: 'Oliver Smith',
      status: 'Pending Delivery',
      imageUrl: '/image/weddingflower.jpg',
      productInfo: 'Wedding flower',
      quantity: 5,
      address: '123 Elm St, Springfield, IL 62701',
      phone: '(555) 123-4567',
      email: 'oliver.smith@example.com',
    },
    {
      id: 4,
      customer: 'James Anderson',
      status: 'Accepted',
      imageUrl: '/image/weddingflower.jpg',
      productInfo: 'Wedding flower',
      quantity: 5,
      address: '45 Maple Street, Los Angeles, CA',
      phone: '(666) 153-4367',
      email: 'james.anderson@example.com',
    },
    {
      id: 5,
      customer: 'Emily Johnson',
      status: 'Pending Delivery',
      imageUrl: '/image/hoahongtrang.png',
      productInfo: 'Rose Bouquet',
      quantity: 3,
      address: '120 Elm Avenue, New York, NY',
      phone: '(212) 555-1234',
      email: 'emily.johnson@example.com',
    },
    {
      id: 6,
      customer: 'Michael Brown',
      status: 'Delivered',
      imageUrl: '/image/tulip.jpg',
      productInfo: 'Tulip Arrangement',
      quantity: 4,
      address: '78 Pine Lane, Houston, TX',
      phone: '(713) 555-9876',
      email: 'michael.brown@example.com',
    },
    {
      id: 7,
      customer: 'Sarah Davis',
      status: 'Pending Delivery',
      imageUrl: '/image/hoasen.jpg',
      productInfo: 'Lily Basket',
      quantity: 2,
      address: '256 Oak Road, San Francisco, CA',
      phone: '(415) 555-2468',
      email: 'sarah.davis@example.com',
    },
    {
      id: 8,
      customer: 'Robert Wilson',
      status: 'Canceled',
      imageUrl: '/image/hoahuongduong.jpg',
      productInfo: 'Sunflower Bunch',
      quantity: 1,
      address: '98 Cedar Drive, Miami, FL',
      phone: '(305) 555-3142',
      email: 'robert.wilson@example.com',
    },
    {
      id: 9,
      customer: 'Jessica Lee',
      status: 'Accepted',
      imageUrl: '/image/hoalayon.jpg',
      productInfo: 'Orchid Pot',
      quantity: 3,
      address: '65 Birch Street, Seattle, WA',
      phone: '(206) 555-4791',
      email: 'jessica.lee@example.com',
    }
  ]);

  // Tính toán số trang
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Lấy danh sách đơn hàng cho trang hiện tại
  const currentOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  const showModal = (order) => {
    setCurrentCustomer(order);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="order-list">
      <h2>Order List</h2>
      <ul>
        {currentOrders.map((order) => (
          <li key={order.id}>
            <div className="order-left">
              <img
                src={order.imageUrl}
                alt="Product"
                className="order-image"
              />
              <div>
                <span className="customer-name">{order.customer}</span>
                <p>{order.productInfo}</p>
              </div>
            </div>
            <div className="order-right">
              <EyeOutlined
                onClick={() => showModal(order)}
                className="view-icon"
              />
              <span className={`status ${order.status.replace(' ', '').toLowerCase()}`}>
                {order.status}
              </span>
              <div className="order-actions">
                {order.status !== 'Canceled' && (
                  <>
                    {order.status !== 'Delivered' && (
                      <Button onClick={() => updateOrderStatus(order.id, 'Delivered')}>
                        Mark as Delivered
                      </Button>
                    )}
                    {order.status !== 'Canceled' && (
                      <Button onClick={() => updateOrderStatus(order.id, 'Canceled')}>
                        Mark as Canceled
                      </Button>
                    )}
                    {order.status !== 'Accepted' && (
                      <Button onClick={() => updateOrderStatus(order.id, 'Accepted')}>
                        Mark as Accepted
                      </Button>
                    )}
                    {order.status !== 'Pending Delivery' && (
                      <Button onClick={() => updateOrderStatus(order.id, 'Pending Delivery')}>
                        Mark as Pending Delivery
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={orders.length}
        pageSize={ordersPerPage}
        onChange={handlePageChange}
        className="pagination-custom"
      />

      {currentCustomer && (
        <Modal
          title={`Customer Details: ${currentCustomer.customer}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-content">
            <img
              src={currentCustomer.imageUrl}
              alt={currentCustomer.customer}
              className="modal-image"
            />
            <div>
              <p><strong>Address:</strong> {currentCustomer.address}</p>
              <p><strong>Phone:</strong> {currentCustomer.phone}</p>
              <p><strong>Email:</strong> {currentCustomer.email}</p>
              <p><strong>Order Info:</strong> {currentCustomer.productInfo}</p>
              <p><strong>Quantity:</strong> {currentCustomer.quantity} items</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderList;
