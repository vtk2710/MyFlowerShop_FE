import axios from "axios"

export const getCart = async () => {
    const userLogin = localStorage.getItem("token");
    try {
        const response = await axios.get('https://localhost:7198/api/Cart', {
            headers: {
                Authorization: `Bearer ${userLogin}`
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
}

export const addToCart = async (productId, quantity) => {
    const userLogin = localStorage.getItem("token");
    const response = await axios.post(`https://localhost:7198/api/Cart/add?flowerId=${productId}&quantity=${quantity}`, {}, {
        headers: {
            Authorization: `Bearer ${userLogin}`
        }
    })
    return response.data;
}

export const removeItem = async (productId) => {
    const userLogin = localStorage.getItem("token");
    const response = await axios.delete(`https://localhost:7198/api/Cart/remove/${productId}`, {
        headers: {
            Authorization: `Bearer ${userLogin}`
        }
    })
    return response.data;
}