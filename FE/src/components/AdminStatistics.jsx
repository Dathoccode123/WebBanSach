import React, { useEffect, useState } from "react";
import { getAllUsers } from "../API/userApi";
import { getAllBooks } from "../API/bookApi";
import { getAllOrders } from "../API/orderApi";

const AdminStatistics = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getAllUsers();
        const books = await getAllBooks();
        const orders = await getAllOrders();

        setUserCount(users.length);
        setBookCount(books.length);
        setOrderCount(orders.length);

        // Tổng doanh thu từ các order đã hoàn thành
        const revenue = orders
          .filter((o) => o.status === "completed")
          .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        setTotalRevenue(revenue);

        // Tổng số sách trong kho (giả sử mỗi book có trường quantity)
        const stock = books.reduce((sum, b) => sum + (b.amount || 0), 0);
        setTotalStock(stock);

        // Số đơn hàng chưa xử lý (pending)
        const pending = orders.filter((o) => o.status === "pending").length;
        setPendingCount(pending);
      } catch (err) {
        setUserCount(0);
        setBookCount(0);
        setOrderCount(0);
        setTotalRevenue(0);
        setTotalStock(0);
        setPendingCount(0);
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
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center md:col-span-1">
        <span className="text-4xl font-bold text-orange-600">
          {pendingCount}
        </span>
        <span className="mt-2 text-lg font-semibold text-gray-700">
          Đơn hàng chưa xử lý
        </span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center md:col-span-1">
        <span className="text-4xl font-bold text-red-600">
          {totalRevenue.toLocaleString()}₫
        </span>
        <span className="mt-2 text-lg font-semibold text-gray-700">
          Doanh thu (đã hoàn thành)
        </span>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center md:col-span-1">
        <span className="text-4xl font-bold text-purple-700">{totalStock}</span>
        <span className="mt-2 text-lg font-semibold text-gray-700">
          Tổng số sách trong kho
        </span>
      </div>
    </div>
  );
};

export default AdminStatistics;
