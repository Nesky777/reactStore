import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductList from "@/components/product/ProductList";

const useCart = () => {
  const context = useContext(CartContext);
  
  return context;
};

export default useCart;