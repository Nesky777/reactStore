import { createContext, useState, useEffect } from "react";

 export const CartContext = createContext();



export const CartProvider = ({ children }) =>{
const [cartItems, setCartItems] = useState([]);



// Ładowanie koszyka z localStorage przy inicjalizacji
useEffect(() => {

 if (savedCart)

const savedCart = localStorage.getItem("cart");
setCartItems(JSON.parse(savedCart));

 }, []);



// Zapisywanie koszyka do localStorage przy zmianach
useEffect(() => {

 },
localStorage.setItem("cart", JSON.stringify(cartItems));
[cartItems]);

 const addToCart = (product) => {
 setCartItems([...cartItems, product]);
 };

 const removeFromCart = (productId) >{
 setCartItems(cartItems.filter(item => item.id !== productId));
 };
}