import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/user/HomePage.jsx";
import DetailProductPage from "./page/user/DetailProductPage.jsx";
import CartPage from "./page/user/CartPage.jsx";
import LoginPage from "./page/user/LoginPage.jsx";
import RegisterPage from "./page/user/RegisterPage.jsx";
import AdminPage from "./page/admin/AdminPage.jsx";
import AdminUserPage from "./page/admin/AdminUserPage.jsx";
import AdminStatisticsPage from "./page/admin/AdminStatisticsPage.jsx";
import AdminBookPage from "./page/admin/AdminBookPage.jsx";
import AdminOrderPage from "./page/admin/AdminOrderPage.jsx";
import UserInfoPage from "./page/user/UserInfoPage.jsx";
import CheckoutPage from "./page/user/PaymentPage.jsx";
import SearchPage from "./page/user/SearchPage.jsx";
import SinglePaymentPage from "./page/user/SinglePaymentPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
        <Route path="/admin/statistics" element={<AdminStatisticsPage />} />
        <Route path="/admin/books" element={<AdminBookPage />} />
        <Route path="/admin/orders" element={<AdminOrderPage />} />
        <Route path="/info" element={<UserInfoPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pay/:id" element={<SinglePaymentPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
