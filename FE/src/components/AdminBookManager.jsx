import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBook, updateBook } from "../API/bookApi";

const AdminBookManager = ({ books: booksProp }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    salePrice: "",
    price: "",
    amount: "",
    type: "",
    description: "", // Thêm description
  });

  // Nếu có props books (kết quả tìm kiếm), ưu tiên hiển thị
  useEffect(() => {
    if (booksProp) {
      setBooks(booksProp);
      setLoading(false);
    } else {
      fetchBooks();
    }
    // eslint-disable-next-line
  }, [booksProp]);

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

  const handleEdit = (book) => {
    setEditId(book._id || book.id);
    setEditData({
      name: book.name,
      salePrice: book.salePrice,
      price: book.price,
      amount: book.amount,
      type: book.type,
      description: book.description || "", // Thêm description
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
      await updateBook(_id, {
        name: editData.name,
        price: Number(editData.price),
        salePrice: Number(editData.salePrice),
        type: editData.type,
        amount: Number(editData.amount),
        description: editData.description, // Thêm description
      });
      setEditId(null);
      fetchBooks();
    } catch (err) {
      alert(`Cập nhật thất bại! Lỗi: ${err.message}`);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
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
                <th className="py-2 px-3 border">Số lượng</th>
                <th className="py-2 px-3 border">Thể loại</th>
                <th className="py-2 px-3 border">Mô tả</th> {/* Thêm mô tả */}
                <th className="py-2 px-3 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, idx) => {
                const isEditing = editId === (b._id || b.id);
                return (
                  <tr key={b._id || b.id} className="hover:bg-gray-50">
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
                        b.name
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="salePrice"
                          type="number"
                          value={editData.salePrice}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        b.salePrice?.toLocaleString() + "₫"
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="price"
                          type="number"
                          value={editData.price}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        b.price?.toLocaleString() + "₫"
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="amount"
                          type="number"
                          value={editData.amount}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        b.amount
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="type"
                          value={editData.type}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        b.type
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      {isEditing ? (
                        <input
                          name="description"
                          value={editData.description}
                          onChange={handleEditChange}
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        b.description
                      )}
                    </td>
                    <td className="py-2 px-3 border text-center space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                            onClick={() => handleEditSave(b._id || b.id)}
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
                            onClick={() => handleEdit(b)}
                            type="button"
                          >
                            Sửa
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            onClick={() => handleDelete(b._id || b.id)}
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

export default AdminBookManager;
