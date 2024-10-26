import axios from "axios";

export async function createOrder(order) {
    const response = await axios.post("https://localhost:7198/api/Order", order, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}