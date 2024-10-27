import axios from "axios";

export const postNewFlower = async (params) => {
    const userLogin = localStorage.getItem("token");
    const response = await axios.post("https://localhost:7198/api/FlowerInfo/Create", params, {
        headers: {
            Authorization: `Bearer ${userLogin}`
        }
    })
}

export const updateFlowerInfo = async (id, params) => {
    const userLogin = localStorage.getItem("token");
    const response = await axios.put(`https://localhost:7198/api/FlowerInfo/update/${id}`, params, {
        headers: {
            Authorization: `Bearer ${userLogin}`
        }
    })
}