import React from "react";
import Header from "../../components/Header";
import Register from "../../components/Register";
import { registerUser } from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    try {
      await registerUser(form);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      alert("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <Register onSubmit={handleRegister} />
    </>
  );
};

export default RegisterPage;
