import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CartProvider, useCart } from "../context/CartContext.jsx";

const sampleProduct = {
  _id: "prod-cart-01",
  name: "Tuscan Briefcase",
  price: 600,
  stock: 10,
  images: ["https://example.com/briefcase.jpg"],
};

function TestCartConsumer() {
  const { totalItems, subtotal, shipping, addToCart, updateQuantity, removeFromCart } = useCart();

  return (
    <div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="subtotal">{subtotal}</div>
      <div data-testid="shipping">{shipping}</div>
      <button onClick={() => addToCart(sampleProduct, 1)}>Add</button>
      <button onClick={() => updateQuantity(sampleProduct._id, 3)}>Update</button>
      <button onClick={() => removeFromCart(sampleProduct._id)}>Remove</button>
    </div>
  );
}

describe("CartContext Calculations", () => {
  it("adds items, updates quantities, and calculates shipping threshold correctly", () => {
    render(
      <CartProvider>
        <TestCartConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId("total-items").textContent).toBe("0");

    // 1. Add item ($600, qualifies for free shipping over $500)
    act(() => {
      screen.getByText("Add").click();
    });

    expect(screen.getByTestId("total-items").textContent).toBe("1");
    expect(screen.getByTestId("subtotal").textContent).toBe("600");
    expect(screen.getByTestId("shipping").textContent).toBe("0");

    // 2. Update quantity to 3 ($1800)
    act(() => {
      screen.getByText("Update").click();
    });

    expect(screen.getByTestId("total-items").textContent).toBe("3");
    expect(screen.getByTestId("subtotal").textContent).toBe("1800");

    // 3. Remove item
    act(() => {
      screen.getByText("Remove").click();
    });

    expect(screen.getByTestId("total-items").textContent).toBe("0");
    expect(screen.getByTestId("subtotal").textContent).toBe("0");
  });
});
