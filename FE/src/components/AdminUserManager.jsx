import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../API/userApi";

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u._id !== id && u.id !== id));
      } catch {
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Quản lý người dùng
      </h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : users.length === 0 ? (
        <div>Không có người dùng nào.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-2 px-3 border">STT</th>
                <th className="py-2 px-3 border">Họ tên</th>
                <th className="py-2 px-3 border">Email</th>
                <th className="py-2 px-3 border">Vai trò</th>
                <th className="py-2 px-3 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u._id || u.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border text-center">{idx + 1}</td>
                  <td className="py-2 px-3 border">{u.fullname}</td>
                  <td className="py-2 px-3 border">{u.email}</td>
                  <td className="py-2 px-3 border">{u.role || "user"}</td>
                  <td className="py-2 px-3 border text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(u._id || u.id)}
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

export default AdminUserManager;
