import React, { useEffect, useState } from "react";
import { getAllUsers } from "../API/userApi";
import { getAllBooks } from "../API/bookApi";
import { getAllOrders } from "../API/orderApi";

const AdminStatistics = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getAllUsers();
        const books = await getAllBooks();
        const orders = await getAllOrders();
        setUserCount(users.length);
        setBookCount(books.length);
        setOrderCount(orders.length);
      } catch (err) {
        setUserCount(0);
        setBookCount(0);
        setOrderCount(0);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-4xl font-bold text-blue-700">{userCount}</span>
        <span className="mt-2 text-lg font-semibold text-gray-700">
          Người dùng
        </span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-4xl font-bold text-green-700">{bookCount}</span>
        <span className="mt-2 text-lg font-semibold text-gray-700">Sách</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-4xl font-bold text-yellow-600">{orderCount}</span>
        <span className="mt-2 text-lg font-semibold text-gray-700">
          Đơn hàng
        </span>
      </div>
    </div>
  );
};

export default AdminStatistics;
