import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const yupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Pole username jest wymagane")
    .min(3, "Nazwa powinna mieć minimum 3 znaki")
    .max(20, "Nazwa powinna mieć maksymalnie 20 znaków"),
  email: yup
    .string()
    .required("Email jest wymagany")
    .email("Nieprawidłowy format email"),
  password: yup
    .string()
    .required("Pole hasło jest wymagane")
    .min(12, "Hasło powinno mieć minimum 12 znaków")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Hasło musi zawierać: 1 dużą literę, 1 małą literę i 1 cyfrę"
    ),
  confirmPassword: yup
    .string()
    .required("Potwierdzenie hasła jest wymagane")
    .oneOf([yup.ref("password")], "Hasła muszą być identyczne"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user]);

  const onSubmit = async (data) => {
    console.log("Dane formularza:", data);
    try {
      const response = await axios.post("https://fakestoreapi.com/users", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      // console.log(response, "___");
      if (response.data) {
        navigate("/login", { state: { fromRegister: true } });
      }
      console.log("Utworzono konto");
    } catch (e) {
      console.log(e, "___");
    }
  };

  const currentPassword = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="speca-y-4 mt-10">
      <h1>Rejestracja</h1>
      <div className="flex flex-col">
        <label>Username</label>
        <input
          autoFocus
          {...register("username", { required: "Username jest wymagany" })}
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
          autoFocus
          {...register("email", { required: "Email jest wymagany" })}
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
          {...register("password", {
            required: "Hasło jest wymagane",
            minLength: {
              value: 12,
              message: "Hasło musi mieć co najmniej 12 znaków",
            },
          })}
          className={errors.password ? "border-red-500" : "border-gray-500"}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label>Potwierdź hasło</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Potwierdzenie hasła jest wymagane",
            validate: (value) =>
              value === currentPassword || "Hasła nie są takie same",
          })}
          className={
            errors.confirmPassword ? "border-red-500" : "border-gray-500"
          }
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Zarejestruj się
      </button>
    </form>
  );
}
