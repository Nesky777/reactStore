import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="flex flex-col items-center">
      <p className="text-2xl text-red-500">{product.title}</p>
      <p>{product.price.toFixed(2)}zł</p>
      <img src={product.image} width="120px" />
    </Link>
  );
};

export default ProductCard;
