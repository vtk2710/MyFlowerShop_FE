/* eslint-disable react/prop-types */
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table, Tag, notification } from "antd";
import { useEffect, useState } from "react";
import { fetchFlowerListBySellerId } from "../../API/flower/get_flower_list";
import "./FlowerList.scss";
import { updateFlowerInfo } from "../../API/flower/create_modify_flower";

const FlowerList = ({ flowers, updateFlower }) => {
  const [editingFlowerId, setEditingFlowerId] = useState(null);
  const [flowerList, setFlowerList] = useState(null);
  const [flowerForm, setFlowerForm] = useState({
    name: "",
    description: "",
    status: "",
    price: "",
    category: "",
    quantity: "", // Thêm quantity vào form
    date: "", // Thêm date vào form
    image: "", // Giữ lại image để không mất sau khi save
  });


  const loadFlowerList = async () => {
    try {
      const data = await fetchFlowerListBySellerId();
      setFlowerList(data); // Set the flower list data
    } catch (error) {
      console.error("Error fetching flower list:", error);
    }
  };

  console.log(flowerList);

  useEffect(() => {
      loadFlowerList();
    }, []
  );

  const handleEditClick = (flower) => {
    setEditingFlowerId(flower.flowerId);
    setFlowerForm({
      name: flower.flowerName,
      description: flower.description,
      status: flower.status,
      price: flower.price,
      category: "",
      quantity: flower.quantity,  // Thiết lập quantity
      date: flower.date,  // Thiết lập date
      image: flower.imageUrl,  // Giữ lại image để không mất khi save
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

  const handleSaveClick = async (id) => {

    console.log("Saving flower with ID:", id);

    const formData = new FormData();
    formData.append("flowerName", flowerForm.name);
    formData.append("flowerDescription", flowerForm.description);
    formData.append("status", flowerForm.status);
    formData.append("price", parseFloat(flowerForm.price));
    formData.append("availableQuantity", flowerForm.quantity);

    if (flowerForm.image) {
      formData.append("Image", flowerForm.image);
    }

    try {
      const response = await updateFlowerInfo(id, formData);
      console.log("Update response:", response); // Log the response from the server
      loadFlowerList();
      notification.success({
        message: "Flower updated successfully!",
        duration: 2,
      });

      setEditingFlowerId(null); // Reset editing state
      // Optionally refresh the flower list or update the UI accordingly
    } catch (error) {
      console.error("Error updating flower:", error); // Log the error
      notification.error({
        message: "Failed to update flower",
        description: error.response?.data || "An error occurred. Please try again.",
        duration: 3,
      });
    }
    setEditingFlowerId(null);
  };

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>Image</div>,
      dataIndex: "imageUrl",
      key: "image",
      render: (image, record) => {
        // Check if the current record is being edited
        const isEditing = editingFlowerId === record.flowerId;
        return isEditing ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFlowerForm((prev) => ({ ...prev, image: file })); // Assuming `setFlowerForm` updates the current flower form state
              }
            }}
          />
        ) : (
          <img
            src={image}
            alt="flower"
            style={{ width: "50px" }}
            onError={(e) => {
              e.target.style.display = "none"; // Hide the image if it fails to load
            }}
          />
        );
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>Name</div>,
      dataIndex: "flowerName",
      key: "name",
      render: (text, record) =>
        editingFlowerId === record.flowerId ? (
          <Input name="name" value={flowerForm.name} onChange={handleInputChange} />
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Description</div>,
      dataIndex: "flowerDescription",
      key: "description",
      render: (flowerDescription, record) =>
        editingFlowerId === record.flowerId ? (
          <Input name="description" value={flowerForm.description} onChange={handleInputChange} />
        ) : (
          <span>{flowerDescription}</span>
        ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Status</div>,
      dataIndex: "status",
      key: "status",
      render: (status, record) =>
        editingFlowerId === record.flowerId ? (
          <Select value={flowerForm.status} onChange={handleStatusChange} style={{ width: '120px' }}>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="unavailable">Unavailable</Select.Option>
          </Select>
        ) : (
          <Tag color={status === "available" ? "green" : "volcano"}>
            {status?.toUpperCase()}
          </Tag>
        ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Price</div>,
      dataIndex: "price",
      key: "price",
      render: (price, record) =>
        editingFlowerId === record.flowerId ? (
          <Input name="price" value={flowerForm.price} onChange={handleInputChange} />
        ) : (
          <span>{new Intl.NumberFormat("vi-VN").format(price)} VND</span>
        ),
    },
    // Thêm cột Quantity
    {
      title: <div style={{ textAlign: 'center' }}>Quantity</div>,
      dataIndex: 'availableQuantity',
      key: 'quantity',
      render: (quantity, record) =>
        editingFlowerId === record.flowerId ? (
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
      title: <div style={{ textAlign: 'center' }}>Post Date</div>,
      dataIndex: 'createdAt',
      key: 'date',
      render: (date, record) =>
        editingFlowerId === record.flowerId ? (
          <Input type="date" name="date" value={flowerForm.date} onChange={handleDateChange} />
        ) : (
          <span>{new Date(date).toLocaleDateString("en-US")}</span> // Hiển thị ngày định dạng tiếng Anh
        ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Action</div>,
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          {editingFlowerId === record.flowerId ? (
            <Button
              onClick={() => handleSaveClick(record.flowerId)}
              icon={<SaveOutlined />}
              style={{ backgroundColor: "green", color: "white" }}
            />
          ) : (
            <>
              <Button
                onClick={() => handleEditClick(record)}
                icon={<EditOutlined />}
                style={{ backgroundColor: "orange", color: "white" }}
              />
            </>
          )}
        </Space>
      ),
    }
  ];

  return (
    <div className="flower-list">
      <h2>Flower List</h2>
      <Table
        columns={columns}
        dataSource={flowerList?.$values?.map((flower) => ({
          ...flower,
          key: flower.flowerId,
        }))}
        pagination={{ pageSize: 5 }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default FlowerList;

