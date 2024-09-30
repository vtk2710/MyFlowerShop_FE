import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    //Kiểm tra token còn lưu trên local không. Nếu không còn sẽ quay về Home
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

    //Xử lý logout
    const handleLogout = () => {
        localStorage.removeItem("token"); //Xóa token
        navigate("/");
    };

    //Trang admin tạm thời, design sau
    return(
        <div>
            <h1>Admin Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}