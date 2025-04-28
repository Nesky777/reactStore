import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  username: yup
    .string()
    .required("User jest wymagany")
    .min(3, "Username musi mieć min. 3 znaki")
    .max(20, "Username może mieć maks. 20 znaków"),
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Podaj poprawny adres e-mail"),
  password: yup
    .string()
    .required("Hasło jest wymagane")
    .min(12, "Hasło musi mieć co najmniej 12 znaków")
    .matches(/[a-z]/, "Hasło musi zawierać małą literę")
    .matches(/[A-Z]/, "Hasło musi zawierać dużą literę")
    .matches(/\d/, "Hasło musi zawierać cyfrę"),
  confirmPassword: yup
    .string()
    .required("Powtórzenie hasła jest wymagane")
    .oneOf([yup.ref("password")], "Hasła nie są takie same"),
});

export default function RegisterForm() {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccess(false);
    setIsFormSubmitting(true);

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        data
      );
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        reset();
        navigate("/login", { state: { fromRegister: true} });
      } else {
        setApiError("Wystąpił nieoczekiwany błąd serwera.");
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
      <h1>Rejestracja</h1>

      {apiError && <span className="text-red-500">{apiError}</span>}
      {success && <span className="text-green-500">Rejestracja zakończona sukcesem!</span>}

      <div className="flex flex-col">
        <label>Username</label>
        <input
          autoFocus
          {...register("username")}
          className={errors.username ? "border-red-500" : "border-gray-500"}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-500" : "border-gray-500"}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Hasło</label>
        <input
          type="password"
          {...register("password")}
          className={errors.password ? "border-red-500" : "border-gray-500"}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Powtórz hasło</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className={
            errors.confirmPassword ? "border-red-500" : "border-gray-500"
          }
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting || isFormSubmitting}
      >
        Zarejestruj
      </button>
    </form>
  );
}
