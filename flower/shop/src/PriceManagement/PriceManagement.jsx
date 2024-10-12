import { useState } from 'react';
import { Table, Input, Button, Modal, Form } from 'antd';
import './PriceManagement.scss';

const PriceManagement = () => {
  const [priceList, setPriceList] = useState([
    { id: 1, flower: 'Rose', price: '480000', event: 'Valentine\'s Day' },
    { id: 2, flower: 'White Rose', price: '360000', event: 'Wedding' },
    { id: 3, flower: 'Hydrangea', price: '240000', event: 'Mother\'s Day' },
    { id: 4, flower: 'Lisianthus', price: '600000', event: 'Graduation' },
    { id: 5, flower: 'Hibiscus', price: '672000', event: 'Festival' },
    { id: 6, flower: 'Camellia', price: '96000', event: 'Anniversary' },
    { id: 7, flower: 'Sunflower', price: '504000', event: 'Summer Party' },
    { id: 8, flower: 'Peony', price: '840000', event: 'Spring Festival' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const filteredPriceList = priceList.filter((item) =>
    item.flower.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updatePrice = () => {
    setPriceList((prevPriceList) =>
      prevPriceList.map((item) => (item.id === selectedFlower.id ? { ...item, price: newPrice } : item))
    );
    setIsModalOpen(false);
    setNewPrice('');
    setSelectedFlower(null);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'flower',
      key: 'flower',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${formatPrice(price)} VND`,
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => {
          setSelectedFlower(record);
          setIsModalOpen(true);
        }}>
          Edit Price
        </Button>
      ),
    },
  ];

  return (
    <div className="price-management">
      <h2>Manage Prices (VND)</h2>
      <Input
        placeholder="Search for a flower..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Table
        columns={columns}
        dataSource={filteredPriceList}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={`Update Price for ${selectedFlower?.flower}`}
        open={isModalOpen}
        onOk={updatePrice}
        onCancel={() => setIsModalOpen(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <Form>
          <Form.Item label="New Price">
            <Input
              type="text"
              placeholder="Enter new price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PriceManagement;
