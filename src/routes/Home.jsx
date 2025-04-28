import { Link, NavLink } from "react-router-dom";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <p>Lorem ipsum dolor sit amet.</p>
      <Link to="/login">Logowanie </Link>
      <NavLink to="/register">Register </NavLink>
      <Link to="/products">Produkty </Link>
    </Layout>
  );
};

export default HomePage;
