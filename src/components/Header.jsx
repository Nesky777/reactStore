import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div>
        <p>{user?.name || "Nieznany użytkownik"}</p>
      </div>
      <h2>Sklep internetowy</h2>
      {user && (
        <button
          onClick={handleLogout}
          className="btn btn-secondary"
        >
          Wyloguj się
        </button>
      )}
    </div>
  );
}

export default Header;

