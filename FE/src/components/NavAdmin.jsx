import React from "react";
import { Link } from "react-router-dom";

const NavAdmin = () => {
  return (
    <nav className="fixed top-0 left-0 h-full w-56 bg-blue-800 text-white flex flex-col shadow-lg z-40">
      <div className="text-2xl font-bold py-6 px-6 border-b border-blue-700">
        Admin Panel
      </div>
      <ul className="flex-1 px-4 py-6 space-y-2">
        <li>
          <Link
            to="/admin/users"
            className="block py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Quản lý người dùng
          </Link>
        </li>
        <li>
          <Link
            to="/admin/books"
            className="block py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Quản lý sách
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="block py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Quản lý đơn hàng
          </Link>
        </li>
        <li>
          <Link
            to="/admin/statistics"
            className="block py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Thống kê
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavAdmin;
