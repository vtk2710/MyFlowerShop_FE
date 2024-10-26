import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Form, Input, DatePicker, Radio, Card, Badge, Upload, message } from 'antd';
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import './userProfile.scss';

const { Header, Content, Sider } = Layout;

const UserPage = () => {
  const [currentSection, setCurrentSection] = useState('profile');
  const [cartItemCount, setCartItemCount] = useState(3); // Example cart item count
  const [form] = Form.useForm();

  // Example user data
  const userInfo = {
    fullname: 'John Doe',
    username: 'johndoe',
    password: '******',
    email: 'john.doe@example.com',
    birthday: '1990-05-20',
    gender: 'Male',
    address: '123 Main St, Cityville',
    profilePic: 'https://example.com/images/profile-pic.jpg'
  };

  // Handle Profile Pic change
  const handleProfilePicChange = (file) => {
    // Simulate a file upload process
    message.success('Profile picture updated successfully');
    return false; // Prevent the default upload behavior
  };

  // Dropdown menu items
  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => setCurrentSection('profile')}>
        <UserOutlined />
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick="">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  // Handle logout (you can replace this with actual logout logic)
//   const handleLogout = () => {
//     console.log('User logged out');
//     // Implement your logout functionality here (e.g., clearing the JWT token)
//   };

  return (
    <Layout className="user-container">
      <Header className="user-header">
        <div className="header-right">
          {/* Profile Avatar */}
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar
              src={userInfo.avatar}
              size="large"
              icon={<UserOutlined />}
              className="header-avatar"
            />
          </Dropdown>

          {/* Cart Icon */}
          <Badge count={cartItemCount}>
            <Button icon={<ShoppingCartOutlined />} shape="circle" className="cart-icon" />
          </Badge>
        </div>
      </Header>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Sider width={250} className="user-sider">
          <Menu
            mode="inline"
            defaultSelectedKeys={['profile']}
            selectedKeys={[currentSection]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={({ key }) => setCurrentSection(key)}
          >
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="history">Order History</Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="user-content">
            {/* Profile Section */}
            {currentSection === 'profile' && (
              <section id="profile">
                <Card className="profile-card">
                  <div className="profile-form-container">
                    {/* Profile Picture */}
                    <div className="profile-picture">
                      <Avatar
                        src={userInfo.avatar}
                        size={128} // Increased size
                        className="profile-avatar"
                      />
                      {/* Upload Button Below Picture */}
                      <Upload
                        showUploadList={false}
                        customRequest={handleProfilePicChange}
                      >
                        <Button icon={<UploadOutlined />}>Upload New Picture</Button>
                      </Upload>
                    </div>

                    {/* Profile Form */}
                    <Form
                      form={form}
                      layout="vertical"
                      className="profile-form"
                      initialValues={{
                        fullname: userInfo.fullname,
                        username: userInfo.username,
                        password: userInfo.password,
                        email: userInfo.email,
                        birthday: moment(userInfo.birthday, 'YYYY-MM-DD'),
                        gender: userInfo.gender,
                        address: userInfo.address,
                      }}
                    >
                      <Form.Item label="Fullname" name="fullname">
                        <Input placeholder="Enter your full name" />
                      </Form.Item>
                      <Form.Item label="Username" name="username">
                        <Input placeholder="Enter your username" />
                      </Form.Item>
                      <Form.Item label="Password" name="password">
                        <Input.Password placeholder="Enter your password" />
                      </Form.Item>
                      <Form.Item label="Email" name="email">
                        <Input placeholder="Enter your email" />
                      </Form.Item>
                      <Form.Item label="Birthday" name="birthday">
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item label="Gender" name="gender">
                        <Radio.Group>
                          <Radio value="Male">Male</Radio>
                          <Radio value="Female">Female</Radio>
                          <Radio value="Other">Other</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item label="Address" name="address">
                        <Input placeholder="Enter your address" />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">
                        Update Profile
                      </Button>
                    </Form>
                  </div>
                </Card>
              </section>
            )}

            {/* Order History Section */}
            {currentSection === 'history' && (
              <section id="history">
                {/* Example order history items */}
                <Card title="Order #1" style={{ marginBottom: '20px' }}>
                  <p>Order Date: 2024-10-01</p>
                  <p>Items: 3</p>
                  <p>Total: $30.00</p>
                  <img src="https://example.com/images/order1.jpg" alt="Order 1" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </Card>
                <Card title="Order #2" style={{ marginBottom: '20px' }}>
                  <p>Order Date: 2024-09-28</p>
                  <p>Items: 2</p>
                  <p>Total: $20.00</p>
                  <img src="https://example.com/images/order2.jpg" alt="Order 2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </Card>
              </section>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserPage;
