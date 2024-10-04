import { useState } from "react";
import { Table, Button, Form, Input, Popconfirm, Space } from "antd";
import "./UserManage.scss";

const { Search } = Input;

// Dữ liệu ban đầu
const initialData = [
  { key: "1", userName: "user1", password: "pass1" },
  { key: "2", userName: "user2", password: "pass2" },
  { key: "3", userName: "ducky", password: "quackquack123" },
  { key: "4", userName: "johndoe", password: "johndoepass" },
  { key: "5", userName: "janedoe", password: "janedoepass" },
  { key: "6", userName: "admin", password: "admin12345" },
  { key: "7", userName: "superuser", password: "superuserpass" },
  { key: "8", userName: "guest", password: "guest123" },
];

const UserManage = () => {
  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  // Kiểm tra xem hàng hiện tại có đang chỉnh sửa không
  const isEditing = (record) => record.key === editingKey;

  // Bắt đầu chỉnh sửa một hàng
  const edit = (record) => {
    form.setFieldsValue({ userName: "", password: "", ...record });
    setEditingKey(record.key);
  };

  // Lưu thay đổi sau khi chỉnh sửa
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        setData(newData);
        setEditingKey(""); // Kết thúc chỉnh sửa
      }
    } catch (err) {
      console.log("Lỗi khi lưu:", err);
    }
  };

  // Hủy chỉnh sửa
  const cancel = () => {
    setEditingKey("");
  };

  // Xóa hàng khỏi bảng
  const deleteRecord = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  // Lọc dữ liệu theo tìm kiếm
  const filteredData = data.filter((item) =>
    item.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Cột của bảng
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      editable: true,
    },
    {
      title: "Password",
      dataIndex: "password",
      editable: true,
      render: () => "••••••",
    },
    {
      title: "Action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              type="link"
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Button onClick={cancel} type="link">
              Cancel
            </Button>
          </span>
        ) : (
          <span>
            <Button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              type="link"
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => deleteRecord(record.key)}
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  // Chèn khả năng chỉnh sửa vào các cột
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "password" ? "password" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="user-manage-container">
      <Space style={{ marginBottom: 16 }}>
        {/* Tìm kiếm người dùng */}
        <Search
          placeholder="Search by username"
          allowClear
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: ({
                editing,
                dataIndex,
                title,
                inputType,
                children,
                ...restProps
              }) => {
                const inputNode =
                  inputType === "password" ? <Input.Password /> : <Input />;
                return (
                  <td {...restProps}>
                    {editing ? (
                      <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                          { required: true, message: `Please Input ${title}!` },
                        ]}
                      >
                        {inputNode}
                      </Form.Item>
                    ) : (
                      children
                    )}
                  </td>
                );
              },
            },
          }}
          dataSource={filteredData} // Dữ liệu của bảng sau khi lọc
          columns={mergedColumns} // Cột của bảng
          rowClassName="editable-row"
          pagination={false} // Không sử dụng phân trang
        />
      </Form>
    </div>
  );
};

export default UserManage;
