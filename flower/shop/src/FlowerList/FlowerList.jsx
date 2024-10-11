/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import './FlowerList.scss';

const FlowerList = ({ flowers, deleteFlower, updateFlower }) => {
  const [editingFlowerId, setEditingFlowerId] = useState(null);
  const [flowerForm, setFlowerForm] = useState({
    name: '',
    description: '',
    status: '',
    price: '',
  });

  const [flowerData, setFlowerData] = useState([]);

  useEffect(() => {
    const savedFlowers = JSON.parse(localStorage.getItem('flowers')) || flowers;
    setFlowerData(savedFlowers);
  }, [flowers]);

  const handleEditClick = (flower) => {
    setEditingFlowerId(flower.id);
    setFlowerForm({
      name: flower.name,
      description: flower.description,
      status: flower.status,
      price: flower.price,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlowerForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFlowerForm((prevForm) => ({
      ...prevForm,
      status: value,
    }));
  };

  const handleUpdateClick = () => {
    const updatedFlowers = flowerData.map((flower) =>
      flower.id === editingFlowerId ? { ...flower, ...flowerForm } : flower
    );
    setFlowerData(updatedFlowers);
    localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
    setEditingFlowerId(null);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="flower" style={{ width: '50px' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) =>
        editingFlowerId === record.id ? (
          <input type="text" name="name" value={flowerForm.name} onChange={handleInputChange} />
        ) : (
          <a>{text}</a>
        ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) =>
        editingFlowerId === record.id ? (
          <input type="text" name="description" value={flowerForm.description} onChange={handleInputChange} />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status, record) => {
        return editingFlowerId === record.id ? (
          <Select value={flowerForm.status} onChange={handleStatusChange} style={{ width: 120 }}>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="unavailable">Unavailable</Select.Option>
          </Select>
        ) : (
          <Tag color={status === 'available' ? 'green' : 'volcano'}>{status.toUpperCase()}</Tag>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) =>
        editingFlowerId === record.id ? (
          <input type="number" name="price" value={flowerForm.price} onChange={handleInputChange} />
        ) : (
          <span>{new Intl.NumberFormat('vi-VN').format(price)} VND</span>
        ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {editingFlowerId === record.id ? (
            <Button
              onClick={handleUpdateClick}
              icon={<SaveOutlined />}
              style={{ backgroundColor: 'green', color: 'white' }}
            />
          ) : (
            <>
              <Button
                onClick={() => handleEditClick(record)}
                icon={<EditOutlined />}
                style={{ backgroundColor: 'red', color: 'white' }}
              />
              <Button
                onClick={() => deleteFlower(record.id)}
                icon={<DeleteOutlined />}
                style={{ backgroundColor: 'blue', color: 'white' }}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="flower-list">
      <h2>Flower List</h2>
      <Table
        columns={columns}
        dataSource={flowerData.map((flower) => ({ ...flower, key: flower.id }))}
        pagination={{ pageSize: 5 }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default FlowerList;
