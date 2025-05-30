import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder } from "../API/orderApi";

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch {
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      try {
        await deleteOrder(id);
        setOrders((prev) => prev.filter((o) => o._id !== id && o.id !== id));
      } catch {
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-yellow-700">
        Quản lý đơn hàng
      </h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : orders.length === 0 ? (
        <div>Không có đơn hàng nào.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-yellow-100">
                <th className="py-2 px-3 border">STT</th>
                <th className="py-2 px-3 border">Mã đơn</th>
                <th className="py-2 px-3 border">Người nhận</th>
                <th className="py-2 px-3 border">Tổng tiền</th>
                <th className="py-2 px-3 border">Trạng thái</th>
                <th className="py-2 px-3 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => (
                <tr key={o._id || o.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border text-center">{idx + 1}</td>
                  <td className="py-2 px-3 border">
                    {o.orderCode || o._id || o.id}
                  </td>
                  <td className="py-2 px-3 border">
                    {o.receiverName || "Chưa rõ"}
                  </td>
                  <td className="py-2 px-3 border">
                    {o.total?.toLocaleString()}₫
                  </td>
                  <td className="py-2 px-3 border">
                    {o.status || "Chưa xác định"}
                  </td>
                  <td className="py-2 px-3 border text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(o._id || o.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManager;
