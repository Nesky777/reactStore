import "./App.css";
import Header from "./components/Header.jsx";
import ProductList from "./components/product/ProductList.jsx";

const mockUser = {
  name: "John Doe",
};

function App() {
  return (
    <>
      <div >
        <Header user={mockUser} />
        <ProductList />
      </div>
    </>
  );
}

export default App;
