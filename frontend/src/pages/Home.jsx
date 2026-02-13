import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    const orderId = localStorage.getItem("activeOrderId");
    if (orderId) {
      axios
        .get(`${import.meta.env.VITE_BASEURL}orders/${orderId}`)
        .then((res) => setActiveOrder(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section h-[calc(100vh-4rem)]">
        <div className="hero-content">
          <h1 className="hero-title">Delicious Food Delivered Fast 🍕</h1>
          <p className="hero-subtitle">
            Fresh. Hot. At your doorstep. Order from the best restaurants near
            you.
          </p>
          <Link to="/menu" className="hero-cta">
            Order Now
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="18"
              height="18"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Active Order Section */}
      {activeOrder && (
        <div className="active-order-section">
          <div className="active-order-card">
            <div className="active-order-info">
              <h2>🚀 Active Order</h2>
              <p>
                Order ID: {activeOrder.id} &middot;{" "}
                <span className="status-badge">{activeOrder.status}</span>
              </p>
            </div>
            <Link to={`/track/${activeOrder.id}`} className="track-btn">
              Track Order
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width="16"
                height="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
