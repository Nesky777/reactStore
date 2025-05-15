import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/product/ProductCard";
import { MemoryRouter } from "react-router-dom";

// Mock useCart hook
jest.mock("../hooks/useCart", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useCart from "../hooks/useCart";

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    title: "Produkt testowy",
    description:
      "Opis testowego produktu, który jest wystarczająco długi, aby był przycięty.",
    image: "https://via.placeholder.com/150",
    price: 99.99,
    category: "Testowa kategoria",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderuje dane produktu", () => {
    useCart.mockReturnValue({
      cartItems: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price.toFixed(2)} zł`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockProduct.image);
  });

  it("dodaje produkt do koszyka po kliknięciu przycisku", () => {
    const addToCartMock = jest.fn();

    useCart.mockReturnValue({
      cartItems: [],
      addToCart: addToCartMock,
      removeFromCart: jest.fn(),
    });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Dodaj do koszyka/i });
    fireEvent.click(button);

    expect(addToCartMock).toHaveBeenCalledWith(mockProduct);
  });

  it("usuwa produkt z koszyka, jeśli już się w nim znajduje", () => {
    const removeFromCartMock = jest.fn();

    useCart.mockReturnValue({
      cartItems: [mockProduct],
      addToCart: jest.fn(),
      removeFromCart: removeFromCartMock,
    });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Usuń z koszyka/i });
    fireEvent.click(button);

    expect(removeFromCartMock).toHaveBeenCalledWith(mockProduct.id);
  });

  it("renderuje poprawny link do szczegółów produktu", () => {
    useCart.mockReturnValue({
      cartItems: [],
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/products/${mockProduct.id}`);
  });
});
