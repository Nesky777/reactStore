import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const yupSchema = yup.object().shape({
  username: yup.string().required("Pole username jest wymagane"),
  password: yup.string().required("Pole password jest wymagane"),
});

export default function LoginForm({fromRegister = false}) {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccess(false);
    setIsFormSubmitting(true);

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        data
      );

      if (response && response.data && response.data.token) {
        setSuccess(true);
        reset();
        navigate("/products", {
          state: {fromLogin: true}
        }); 
      } else {
        setApiError("Brak tokenu w odpowiedzi logowania");
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setApiError("Dane logowania są niepoprawne lub użytkownik nie istnieje");
      } else {
        setApiError("Wystąpił nieznany błąd");
      }
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
      <h1 className="text-2xl font-bold">Logowanie</h1>
      {fromRegister && (
        <span className="text-green-500">
        Rejstracja zakońcczona sukcesem. Możesz się zalogować
        </span>
  )}
      {apiError && !success && <span className="text-red-500">{apiError}</span>}
      {success && <span className="text-green-500">Sukces</span>}

      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          autoFocus
          {...register("username")}
          className={`border p-2 ${errors.username ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`border p-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary disabled:opacity-50"
        disabled={isSubmitting || isFormSubmitting}
      >
        Zaloguj się
      </button>
    </form>
  );
}
