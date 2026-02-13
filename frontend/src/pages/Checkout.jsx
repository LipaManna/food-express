import { useCart } from "../context/CartContext";
import { useState } from "react";
import { createOrder } from "../services/api.service";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const { cart, clearCart, totalAmount, updateQuantity, removeFromCart } =
    useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = async () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all the fields");
      return;
    }
    setIsOrdering(true);
    try {
      const response = await createOrder({
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        customer: form,
      });
      localStorage.setItem("activeOrderId", response.id);
      clearCart();
      navigate(`/track/${response.id}`);
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-icon">🛒</div>
        <h2 className="checkout-empty-title">Your cart is empty</h2>
        <p className="checkout-empty-text">
          Add some items from the menu to get started!
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="checkout-empty-btn"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-page-title">Checkout</h1>
      <div className="checkout-grid">
        {/* Order Summary */}
        <div className="checkout-card">
          <h2 className="checkout-card-title">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="22"
              height="22"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Order Summary
          </h2>

          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item-info">
                  <span className="checkout-item-name">{item.name}</span>
                  <div className="checkout-item-qty">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn-sm"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="checkout-remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <span className="checkout-item-price">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="checkout-divider" />

          <div className="checkout-total">
            <span>Total</span>
            <span className="checkout-total-amount">₹{totalAmount}</span>
          </div>
        </div>

        {/* Delivery Form */}
        <div className="checkout-card">
          <h2 className="checkout-card-title">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="22"
              height="22"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Delivery Details
          </h2>

          <div className="checkout-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                id="checkout-name"
                type="text"
                placeholder="John Doe"
                className="form-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea
                id="checkout-address"
                placeholder="123 Main Street, Apt 4B"
                className="form-textarea"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                id="checkout-phone"
                type="text"
                placeholder="+91 98765 43210"
                className="form-input"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <button
              id="place-order-btn"
              onClick={handleOrder}
              className="place-order-btn"
              disabled={isOrdering}
            >
              {isOrdering ? (
                <>
                  <span className="spinner" /> Placing Order...
                </>
              ) : (
                <>
                  Place Order
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
