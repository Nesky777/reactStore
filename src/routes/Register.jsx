import RegisterForm from "../components/forms/RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const RegisterPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/products", {});
  }, [user, navigate]);

  return (
    <>
      <RegisterForm />
      <p>Masz już konto?</p>
      <Link to="/login">Zaloguj się</Link>
    </>
  );
};

export default RegisterPage;
