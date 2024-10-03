import React, { useState } from 'react'
import { Form, Input, DatePicker, Select, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Option } = Select

export default function CreateProfilePage() {
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState(null)

    const onFinish = (values) => {
        console.log('Success:', values)
        message.success('Profile created successfully!')
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            setImageUrl(URL.createObjectURL(info.file.originFileObj))
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }

    return (
        <div className="create-profile">
            <h1>Create Your Profile</h1>
            <div className="profile-content">
                <div className="profile-picture-section">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        onChange={handleImageUpload}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                        ) : (
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </div>
                <Form
                    form={form}
                    name="createProfile"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="profile-form"
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="birthday"
                        label="Birthday"
                        rules={[{ required: true, message: 'Please select your birthday!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Select placeholder="Select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                            <Option value="prefer-not-to-say">Prefer not to say</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create Profile
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
