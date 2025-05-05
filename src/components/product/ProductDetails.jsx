import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import Layout from "../Layout";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(
    `https://fakestoreapi.com/products/${id}`,
    (url) => fetch(url).then((res) => res.json())
  );

  if (isLoading) {
    return <p>Trwa ładowanie...</p>;
  }

  if (error) {
    return <p>Wystąpił błąd</p>;
  }

  if (!data) {
    return <p>Produkt nie znaleziony</p>;
  }

  return (
    <Layout>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>{data.price} zł</p>
      <img src={data.image} alt={data.title} />
      <button
        onClick={() => navigate(-1)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Wstecz
      </button>
    </Layout>
  );
};

export default ProductDetails;

