import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";

const yupSchema = yup.object().shape({
  username: yup.string().required("Pole username jest wymagane"),
  password: yup.string().required("Pole passowrd jest wymagane"),
});

export default function LoginForm() {
const [apiError, setApiError] = useState(null);
const [succes, setSucces] = useState(null);
const [isFormSubbmitting, setisFormSubbmitting] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = async (data) => {
    setApiError(null)
    setSucces(null)
    setisFormSubbmitting(true)
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        data
      );
      if (response) {
        setSucces(true);
        reset();
      }
      setisFormSubbmitting(false);
    } catch (e) {
      if (e.status === 401){
        setApiError(
            "Dane logowania są niepoprawne lub użytkownik nie istnieje"
        );
      } else {
        setApiError("Wystąpił nieznany błąd")
      }
      setisFormSubbmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
      <h1>Logowanie</h1>
      {apiError && <span>{apiError}</span>}
      {succes && <span>Sukces</span>}
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

      <button type="submit" className="btn btn-primary" disabled={isSubmitting || isFormSubbmitting}>
        Zaloguj się
      </button>
    </form>
  );
}
