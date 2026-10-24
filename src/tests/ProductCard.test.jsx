import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductCard from "../components/products/ProductCard.jsx";
import { CartProvider } from "../context/CartContext.jsx";

const mockProduct = {
  _id: "prod-test-01",
  name: "Royal Horology Tourbillon",
  price: 5200,
  compareAtPrice: 5800,
  category: { _id: "cat-1", name: "Horology" },
  images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"],
  stock: 4,
  rating: 4.9,
  numReviews: 12,
  isFeatured: true,
  isNewArrival: false,
};

describe("ProductCard Component", () => {
  it("renders product title, price, category, and sale badge correctly", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("Royal Horology Tourbillon")).toBeInTheDocument();
    expect(screen.getByText("Horology", { selector: "p" })).toBeInTheDocument();
    expect(screen.getByText("$5,200")).toBeInTheDocument();
    expect(screen.getByText("$5,800")).toBeInTheDocument();
    expect(screen.getByText(/special offer/i)).toBeInTheDocument();
  });
});
