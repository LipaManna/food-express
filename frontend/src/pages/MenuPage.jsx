import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";

export const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}api/menu`)
      .then((res) => setMenu(res.data));
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    openCart();
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <p className="menu-subtitle">Fresh, hot, and made with love</p>
      </div>
      <div className="menu-grid">
        {menu.map((item) => (
          <div key={item.id} className="menu-card">
            <div className="menu-card-image-wrapper">
              <img
                src={item.image}
                alt={item.name}
                className="menu-card-image"
              />
            </div>
            <div className="menu-card-body">
              <h2 className="menu-card-name">{item.name}</h2>
              <p className="menu-card-desc">{item.description}</p>
              <div className="menu-card-footer">
                <span className="menu-card-price">₹{item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-btn"
                >
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
