import LoginForm from "../components/Forms/LoginForm"
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginPage = () =>{
    const location = useLocation();
    const fromRegister = location?.state?.fromRegister;
    return(
    <>
        <LoginForm fromRegister={fromRegister} />
        <div>
            Nie masz konta? Zarejstruj się: <NavLink to="/register">Register </NavLink>
        </div>
    </>
    );
}

export default LoginPage;