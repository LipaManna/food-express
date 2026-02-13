import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-icon">🍕</span>
          <span className="navbar-brand-text">FoodExpress</span>
        </Link>

      
        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${isActive("/") ? "navbar-link-active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`navbar-link ${isActive("/menu") ? "navbar-link-active" : ""}`}
          >
            Menu
          </Link>
        </div>

        
        <button
          id="cart-toggle-btn"
          onClick={toggleCart}
          className="cart-btn"
          aria-label="Open cart"
        >
          <svg
            className="cart-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </nav>
  );
};
