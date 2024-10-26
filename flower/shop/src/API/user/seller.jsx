import axios from "axios";

export const getSellerInfo = async () => {
    const userLogin = localStorage.getItem("token");
    const response = await axios.get('https://localhost:7198/api/Seller/getSellerInfo', {
        headers: {
            Authorization: `Bearer ${userLogin}`
        }
    });
    return response.data;
}