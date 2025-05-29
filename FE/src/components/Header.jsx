import React from "react";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../index.css";

const Header = () => {
  return (
    <header className="w-full bg-blue-600 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar: Đăng ký, Đăng nhập */}
        <div className="flex justify-end items-center space-x-6 py-2 text-white text-sm">
          <Link to="/register" className="flex items-center hover:underline">
            <FaUserCircle className="mr-1" /> Đăng ký
          </Link>
          <span>|</span>
          <Link to="/login" className="flex items-center hover:underline">
            <FaUserCircle className="mr-1" /> Đăng nhập
          </Link>
        </div>
        {/* Main bar: Logo, Search, Cart */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-white font-bold text-2xl"
          >
            <span className="bg-white text-blue-600 rounded-full px-3 py-1 mr-2">
              B
            </span>
            BookStore
          </Link>
          {/* Search */}
          <div className="flex-1 mx-8">
            <div className="flex">
              <input
                type="text"
                placeholder="Tìm kiếm sách..."
                className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
              />
              <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-r-md text-white">
                <FaSearch />
              </button>
            </div>
          </div>
          {/* Cart */}
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative text-white hover:text-yellow-300"
            >
              <FaShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
