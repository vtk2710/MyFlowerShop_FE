import { Button, Form, Input, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

function CategoryManage() {
  const [visible, setVisible] = useState(false);
  const [formVariable] = useForm();
  const [editMode, setEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Trạng thái để theo dõi danh mục đang chỉnh sửa
  const [dataSource, setDataSource] = useState([]);

  // Tải dữ liệu từ localStorage khi component khởi tạo
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("categories"));
    if (storedData) {
      setDataSource(storedData);
    } else {
      // Nếu không có dữ liệu thì khởi tạo với danh sách mặc định
      setDataSource([
        { key: "1", Category: "Roses" },
        { key: "2", Category: "Wedding Flowers" },
        { key: "3", Category: "Congratulatory Flowers" },
        { key: "4", Category: "Birthday Flowers" },
        { key: "5", Category: "Holiday Flowers" },
        { key: "6", Category: "Orchids" },
        { key: "7", Category: "Table Flowers" },
      ]);
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(dataSource));
  }, [dataSource]);

  const handleOpenModal = () => {
    setVisible(true);
    formVariable.resetFields(); // Reset trường khi mở modal
  };

  const handleCloseModal = () => {
    setVisible(false);
    setEditMode(false); // Reset trạng thái chỉnh sửa khi đóng modal
  };

  const handleOk = () => {
    formVariable.submit();
  };

  const handleSubmit = (values) => {
    if (editMode) {
      // Nếu đang ở chế độ chỉnh sửa
      const updatedData = dataSource.map((item) => {
        if (item.key === editingCategory.key) {
          return { ...item, Category: values.Category }; // Cập nhật danh mục
        }
        return item;
      });
      setDataSource(updatedData);
    } else {
      // Nếu không phải chế độ chỉnh sửa
      setDataSource([...dataSource, { key: Date.now().toString(), ...values }]);
    }
    formVariable.resetFields();
    handleCloseModal();
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      Align: "center",
    },
    {
      title: "Action",
      key: "action",
      Align: "center",
      render: (_, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              setEditingCategory(record); // Lưu danh mục đang chỉnh sửa
              formVariable.setFieldsValue({ Category: record.Category }); // Đặt giá trị cho ô nhập
              setEditMode(true); // Bật chế độ chỉnh sửa
              handleOpenModal(); // Mở modal
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ width: "150px" }}
      >
        Add Category
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title={editMode ? "Edit Category" : "Add New Category"} // Đổi tiêu đề modal tùy theo chế độ
        open={visible}
        onCancel={handleCloseModal}
        onOk={handleOk}
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            name={"Category"}
            label={"Category Name"}
            rules={[
              {
                required: true,
                message: "Please input the category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CategoryManage;
