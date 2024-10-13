import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Upload, Radio, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './create_profile.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProfilePage = () => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const handleAvatarChange = ({ file }) => {

        console.log(file);
        setAvatar(file);
        // if (file.status === 'done') {
            
        //     message.success(`${file.name} uploaded successfully.`);
        // } else if (file.status === 'error') {
        //     message.error(`${file.name} upload failed.`);
        // }
    };

    const handleCreateProfile = async (values) => {
        // Format date
        const birthDate = values.birthDate ? values.birthDate.format('YYYY-MM-DD') : null;

        if(avatar === null) {
            message.error("No file upload");
            return;
        }

        const formData = new FormData();
        formData.append('FullName', values.fullName);
        formData.append('Address', values.address);
        formData.append('BirthDate', birthDate);
        formData.append('Sex', values.sex);
        formData.append('Avatar', avatar);


        // Call API to submit formData
        const signUpUserToken = localStorage.getItem("token");
        
        try {
            const response = await axios.post('https://localhost:7198/api/UserInfo/create', formData, {
                headers: {
                    Authorization: `Bearer ${signUpUserToken}`
                }
            });
            localStorage.removeItem("newUser");
            navigate('/');
        } catch (error) {
            console.log("Can't create profile:", error)
        }   
        // You can replace this with actual API submission using axios/fetch
    };

    return (
        <div className="create-profile-container">
            <h2>Create Profile</h2>
            <Form form={form} onFinish={handleCreateProfile} layout="vertical" className="create-profile-form">
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input placeholder="Enter your address" />
                </Form.Item>

                <Form.Item label="Birth Date" name="birthDate">
                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Sex" name="sex" rules={[{ required: true, message: 'Please select your gender!' }]}>
                    <Radio.Group>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>                    
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Avatar">
                    <Upload
                        name="avatar"
                        listType="picture"
                        maxCount={1}
                        onChange={handleAvatarChange}
                        beforeUpload={() => false} // Prevent auto upload
                    >
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateProfilePage;
