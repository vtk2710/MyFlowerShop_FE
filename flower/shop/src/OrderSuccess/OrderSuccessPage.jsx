import { Button, Result } from 'antd';
import React, { useEffect } from 'react';

const OrderSuccessPage = () => {
    useEffect(() => {
        localStorage.removeItem("checkoutFromCart");
    }, []);
    return (
        <Result
            status="success"
            title="Order Placed Successfully!"
            subTitle="Thank you for your order. We will send you a confirmation email shortly."
            extra={[
                <Button
                    href='/'
                    type="primary" key="home">
                    Return to Homepage
                </Button>
            ]}
        />
    );
};

export default OrderSuccessPage;
