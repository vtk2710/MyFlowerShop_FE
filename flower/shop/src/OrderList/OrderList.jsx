import { useState } from 'react';
import { Modal, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import './OrderList.scss';

const OrderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
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
  ]);

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

  return (
    <div className="order-list">
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div className="order-left">
              <img
                src={order.imageUrl}
                alt="Product"
                style={{ width: '100px', height: '100px' }}
              />
              <div>
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{order.customer}</span>
                <p>{order.productInfo}</p>
              </div>
            </div>
            <div className="order-right">
              <EyeOutlined
                onClick={() => showModal(order)}
                style={{ fontSize: '20px', cursor: 'pointer', marginRight: '10px' }}
              />
              <span className={`status ${order.status.replace(' ', '').toLowerCase()}`}>
                {order.status}
              </span>
              <div className="order-actions">
                {order.status !== 'Canceled' && (
                  <>
                    {order.status !== 'Delivered' && (
                      <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                      >
                        Mark as Delivered
                      </Button>
                    )}
                    {order.status !== 'Canceled' && (
                      <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => updateOrderStatus(order.id, 'Canceled')}
                      >
                        Mark as Canceled
                      </Button>
                    )}
                    {order.status !== 'Accepted' && (
                      <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => updateOrderStatus(order.id, 'Accepted')}
                      >
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

      {currentCustomer && (
        <Modal
          title={`Customer Details: ${currentCustomer.customer}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={currentCustomer.imageUrl}
              alt={currentCustomer.customer}
              style={{ marginRight: '20px', borderRadius: '8px', width: '200px', height: '200px' }}
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
