import { v4 as uuidv4 } from "uuid";
import { orders } from "../data/orders.data.js";
import {simulateOrderStatus} from "../services/orderStatus.service.js";

export const createOrder = (req,res) => {
    const {items,customer} = req.body;
    if(!items?.length || !customer?.name || !customer?.address){
        return res.status(400).json({message:"Invalid request data"});
    }
    const newOrder = {
        id: uuidv4(),
        items,
        customer,
        status: "pending",
    }
    orders.push(newOrder);
    simulateOrderStatus(newOrder.id);
    return res.status(201).json(newOrder);
}

export const getOrdersById = (req,res) => {
    const order = orders.find(order => order.id === req.params.id);
    if(!order){
        return res.status(404).json({message:"Order not found"});
    }
    return res.status(200).json(order);
}