import LoginForm from "../components/forms/LoginForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const location = useLocation();
  // console.log(location);
  const fromRegister = location?.state?.fromRegister;
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user, "here");

  useEffect(() => {
    if (user) navigate("/products", {});
  }, [user, navigate]);

  return (
    <>
      <LoginForm fromRegister={fromRegister} />
      <div>
        <p>Nie masz konta?</p>
        <Link to="/register">Zarejestruj się</Link>
      </div>
    </>
  );
};

export default LoginPage;
