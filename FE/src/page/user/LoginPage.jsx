import React from "react";
import Header from "../../components/Header";
import Login from "../../components/Login";
import { loginUser } from "../../API/userApi";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    try {
      const res = await loginUser(form); // gọi API

      // Lưu token và thông tin user vào localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res._id,
          name: res.name ,
          email: res.email ,
          address: res.address ,
          phone: res.phone ,
          token: res.token ,
        })
      );

      alert("Đăng nhập thành công!");

      // Điều hướng theo vai trò
      if (res.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
        console.log(localStorage.getItem("user"));
      }
    } catch (err) {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <Login onSubmit={handleLogin} />
    </>
  );
};

export default LoginPage;
