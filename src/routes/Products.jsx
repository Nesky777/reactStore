import ProductList from "../components/product/ProductList";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

const ProductPage = () => {
  const location = useLocation();
  const fromLogin = location?.state?.fromLogin;

  return (
    <Layout>
      {fromLogin && (
        <span className="text-green-500">
          Logowanie się powiodło, możesz przeglądać produkty
        </span>
      )}
      <ProductList />
    </Layout>
  );
};

export default ProductPage;
