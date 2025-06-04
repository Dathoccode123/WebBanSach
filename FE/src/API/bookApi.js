import axios from "axios";

const API_BASE = "http://localhost:3000/book";

// Lấy tất cả sách
export const getAllBooks = async () => {
  const res = await axios.get(`${API_BASE}`);
  return res.data;
};
export const getBooksByType = async (type) => {
  const res = await axios.get(`${API_BASE}/filter`, { params: { type } });
  return res.data;
};

// Lấy chi tiết sách theo id
export const getBookById = async (_id) => {
  const res = await axios.get(`${API_BASE}/find/${_id}`);
  return res.data;
};

// Thêm sách mới
export const createBook = async (data) => {
  const res = await axios.post(`${API_BASE}`, data);
  return res.data;
};

// Cập nhật sách
export const updateBook = async (_id, data) => {
  const res = await axios.put(`${API_BASE}/update/${_id}`, data);
  return res.data;
};

// Xóa sách
export const deleteBook = async (_id) => {
  const res = await axios.delete(`${API_BASE}/delete/${_id}`);
  return res.data;
};
