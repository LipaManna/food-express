import axios from "axios";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASEURL}api`,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

export const getMenu = async () => {
    const response = await api.get("/menu");
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

export const getAllOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
};