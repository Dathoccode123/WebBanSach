import React, { useState } from "react";
import "../index.css";
const Register = ({ onSubmit }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !password || !repassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password !== repassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    setError("");
    if (onSubmit) onSubmit({ fullname, email, password });
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Đăng ký
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Họ và tên"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded px-3 py-2"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-sm text-blue-600"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </span>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full border rounded px-3 py-2"
          placeholder="Nhập lại mật khẩu"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
        >
          Đăng ký
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        Đã có tài khoản?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </a>
      </div>
    </div>
  );
};

export default Register;
