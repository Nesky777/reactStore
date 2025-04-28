import React from "react";
import { Link, NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>

      <header className="bg-blue-200 text-white p-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Produkty</Link>
            </li>
          </ul>
        </nav>
      </header>


      <main className="p-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 My Shop</p>
      </footer>
    </div>
  );
};

export default Layout;
