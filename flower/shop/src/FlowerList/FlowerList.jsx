/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Table, Button, Tag, Space, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import './FlowerList.scss';

const FlowerList = ({ flowers, deleteFlower, updateFlower }) => {
  const [editingFlowerId, setEditingFlowerId] = useState(null);
  const [flowerForm, setFlowerForm] = useState({
    name: '',
    description: '',
    status: '',
    price: '',
    quantity: '',  // Thêm quantity vào form
    date: '',  // Thêm date vào form
    image: '',  // Giữ lại image để không mất sau khi save
  });

  const handleEditClick = (flower) => {
    setEditingFlowerId(flower.id);
    setFlowerForm({
      name: flower.name,
      description: flower.description,
      status: flower.status,
      price: flower.price,
      quantity: flower.quantity,  // Thiết lập quantity
      date: flower.date,  // Thiết lập date
      image: flower.image,  // Giữ lại image để không mất khi save
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlowerForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleQuantityChange = (value) => {
    setFlowerForm((prevForm) => ({
      ...prevForm,
      quantity: value,
    }));
  };

  const handleDateChange = (e) => {
    setFlowerForm((prevForm) => ({
      ...prevForm,
      date: e.target.value,
    }));
  };

  const handleStatusChange = (value) => {
    setFlowerForm((prevForm) => ({
      ...prevForm,
      status: value,
    }));
  };

  const handleSaveClick = (id) => {
    const updatedFlower = { id, ...flowerForm };
    updateFlower(updatedFlower);
    setEditingFlowerId(null);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt="flower"
          style={{ width: '50px' }}
          onError={(e) => {
            e.target.style.display = 'none'; // Ẩn hình nếu không load được
          }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) =>
        editingFlowerId === record.id ? (
          <Input name="name" value={flowerForm.name} onChange={handleInputChange} />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) =>
        editingFlowerId === record.id ? (
          <Input name="description" value={flowerForm.description} onChange={handleInputChange} />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) =>
        editingFlowerId === record.id ? (
          <Select value={flowerForm.status} onChange={handleStatusChange} style={{ width: '120px' }}>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="unavailable">Unavailable</Select.Option>
          </Select>
        ) : (
          <Tag color={status === 'available' ? 'green' : 'volcano'}>{status.toUpperCase()}</Tag>
        ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) =>
        editingFlowerId === record.id ? (
          <Input name="price" value={flowerForm.price} onChange={handleInputChange} />
        ) : (
          <span>{new Intl.NumberFormat('vi-VN').format(price)} VND</span>
        ),
    },
    // Thêm cột Quantity
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) =>
        editingFlowerId === record.id ? (
          <Select value={flowerForm.quantity} onChange={handleQuantityChange} style={{ width: '120px' }}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((q) => (
              <Select.Option key={q} value={q}>
                {q}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <span>{quantity}</span>
        ),
    },
    // Thêm cột Date
    {
      title: 'Post Date',
      dataIndex: 'date',
      key: 'date',
      render: (date, record) =>
        editingFlowerId === record.id ? (
          <Input type="date" name="date" value={flowerForm.date} onChange={handleDateChange} />
        ) : (
          <span>{new Date(date).toLocaleDateString('en-US')}</span> // Hiển thị ngày định dạng tiếng Anh
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          {editingFlowerId === record.id ? (
            <Button
              onClick={() => handleSaveClick(record.id)}
              icon={<SaveOutlined />}
              style={{ backgroundColor: 'green', color: 'white' }}
            />
          ) : (
            <>
              <Button
                onClick={() => handleEditClick(record)}
                icon={<EditOutlined />}
                style={{ backgroundColor: 'orange', color: 'white' }}
              />
              <Button
                onClick={() => deleteFlower(record.id)}
                icon={<DeleteOutlined />}
                style={{ backgroundColor: 'red', color: 'white' }}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={flowers.map((flower) => ({ ...flower, key: flower.id }))} pagination={{ pageSize: 5 }} />
  );
};

export default FlowerList;
