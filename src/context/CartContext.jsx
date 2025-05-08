import { useMemo, createContext, useState, useEffect, useCallback } from "react";
import ProductList from "../components/product/ProductList";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  // Ładowanie koszyka z localStorage przy inicjalizacji
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Zapisywanie koszyka do localStorage przy zmianach
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

const cartSum = useMemo(() => {
  return cartItems.reduce((total, item) => total + item.price, 0);
}, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartSum, setCartItems}}
    >
      {children}
    </CartContext.Provider>
  );
};
