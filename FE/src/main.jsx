import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetail from "./components/ProductDetail";
import HeaderLogin from "./components/HeaderLogin";

const Home = () => (
  <>
    <Header />
    <Banner />
    <Categories />
    <ProductList />
  </>
);

const LoginPage = () => (
  <>
    <Header />
    <Login />
  </>
);

const RegisterPage = () => (
  <>
    <Header />
    <Register />
  </>
);

const ProductDetailPage = () => (
  <>
    <Header />
    <ProductDetail />
  </>
);
const LoginPageSuccess =() =>(
  <>
    <HeaderLogin/>
    <Banner />
    <Categories />
    <ProductList />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login-success" element={<LoginPageSuccess />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
