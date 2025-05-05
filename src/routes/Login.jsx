import LoginForm from "../components/Forms/LoginForm"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../components/hooks/useAuth";


const LoginPage = () =>{
    const location = useLocation();
    const fromRegister = location?.state?.fromRegister;
    const { user } = useAuth ();
    const navigate = useNavigate ();

    useEffect(() => {
        if (user) navigate("/products",{});   
    }, [user, navigate]);

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