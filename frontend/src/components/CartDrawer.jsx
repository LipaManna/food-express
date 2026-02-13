import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalAmount,
    totalItems,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`cart-overlay ${isCartOpen ? "cart-overlay-visible" : ""}`}
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <div className={`cart-drawer ${isCartOpen ? "cart-drawer-open" : ""}`}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            <svg
              className="cart-drawer-title-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Your Cart
            {totalItems > 0 && (
              <span className="cart-drawer-count">({totalItems} items)</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="cart-drawer-close"
            aria-label="Close cart"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart items */}
        <div className="cart-drawer-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-title">Your cart is empty</p>
              <p className="cart-empty-subtitle">
                Add some delicious items from our menu!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                )}
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">
                    ₹{item.price} × {item.quantity}
                  </p>

                  {/* Quantity controls */}
                  <div className="cart-item-controls">
                    <div className="quantity-group">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                      aria-label="Remove item"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="cart-item-subtotal">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))
          )}
        </div>

     
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Subtotal</span>
              <span className="cart-total-value">₹{totalAmount}</span>
            </div>
            <p className="cart-delivery-note">
              Delivery charges calculated at checkout
            </p>
            <button
              id="proceed-checkout-btn"
              onClick={handleCheckout}
              className="checkout-btn"
            >
              Proceed to Checkout
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
            </button>
          </div>
        )}
      </div>
    </>
  );
};
