import axios from "axios"

export async function getOrderDetailBySeller() {
    const response = await axios.get("https://localhost:7198/api/OrderDetails/getOrderDetailList", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}


export async function getOrderDetailByCustomer(status) {
    const response = await axios.get("https://localhost:7198/api/OrderDetails/getOrderDetailListByCustomerId", {
        params: {
            status
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}

export async function changeOrderDetailStatus(id, newStatus) {
    const response = await axios.post("https://localhost:7198/api/OrderDetails/changeOrderDetailStatus", {
        "orderDetailId": id,
        "status": newStatus
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data;
}