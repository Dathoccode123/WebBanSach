import axios from "axios";

const API_BASE = "http://localhost:3000/cart";

// Lấy giỏ hàng của user
export const getCartByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/${userId}`);
  return res.data;
};

// Thêm hoặc cập nhật sản phẩm trong giỏ hàng
export const addToCart = async (data) => {
  // data: { userId, bookId, quantity }
  const res = await axios.post(`${API_BASE}/add`, data);
  return res.data;
};

// Xóa một sản phẩm khỏi giỏ hàng
export const removeFromCart = async (data) => {
  // data: { userId, bookId }
  const res = await axios.post(`${API_BASE}/remove`, data);
  return res.data;
};

// Xóa toàn bộ giỏ hàng của user
export const clearCart = async (data) => {
  // data: { userId }
  const res = await axios.post(`${API_BASE}/clear`, data);
  return res.data;
};
