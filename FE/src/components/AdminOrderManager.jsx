import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder, updateOrder } from "../API/orderApi";

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

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

  // Bắt đầu sửa trạng thái
  const handleEdit = (id, status) => {
    setEditId(id);
    setEditStatus(status);
  };

  // Lưu trạng thái mới (dùng API mới: updateOrder)
  const handleSave = async (id) => {
    try {
      await updateOrder(id, { status: editStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id || o.id === id ? { ...o, status: editStatus } : o
        )
      );
      setEditId(null);
    } catch {
      alert("Cập nhật thất bại!");
    }
  };

  // Hủy sửa
  const handleCancel = () => {
    setEditId(null);
    setEditStatus("");
  };

  // Lọc theo tên người nhận hoặc mã đơn
  const filteredOrders = orders.filter(
    (o) =>
      (o.userId?.name || "")
        .toLowerCase()
        .includes(search.trim().toLowerCase()) ||
      (o.orderCode || o._id || o.id || "")
        .toLowerCase()
        .includes(search.trim().toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-yellow-700">
        Quản lý đơn hàng
      </h2>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mã đơn..."
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : filteredOrders.length === 0 ? (
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
              {filteredOrders.map((o, idx) => (
                <tr key={o._id || o.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border text-center">{idx + 1}</td>
                  <td className="py-2 px-3 border">
                    {o.orderCode || o._id || o.id}
                  </td>
                  <td className="py-2 px-3 border">
                    {o.userId?.name || "Chưa rõ"}
                  </td>
                  <td className="py-2 px-3 border">
                    {o.totalPrice?.toLocaleString()}₫
                  </td>
                  <td className="py-2 px-3 border">
                    {editId === (o._id || o.id) ? (
                      <div className="flex items-center gap-2">
                        <select
                          className="border px-2 py-1 rounded focus:ring-2 focus:ring-blue-200"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="pending">Chờ xác nhận</option>
                          <option value="processing">Đang xử lý</option>
                          <option value="shipping">Đang giao</option>
                          <option value="completed">Hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                          onClick={() => handleSave(o._id || o.id)}
                          title="Lưu"
                        >
                          Lưu
                        </button>
                        <button
                          className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition"
                          onClick={handleCancel}
                          title="Hủy"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <span>
                        <span
                          className={
                            "px-2 py-1 rounded text-xs font-semibold " +
                            (o.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : o.status === "shipping"
                              ? "bg-blue-100 text-blue-700"
                              : o.status === "processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : o.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700")
                          }
                        >
                          {o.status === "pending"
                            ? "Chờ xác nhận"
                            : o.status === "processing"
                            ? "Đang xử lý"
                            : o.status === "shipping"
                            ? "Đang giao"
                            : o.status === "completed"
                            ? "Hoàn thành"
                            : o.status === "cancelled"
                            ? "Đã hủy"
                            : o.status || "Chưa xác định"}
                        </span>
                        <button
                          className="ml-2 text-blue-600 underline text-xs"
                          onClick={() =>
                            handleEdit(o._id || o.id, o.status || "")
                          }
                        >
                          Sửa
                        </button>
                      </span>
                    )}
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
