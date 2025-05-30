import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../API/bookApi";

const AdminBookManager = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch {
      setBooks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sách này?")) {
      try {
        await deleteBook(id);
        setBooks((prev) => prev.filter((b) => b._id !== id && b.id !== id));
      } catch {
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Quản lý sách</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : books.length === 0 ? (
        <div>Không có sách nào.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-green-100">
                <th className="py-2 px-3 border">STT</th>
                <th className="py-2 px-3 border">Tên sách</th>
                <th className="py-2 px-3 border">Giá bán</th>
                <th className="py-2 px-3 border">Giá gốc</th>
                <th className="py-2 px-3 border">Tác giả</th>
                <th className="py-2 px-3 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, idx) => (
                <tr key={b._id || b.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border text-center">{idx + 1}</td>
                  <td className="py-2 px-3 border">{b.title}</td>
                  <td className="py-2 px-3 border">
                    {b.salePrice?.toLocaleString()}₫
                  </td>
                  <td className="py-2 px-3 border">
                    {b.price?.toLocaleString()}₫
                  </td>
                  <td className="py-2 px-3 border">{b.author || "Chưa rõ"}</td>
                  <td className="py-2 px-3 border text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(b._id || b.id)}
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

export default AdminBookManager;
