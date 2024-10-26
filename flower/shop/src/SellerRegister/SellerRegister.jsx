import { Modal, Button, Form, Input, Dropdown, Menu, Checkbox, message, notification } from "antd";
import { sellerRegister } from "../API/user/seller";
import { useNavigate } from "react-router-dom";

const SellerRegisterPage = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {

        const formData = new FormData();
        formData.append("ShopName", values.ShopName);
        formData.append("Introduction", values.Introduction);
        formData.append("AddressSeller", values.AddressSeller)
        try {
            await sellerRegister(formData);
            notification.success({
                message: "Register seller successfully. Wait for navigate to homepage",
                duration: 3
            });
            navigate('/')     
        } catch (error) {
            message.error("error")
        }
    }
    return (
        <>
            <h1>Seller Register Form</h1>
            <Form
                name="seller-register-form"
                onFinish={handleSubmit}
                layout="vertical"
                className="seller-register-form"
            >
                <Form.Item
                    name="ShopName"
                    label="Shop Name"
                    rules={[
                        { required: true, message: "Please input your shop name!" },
                    ]}
                >
                    <Input placeholder="Enter your shop name" />
                </Form.Item>

                <Form.Item
                    name="Introduction"
                    label="Introduction"
                    rules={[
                        { required: true, message: "Please input your introduction!" },
                    ]}
                >
                    <Input placeholder="Enter your introduction" />
                </Form.Item>

                <Form.Item
                    name="AddressSeller"
                    label="Adress"
                    rules={[
                        { required: true, message: "Please input your shop address!" },
                    ]}
                >
                    <Input placeholder="Enter your shop address" />
                </Form.Item>
                <Button htmlType="submit">
                    Send
                </Button>
            </Form>
        </>
    )
}
export default SellerRegisterPage