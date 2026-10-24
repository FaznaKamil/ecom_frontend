import { createContext, useContext, useState, useEffect } from "react";
import cartService from "../services/cartService.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => cartService.getStoredCart());
  const [wishlist, setWishlist] = useState(() => cartService.getStoredWishlist());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Persist cart
  useEffect(() => {
    cartService.saveCart(items);
  }, [items]);

  // Persist wishlist
  useEffect(() => {
    cartService.saveWishlist(wishlist);
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock || 99);
        return prev.map((item) =>
          item.product._id === product._id ? { ...item, quantity: newQty } : item
        );
      } else {
        return [
          ...prev,
          {
            product: {
              _id: product._id,
              name: product.name,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              images: product.images,
              stock: product.stock,
              sku: product.sku,
            },
            quantity: Math.min(quantity, product.stock || 99),
          },
        ];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock || 99) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    setCouponError("");
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p._id === productId);
  };

  // Calculations
  const subtotal = items.reduce(
    (acc, item) => acc + (item.product.price || 0) * item.quantity,
    0
  );

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping over $500, otherwise $25 flat rate
  const shipping = items.length === 0 ? 0 : subtotal >= 500 ? 0 : 25;

  let discountAmount = 0;
  if (coupon) {
    if (coupon.discountType === "percentage") {
      discountAmount = (subtotal * coupon.discountRate) / 100;
    } else {
      discountAmount = Math.min(coupon.discountAmount, subtotal);
    }
  }

  const tax = items.length === 0 ? 0 : Number(((subtotal - discountAmount) * 0.08).toFixed(2));
  const total = items.length === 0 ? 0 : Number((subtotal - discountAmount + shipping + tax).toFixed(2));

  const applyCoupon = async (code) => {
    setCouponError("");
    try {
      const res = await cartService.validateCoupon(code, subtotal);
      if (res?.data) {
        setCoupon(res.data);
        return { success: true, data: res.data };
      }
    } catch (err) {
      setCouponError(err.message || "Invalid coupon code");
      setCoupon(null);
      return { success: false, message: err.message };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError("");
  };

  const value = {
    items,
    wishlist,
    totalItems,
    subtotal,
    shipping,
    tax,
    total,
    coupon,
    couponError,
    isDrawerOpen,
    setIsDrawerOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isInWishlist,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
