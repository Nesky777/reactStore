// src/App.jsx
import "./App.css";
import HomePage from "./routes/Home.jsx";
import ProductPage from "./routes/Products.jsx";
import LoginPage from "./routes/Login.jsx";
import RegisterPage from "./routes/Register.jsx";
import ProductDetails from "./components/product/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/products"
              element={<ProductPage />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

