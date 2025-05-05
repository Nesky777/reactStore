import "./App.css";
// import Header from "./components/Header.jsx";
// import ProductList from "./components/product/ProductList.jsx";
// import LoginForm from "./components/Forms/LoginForm.jsx";
// import RegisterForm from "./components/Forms/RefisterForm.jsx";
// import ProductAdd from "./components/product/ProductAdd.jsx";
import HomePage from "./routes/Home.jsx";
import ProductPage from "./routes/Products.jsx";
import LoginPage from "./routes/Login.jsx";
import RegisterPage from "./routes/Register.jsx";
import ProductDetails from "./components/product/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

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
            element={
                <ProductPage />
            }
          />
          <Route 
            path="/products/:id" 
            element={
                <ProductDetails />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
