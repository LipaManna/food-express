import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getOrderById } from "../services/api.service";

export const OrderStatus = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("Pending");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchStatus = () => {
      getOrderById(id)
        .then((data) => {
          setOrder(data);
          setStatus(data.status);
        })
        .catch((err) => console.log(err));
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_BASEURL}`);
    socket.on("orderStatusUpdate", (updatedOrder) => {
      if (updatedOrder.id === id) {
        setStatus(updatedOrder.status);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [id]);

  return (
    <div className="order-status-container">
      <div className="order-status-card">
        <h2 className="order-status-title">Order #{id}</h2>
        <div className="order-status-badge">{status.charAt(0).toUpperCase() + status.slice(1)}</div>
      </div>
    </div>
  );
};
