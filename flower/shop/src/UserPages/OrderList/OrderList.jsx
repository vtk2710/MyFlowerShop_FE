import { useState, useEffect } from 'react';
import { Modal, Button, Pagination, Table, Tag, Image, Menu, Dropdown, message } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import './OrderList.scss';
import { changeOrderDetailStatus, getOrderDetailBySeller } from '../../API/orderDetails/orderDetails';
import { groupBy } from '../../utils/groupBy';

const ORDER_STATUS = {
  PENDING: "Pending",
  DELIVERED: "Delivered",
  CANCELED: "Canceled",
  ACCEPTED: "Accepted",
  PENDING_DELIVERY: "Pending Delivery",
};

const OrderList = () => {
  const [trigger, setTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const [orderDetailList, setOrderDetailList] = useState();

  const groupedOrders = groupBy(orderDetailList?.$values || [], (o) => o?.orderId);
  const mainOrders = Object.keys(groupedOrders).map(orderId => ({
    key: orderId,
    orderId,
    customerName: groupedOrders[orderId][0].customerName,
    createdAt: groupedOrders[orderId][0].createdAt,
    addressDescription: groupedOrders[orderId][0].addressDescription,
    deliveryMethod: groupedOrders[orderId][0].deliveryMethod,
  }));
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetailBySeller(); // Fetch the order details
        setOrderDetailList(data); // Update the state with the fetched data
        console.log(orderDetailList?.$values)
      } catch (error) {
        console.error("Error fetching order details:", error); // Handle any errors
      }
    };

    fetchOrderDetails(); // Call the fetch function
  }, [trigger]); // Empty dependency array means this runs once when the component mounts


  const totalPages = Math.ceil(orderDetailList?.$values?.length / ordersPerPage);
  const currentOrders = orderDetailList?.$values?.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

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

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await changeOrderDetailStatus(id, newStatus);
      setTrigger(p => p + 1)
      message.success("Success")
    } catch (error) {
      message.error("Failed..")
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const mainColumns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" , align: "center",},
    { title: "Customer", dataIndex: "customerName", key: "customerName" , align: "center",},
    { title: "Address", dataIndex: "addressDescription", key: "addressDescription" , align: "center",},
    {
      title: "Delivery Method",
      dataIndex: "deliveryMethod",
      key: "deliveryMethod",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt", align: "center",
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
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        render: (text, record) => {
          const orderDetailStatus = record?.status;
          const statusses = [];
          switch (orderDetailStatus) {
            case ORDER_STATUS.PENDING:
              statusses.push(ORDER_STATUS.ACCEPTED, ORDER_STATUS.CANCELED);
              break;
            case ORDER_STATUS.ACCEPTED:
              statusses.push(ORDER_STATUS.DELIVERED, ORDER_STATUS.PENDING_DELIVERY);
              break;
            case ORDER_STATUS.PENDING_DELIVERY:
              statusses.push(ORDER_STATUS.DELIVERED);
              break;
          }
          if (!statusses.length) return null

          return (
            <Dropdown menu={{
              items: statusses.map(s => (
                {
                  key: s,
                  label: `Mark as ${s}`,
                  onClick: () => {
                    updateOrderStatus(record?.orderDetailId, s)
                  }
                }
              ))
            }}
              placement='bottomRight'
              trigger={['click']}>
              <Button type='text' shape="circle" icon={<EllipsisOutlined />} />
            </Dropdown>
          );
        },
      },
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
  return (
    <div 
   // className="order-list"
    >
      <h2>Order List</h2>

      <Table
        columns={mainColumns}
        dataSource={mainOrders}
        expandable={{ expandedRowRender }}
        rowKey="orderId"
      />
      {/* <ul>
        {currentOrders?.map((order) => (
          <li key={order.orderDetailId}>
            <div className="order-left">
              <img
                src={order.flowerImage}
                alt="Product"
                className="order-image"
              />
              <div>
                <span className="customer-name">{order.customerName}</span>
                <p>{order.productInfo}</p>
                <p>
                  <strong>Total Price:</strong> {new Intl.NumberFormat('vi-VN').format(order.price)} VND
                </p>
              </div>
            </div>
            <div className="order-right">
              <div className="view-status">
                <EyeOutlined
                  onClick={() => showModal(order)}
                  className="view-icon"
                />
                <span className={`status ${order.status.replace(' ', '').toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-actions">
                {order.status === 'Pending' && (
                  <>
                    <Button
                      className="btn-accepted"
                      onClick={() => updateOrderStatus(order.id, 'Accepted')}
                    >
                      Mark as Accepted
                    </Button>
                    <Button
                      className="btn-canceled"
                      onClick={() => updateOrderStatus(order.id, 'Canceled')}
                    >
                      Mark as Canceled
                    </Button>
                  </>
                )}

                {(order.status === 'Accepted' || order.status === 'Pending Delivery') && (
                  <>
                    <Button
                      className="btn-delivered"
                      onClick={() => updateOrderStatus(order.id, 'Delivered')}
                      disabled={order.status === 'Delivered'}
                    >
                      Mark as Delivered
                    </Button>
                    {order.status === 'Accepted' && (
                      <Button
                        className="btn-pending-delivery"
                        onClick={() => updateOrderStatus(order.id, 'Pending Delivery')}
                        disabled={order.status === 'Pending Delivery'}
                      >
                        Mark as Pending Delivery
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul> */}

      {/* Pagination */}
      {/* <Pagination
        current={currentPage}
        total={orderDetailList?.$values?.length}
        pageSize={ordersPerPage}
        onChange={handlePageChange}
        className="pagination-custom"
      /> */}

      {currentCustomer && (
        <Modal
          title={`Customer Details: ${currentCustomer.customerName}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="modal-content">
            <img
              src={currentCustomer.flowerImage}
              alt={currentCustomer.customerName}
              className="modal-image"
            />
            <div>
              <p><strong>Address:</strong> {currentCustomer.addressDescription}</p>
              {/* <p><strong>Phone:</strong> {currentCustomer.phone}</p> */}
              {/* <p><strong>Email:</strong> {currentCustomer.email}</p> */}
              <p><strong>Order Info:</strong> {currentCustomer.flowerName}</p>
              <p><strong>Quantity:</strong> {currentCustomer.amount} items</p>
              <p><strong>Price:</strong> {new Intl.NumberFormat('vi-VN').format(currentCustomer.price)} VND</p>
              <p><strong>Voucher:</strong> {currentCustomer.voucher || 'None'}</p>
              <p><strong>Delivery method:</strong> {currentCustomer.delivery}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderList;
