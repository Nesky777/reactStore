import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const yupSchema = yup.object().shape({
  title: yup.string().required("Nazwa jest wymagana").min(3, "minimalna długość 3 znaki").max(150, "Maksymalna długość 150 znaków"),
  price: yup.number().required("Cena jest wymagana").typeError("Cena musi być liczbą").positive("Cena musi być liczbą dodatnią").moreThan(0, "Cena musi być większa niż 0"),
  description: yup.string().max(550, "Opis może mieć maksymalnie 550 znaków"),
  category: yup.string().required("Kategoria jest wymagana"),
  image: yup.string().required("Obraz jest wymagany").url("Nieprawidłowy format URL obrazu"),
});

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = async (data) => {
    console.log("Dane formularza:", data);
    try {
      const response = await axios.post("https://fakestoreapi.com/users", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(response, "___");
    } catch (e) {
      console.log(e, "___");
    }
  };

  const currentPassword = watch("password");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="speca-y-4 mt-10">
      <h1>Dodaj produkt</h1>

      <div className="flex flex-col">
        <label>Nazwa</label>
        <input autoFocus {...register("title")} />
      </div>

      <div className="flex flex-col">
        <label>Cena</label>
        <input autofocus {...register("price")} />
      </div>

      <div>
        <label>Opis</label>
      </div>

      <div>
        <label>Kategoria</label>
      </div>

      <div>
        <label>Zdjęcie</label>
      </div>
    </form>
  );
}
