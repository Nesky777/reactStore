import React from "react";
import { render, screen } from "@testing-library/react";
import GreetingCard from "@/components/GreetingCard";

describe("GreetingCard", () => {
  it("renders the name in heading", () => {
    render(<GreetingCard name="Anna" />);
    expect(screen.getByText("Cześć, Anna!")).toBeInTheDocument();
  });

  it("does not render birthday message if age is not provided", () => {
    render(<GreetingCard name="Bartek" />);
    expect(screen.queryByText(/Wszystkiego najlepszego/)).toBeNull();
  });

  it("renders birthday message if age is provided", () => {
    render(<GreetingCard name="Kasia" age={25} />);
    expect(screen.getByText(/Wszystkiego najlepszego/)).toBeInTheDocument();
  });

  it("renders correctly even if isBirthday is true but age is missing", () => {
    render(<GreetingCard name="Marek" isBirthday={true} />);
    expect(screen.getByText("Cześć, Marek!")).toBeInTheDocument();
    expect(screen.queryByText(/Wszystkiego najlepszego/)).toBeNull();
  });
});
