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
      const res = await loginUser(form);
      // Xử lý lưu token nếu cần
      // localStorage.setItem("token", res.token);
      alert("Đăng nhập thành công!");
      if (res.isAdmin === true) {
        navigate("/admin");
      } else {
        navigate("/");
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
