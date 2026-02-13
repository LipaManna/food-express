import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MenuPage } from "./pages/MenuPage";
import { Checkout } from "./pages/Checkout";
import { OrderStatus } from "./components/OrderStatus";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import "./App.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track/:id" element={<OrderStatus />} />
          </Routes>
        </main>
      </CartProvider>
    </Router>
  );
}

export default App;
