import { useState } from 'react';
import { Modal, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const OrderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      status: 'In Transit',
      imageUrl: '/image/hoacattuong.jpg',
      productInfo: 'Lisianthus - 3 items',
      address: '123 Main St, Springfield',
      phone: '555-555-5555',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      status: 'Completed',
      imageUrl: '/image/hoasen.jpg',
      productInfo: 'Lotus - 1 item',
      address: '456 Elm St, Springfield',
      phone: '555-666-7777',
      email: 'jane.smith@example.com',
    },
    {
      id: 3,
      customer: 'Oliver Smith',
      status: 'In Transit',
      imageUrl: '/image/weddingflower.jpg',
      productInfo: 'Wedding flower - 5 items',
      address: '123 Elm St, Springfield, IL 62701',
      phone: '(555) 123-4567',
      email: 'oliver.smith@example.com',
    },
    {
      id: 4,
      customer: 'Sophia Johnson',
      status: 'In Transit',
      imageUrl: '/image/hoahongtrang.png',
      productInfo: 'White Rose - 2 items',
      address: '456 Maple Ave, Lincoln, NE 68502',
      phone: ' (555) 987-6543',
      email: 'sophia.johnson@example.com',
    },
    {
      id: 5,
      customer: 'Liam Brown',
      status: 'In Transit',
      imageUrl: '/image/hoamaudon.jpg',
      productInfo: 'Peony - 4 items',
      address: '789 Oak St, Denver, CO 80202',
      phone: '(555) 234-5678',
      email: 'liam.brown@example.com',
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
    <>
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={order.imageUrl}
                alt="Product"
                style={{ marginRight: '20px', width: '50px', height: '50px' }}
              />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{order.customer}</span>
                <p>{order.productInfo}</p>
              </div>
              {/* Thêm icon con mắt bên cạnh tên khách hàng, chỉ khi nhấp vào icon sẽ mở modal */}
              <EyeOutlined
                onClick={() => showModal(order)}
                style={{ fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}
              />
              <span
                className={`status ${order.status.replace(' ', '').toLowerCase()}`}
                style={{
                  padding: '5px 10px',
                  backgroundColor:
                    order.status === 'Completed'
                      ? '#4caf50'
                      : order.status === 'Received'
                      ? '#ff9800'
                      : '#03a9f4',
                  color: order.status === 'Received' ? '#000' : '#fff',
                  borderRadius: '4px',
                }}
              >
                {order.status}
              </span>
              <div style={{ marginLeft: '20px' }}>
                {order.status !== 'Received' && (
                  <Button
                    style={{ marginRight: '10px' }}
                    onClick={() => updateOrderStatus(order.id, 'Received')}
                  >
                    Mark as Received
                  </Button>
                )}
                {order.status !== 'In Transit' && (
                  <Button
                    style={{ marginRight: '10px' }}
                    onClick={() => updateOrderStatus(order.id, 'In Transit')}
                  >
                    Mark as In Transit
                  </Button>
                )}
                {order.status !== 'Completed' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'Completed')}>
                    Mark as Completed
                  </Button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Customer Details */}
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
            style={{ marginRight: '20px', borderRadius: '8px', width: '100px', height: '100px' }}
          />
          <div>
            <p><strong>Address:</strong> {currentCustomer.address}</p>
            <p><strong>Phone:</strong> {currentCustomer.phone}</p>
            <p><strong>Email:</strong> {currentCustomer.email}</p>
            <p><strong>Order Info:</strong> {currentCustomer.productInfo}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderList;
