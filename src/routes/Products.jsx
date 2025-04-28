import ProductList from "../components/product/ProductList";
import { Link, useLocation } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();
  const fromLogin = location?.state?.fromLogin;
  console.log(location);
  return (
    <>
      {fromLogin && (
        <span className="text-green-500">
          Logowanie się powiodło, możesz przeglądać produkty
        </span>
      )}
      <ProductList />
    </>
  );
};

export default ProductPage;
