import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "../API/userApi";
import { searchUser } from "../API/search"; // Thêm dòng này

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [search, setSearch] = useState(""); // Thêm state cho input tìm kiếm

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      fetchUsers();
      return;
    }
    setLoading(true);
    try {
      const data = await searchUser(search);
      setUsers(data);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } catch {
        alert("Xóa thất bại!");
      }
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id || user.id);
    setEditData({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone || "",
      address: user.address || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = async (_id) => {
    try {
      await updateUser(_id, editData);
      setEditId(null);
      fetchUsers();
    } catch {
      alert("Cập nhật thất bại!");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Quản lý người dùng
      </h2>
      {/* Form tìm kiếm */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </form>
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
                <th className="py-2 px-3 border">Tên</th>
                <th className="py-2 px-3 border">Email</th>
                <th className="py-2 px-3 border">Mật khẩu</th>
                <th className="py-2 px-3 border">Số điện thoại</th>
                <th className="py-2 px-3 border">Địa chỉ</th>
                <th className="py-2 px-3 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => {
                const isEditing = editId === (u._id || u.id);
                return (
                  <tr key={u._id || u.id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border text-center">{idx + 1}</td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        u.name
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="email"
                          value={editData.email}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        u.email
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="password"
                          value={editData.password}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                          placeholder="Để trống nếu không đổi"
                        />
                      ) : (
                        <span className="text-gray-400">******</span>
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="phone"
                          value={editData.phone}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        u.phone || (
                          <span className="text-gray-400">Chưa có</span>
                        )
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="address"
                          value={editData.address}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        u.address || (
                          <span className="text-gray-400">Chưa có</span>
                        )
                      )}
                    </td>
                    <td className="py-2 px-3 border text-center space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                            onClick={() => handleEditSave(u._id || u.id)}
                            type="button"
                          >
                            Lưu
                          </button>
                          <button
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                            onClick={handleEditCancel}
                            type="button"
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            onClick={() => handleEdit(u)}
                            type="button"
                          >
                            Sửa
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            onClick={() => handleDelete(u._id || u.id)}
                            type="button"
                          >
                            Xóa
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserManager;
