import { describe, it, expect } from "@jest/globals";
import { add, isEven } from "./math";

describe("add", () => {
  it("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("adds positive and negative number", () => {
    expect(add(5, -2)).toBe(3);
  });

  it("adds two negative numbers", () => {
    expect(add(-4, -6)).toBe(-10);
  });

  it("adds number and zero", () => {
    expect(add(7, 0)).toBe(7);
  });
});

describe("isEven", () => {
  it("returns true for even number", () => {
    expect(isEven(4)).toBe(true);
  });

  it("returns false for odd number", () => {
    expect(isEven(5)).toBe(false);
  });
});
