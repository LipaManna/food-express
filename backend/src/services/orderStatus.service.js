import { orders } from "../data/orders.data.js";
import { io } from "../../server.js";

export const simulateOrderStatus = (orderId) => {
    const statuses = ["Pending", "Preparing", "Out for delivery", "Delivered"];
    let index = 1;
    const interval = setInterval(() => {
        const order = orders.find(order => order.id === orderId);
        if (!order) {
            return clearInterval(interval);
        }
        order.status = statuses[index];
        // io.emit("orderStatusUpdated", order);
        index++;
        if (index >= statuses.length) {
            clearInterval(interval);
        }
    }, 5000)
}