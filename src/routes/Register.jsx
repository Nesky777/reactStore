import RegisterForm from "../components/Forms/RefisterForm";
import { Link, NavLink } from "react-router-dom";

const RegisterPage = () =>{
    return(<><RegisterForm />
    Masz konto? Zaloguj się: <Link to="/login">Logowanie </Link>
    </>);
}

export default RegisterPage;