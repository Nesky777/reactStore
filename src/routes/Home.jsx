import { Link, NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] text-center gap-4">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="text-gray-300">This is the home page of our application</p>

      <div className="flex flex-col gap-2">
        <Link to="/login" className="text-blue-400 hover:underline">
          Logowanie
        </Link>
        <Link to="/register" className="text-blue-400 hover:underline">
          Rejestracja
        </Link>
        <Link to="/products" className="text-blue-400 hover:underline">
          Lista produktów
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

