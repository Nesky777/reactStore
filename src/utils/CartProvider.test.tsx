import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { CartContext, CartProvider } from "@/context/CartContext"; 
import { Product } from "@/types/product";
import userEvent from "@testing-library/user-event";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "Test description",
  image: "test.jpg",
  price: 99.99,
  category: "Test",
};

const renderWithCart = (ui: React.ReactNode) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds item to cart", async () => {
    let context: any;

    const TestComponent = () => {
      context = React.useContext(CartContext);
      return <button onClick={() => context.addToCart(mockProduct)}>Add</button>;
    };

    renderWithCart(<TestComponent />);
    await userEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(context.cartItems).toHaveLength(1);
      expect(context.cartItems[0]).toEqual(mockProduct);
    });
  });

  it("removes item from cart", async () => {
    let context: any;

    const TestComponent = () => {
      context = React.useContext(CartContext);
      return (
        <>
          <button onClick={() => context.addToCart(mockProduct)}>Add</button>
          <button onClick={() => context.removeFromCart(mockProduct.id)}>Remove</button>
        </>
      );
    };

    renderWithCart(<TestComponent />);
    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("Remove"));

    await waitFor(() => {
      expect(context.cartItems).toHaveLength(0);
    });
  });

  it("clears the cart", async () => {
    let context: any;

    const TestComponent = () => {
      context = React.useContext(CartContext);
      return (
        <>
          <button onClick={() => context.addToCart(mockProduct)}>Add</button>
          <button onClick={context.clearCart}>Clear</button>
        </>
      );
    };

    renderWithCart(<TestComponent />);
    await userEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(context.cartItems).toHaveLength(1);
    });

    await userEvent.click(screen.getByText("Clear"));

    await waitFor(() => {
      expect(context.cartItems).toHaveLength(0);
    });
  });

  it("calculates totalPrice correctly", async () => {
    let context: any;

    const TestComponent = () => {
      context = React.useContext(CartContext);
      return <button onClick={() => context.addToCart(mockProduct)}>Add</button>;
    };

    renderWithCart(<TestComponent />);
    await userEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(Number(context.totalPrice)).toBeCloseTo(99.99);
    });
  });

  it("loads cart from localStorage", () => {
    localStorage.setItem("cart", JSON.stringify([mockProduct]));
    let context: any;

    const TestComponent = () => {
      context = React.useContext(CartContext);
      return <div data-testid="loaded">{context.cartItems.length}</div>;
    };

    renderWithCart(<TestComponent />);

    expect(screen.getByTestId("loaded").textContent).toBe("1");
  });
});
