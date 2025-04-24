import "./App.css";
import Header from "./components/Header.jsx";
import ProductList from "./components/product/ProductList.jsx";
import LoginForm from "./components/Forms/LoginForm.jsx";
import RegisterForm from "./components/Forms/RefisterForm.jsx";
import ProductAdd from "./components/product/ProductAdd.jsx";

const mockUser = {
  name: "John Doe",
};

function App() {
  return (
    <>
      <div >
        <Header user={mockUser} />
        {/* <ProductList /> */}
        {/* <LoginForm />
        <RegisterForm /> */}
        <ProductAdd />
      </div>
    </>
  );
}

export default App;
