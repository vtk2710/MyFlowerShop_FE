import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


// Trang seller tạm thời
export default function SellerPage() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            navigate("/");
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    if(isLoading) {
        return (
            <div>Loading....</div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem("token"); //Xóa token
        navigate("/");
    };

    return (
        <div>
            <h1>Seller Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}