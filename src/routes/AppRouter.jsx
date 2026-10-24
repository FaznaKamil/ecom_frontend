import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import AccountLayout from "../layouts/AccountLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// Route Guards
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";

// Public Pages
import Home from "../pages/public/Home.jsx";
import Shop from "../pages/public/Shop.jsx";
import Categories from "../pages/public/Categories.jsx";
import CategoryProducts from "../pages/public/CategoryProducts.jsx";
import ProductDetails from "../pages/public/ProductDetails.jsx";
import SearchResults from "../pages/public/SearchResults.jsx";
import About from "../pages/public/About.jsx";
import Contact from "../pages/public/Contact.jsx";
import FAQ from "../pages/public/FAQ.jsx";
import PrivacyPolicy from "../pages/public/PrivacyPolicy.jsx";
import Terms from "../pages/public/Terms.jsx";
import ShippingPolicy from "../pages/public/ShippingPolicy.jsx";
import ReturnsPolicy from "../pages/public/ReturnsPolicy.jsx";

// Auth Pages
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";

// Checkout Pages
import CartPage from "../pages/checkout/CartPage.jsx";
import Checkout from "../pages/checkout/Checkout.jsx";
import OrderSuccess from "../pages/checkout/OrderSuccess.jsx";

// Customer Pages
import AccountOverview from "../pages/customer/AccountOverview.jsx";
import Orders from "../pages/customer/Orders.jsx";
import OrderDetail from "../pages/customer/OrderDetail.jsx";
import Addresses from "../pages/customer/Addresses.jsx";
import Wishlist from "../pages/customer/Wishlist.jsx";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import AdminProducts from "../pages/admin/Products.jsx";
import ProductForm from "../pages/admin/ProductForm.jsx";
import AdminCategories from "../pages/admin/Categories.jsx";
import AdminOrders from "../pages/admin/Orders.jsx";
import AdminOrderDetail from "../pages/admin/OrderDetail.jsx";
import AdminCustomers from "../pages/admin/Customers.jsx";
import AdminInventory from "../pages/admin/Inventory.jsx";
import AdminPromotions from "../pages/admin/Promotions.jsx";
import AdminReviews from "../pages/admin/Reviews.jsx";
import AdminMessages from "../pages/admin/Messages.jsx";
import AdminReports from "../pages/admin/Reports.jsx";
import AdminSettings from "../pages/admin/Settings.jsx";

import NotFound from "../pages/NotFound.jsx";

export function AppRouter() {
  return (
    <Routes>
      {/* 1. Public Retail Storefront */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<CategoryProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/returns-policy" element={<ReturnsPolicy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>

      {/* 2. Client Authentication Portal */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* 3. Customer Account Portal */}
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AccountOverview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="addresses" element={<Addresses />} />
      </Route>

      {/* 4. Executive Back-Office Admin Portal */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id/edit" element={<ProductForm />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="promotions" element={<AdminPromotions />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
