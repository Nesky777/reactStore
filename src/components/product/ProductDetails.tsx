// import useSWR from "swr";
// import { fetcher } from "../../utils/fetch";
// import useCart from "../../hooks/useCart";
// import { ApiResponse } from "@/types/api";
// import { Product } from "@/types/product";

// const ProductDetails = ({ id }) => {
//   const { data, error, isLoading }: ApiResponse<Product[]> = useSWR(
//     `https://fakestoreapi.com/products/${id}`,
//     fetcher
//   );

//   const { cartItems, addToCart, removeFromCart } = useCart();

//   const isInCart = cartItems.some((item) => item.id === data?.id);

//   const handleCartAction = () => {
//     if (isInCart) {
//       removeFromCart(data.id);
//     } else {
//       addToCart(data);
//     }
//   };

//   if (isLoading) return <span>Trwa pobieranie danych produktu</span>;
//   if (error) return <span>Wystąpił błąd</span>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-4">
//       <h2 className="text-2xl font-bold">{data.title}</h2>
//       <img src={data.image} alt={data.title} className="w-64 h-auto" />
//       <p className="text-gray-600">{data.category}</p>
//       <p>{data.description}</p>
//       <button
//         onClick={handleCartAction}
//         className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
//       >
//         {isInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
//       </button>
//     </div>
//   );
// };

// export default ProductDetails;

import useSWR from "swr";
import { fetcher } from "../../utils/fetch";
import useCart from "../../hooks/useCart";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import React from "react";

const ProductDetails = ({ productId : number }) => {
  const { data, error, isLoading }: ApiResponse<Product[]> = useSWR(
    `https://fakestoreapi.com/products/${productId}`,
    fetcher
  );

  const { cartItems, addToCart, removeFromCart } = useCart();

  const isInCart = cartItems.some((item: Product) => item.id === data?.id);

  const handleCartAction = () => {
    if (!data) return;

    if (isInCart) {
      removeFromCart(data.id);
    } else {
      addToCart(data);
    }
  };

  if (isLoading) return <span>Trwa pobieranie danych produktu</span>;
  if (error || !data) return <span>Wystąpił błąd</span>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <img src={data.image} alt={data.title} className="w-64 h-auto" />
      <p className="text-gray-600">{data.category}</p>
      <p>{data.description}</p>
      <button
        onClick={handleCartAction}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {isInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
      </button>
    </div>
  );
};

export default ProductDetails;
