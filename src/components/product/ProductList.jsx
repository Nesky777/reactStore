import ProductCard from "./ProductCard.jsx";
import styles from "../../styles/ProductList.module.css";
import useSWR from "swr";
import { fetcher } from "../../untils/fetch.js";
import { Link } from "react-router-dom"; 

const ProductList = () => {
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

  return (
    <div className="flex flex-row space-between">
      <div className={styles.container}>
        {data.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
