import axios from "axios";

export const fetchFlowerList = async (categoryID) => {
    const response = await axios.get(`https://localhost:7198/api/Category/${categoryID}/flowers`);
    return response.data;
}