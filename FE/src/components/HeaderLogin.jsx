import React from "react";
import { useNavigate } from "react-router-dom";
import "../main.css";

const HeaderLogin = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-blue-700 to-blue-300 mb-32">
      <div className="container mx-auto px-4 flex flex-col">
        {/* Top block */}
        <div className="py-1 text-sm">
          <div className="flex justify-between items-center">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-gray-200">
                  Thông Tin
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-200">
                  Chi Tiết
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-200">
                  Liên Hệ
                </a>
              </li>
            </ul>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-gray-200">
                  Chính Sách
                </a>
              </li>
              <li>
                <button className="text-white hover:text-gray-200 cursor-pointer">
                  <span>Ngô Bá Đạt</span>
                </button>
              </li>
              <li>
                <button 
                onClick={() => navigate("/")}
                className="hover:text-red-500 text-white cursor-pointer">
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom block */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 w-32 h-16">
              <button onClick={() => navigate("/")} className="w-full h-full">
                <img
                  src="../../public/img/logo.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sách..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Shopping cart */}
            <div className="flex items-center">
              <button className="flex items-center space-x-2 text-white hover:text-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Giỏ Hàng</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLogin;
