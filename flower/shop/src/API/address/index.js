import axios from "axios";


export async function getAddresses() {
    const response = await axios.get("https://localhost:7198/api/Address", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}

export async function createAddress(description) {
    const formData = new FormData();
    formData.append("Description", description)
    const response = await axios.post("https://localhost:7198/api/Address", formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
}