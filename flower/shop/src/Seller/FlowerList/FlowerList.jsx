/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Table, Button, Tag, Space, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import './FlowerList.scss';
import { fetchFlowerListBySellerId } from '../../API/flower/get_flower_list';

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

  const [flowerList, setFlowerList] = useState(null);
  const [flowerData, setFlowerData] = useState([]);


  const loadFlowerList = async () => {
    try {
      const data = await fetchFlowerListBySellerId();
      setFlowerList(data);  // Set the flower list data
    } catch (error) {
      console.error("Error fetching flower list:", error);
    }
  };

  console.log(flowerList);

  useEffect(() => {
    loadFlowerList();
    const savedFlowers = JSON.parse(localStorage.getItem('flowers')) || flowers;
    setFlowerData(savedFlowers);
  }, [flowers], []);

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
      dataIndex: 'imageUrl',
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
      dataIndex: 'flowerName',
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
      dataIndex: 'flowerDescription',
      key: 'description',
      render: (flowerDescription, record) =>
        editingFlowerId === record.id ? (
          <Input name="description" value={flowerForm.description} onChange={handleInputChange} />
        ) : (
          <span>{flowerDescription}</span>
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
    <div className="flower-list">
      <h2>Flower List</h2>
      <Table
        columns={columns}
        dataSource={flowerList?.$values?.map((flower) => ({ ...flower, key: flower.flowerId }))}
        pagination={{ pageSize: 5 }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default FlowerList;


// {
    //   title: 'Status',
    //   key: 'status',
    //   dataIndex: 'status',
    //   render: (status, record) => {
    //     return editingFlowerId === record.id ? (
    //       <Select value={flowerForm.status} onChange={handleStatusChange} style={{ width: 120 }}>
    //         <Select.Option value="available">Available</Select.Option>
    //         <Select.Option value="unavailable">Unavailable</Select.Option>
    //       </Select>
    //     ) : (
    //       <Tag color={status === 'available' ? 'green' : 'volcano'}>{status.toUpperCase()}</Tag>
    //     );
    //   },
    // },
