import { Link, NavLink } from "react-router-dom"
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ProductPage from "./Products";

const HomePage = () =>{
    return(
        <div>
            <h1>Home</h1>
            <p>Lorem ipsum dolor sit amet.</p>
            <Link to="/login">Logowanie </Link>
            <NavLink to="/register">Register </NavLink>
            <Link to="/products">Produkty </Link>
        </div>
    );
}

export default HomePage;