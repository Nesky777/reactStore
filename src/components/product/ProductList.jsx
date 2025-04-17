import ProductCard from "./ProductCard.jsx";
import styles from "../../styles/ProductList.module.css";
import useSWR from "swr";
import { fetcher } from "../../untils/fetch.js";
import ProductDetails from "./ProductDetails.jsx";
import { useState } from "react";

// const mockProduct = [
//   { id: 1, name: "Przykładowy produkt", price: 10 },
//   { id: 2, name: "Przykładowy produkt 2", price: 1 },
//   { id: 3, name: "Przykładowy produkt 3", price: 30 },
//   { id: 4, name: "Przykładowy produkt 4", price: 8 },
//   { id: 5, name: "Przykładowy produkt 5", price: 40 },
// ];

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data, error, isLoading } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );

  if (isLoading) {
    return <p>Trwa ładowanie</p>;
  }

  if (error) {
    return <p>Wystąpił błąd</p>;
  }

  // const [products, setProducts]= useState([])
  // useEffect(()=> {
  //     fetch("https://fakestoreapi.com/products")
  // .then((res)=>res.json())
  // .then((productsRes)=> setProducts(productsRes))
  // },[])

  return (
    <div className="flex flex-row space-between">
      <div className={styles.container}>
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      <ProductDetails selectedProduct={selectedProduct} />
    </div>
  );
};

export default ProductList;
