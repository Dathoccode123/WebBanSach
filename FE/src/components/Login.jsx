import React, { useState } from "react";
import "../index.css";
const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    setError("");
    if (onSubmit) onSubmit({ email, password });
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Đăng nhập
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-600" />
            Ghi nhớ đăng nhập
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </a>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Đăng nhập
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        Chưa có tài khoản?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
};

export default Login;
