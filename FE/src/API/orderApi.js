import axios from "axios";

const API_BASE = "http://localhost:3000/order";

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  const res = await axios.get(`${API_BASE}`);
  return res.data;
};

// Lấy chi tiết đơn hàng theo id
export const getOrderById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

// Lấy tất cả đơn hàng của 1 user
export const getOrdersByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/user/${userId}`);
  return res.data;
};

// Cập nhật đơn hàng
export const updateOrder = async (id, data) => {
  const res = await axios.put(`${API_BASE}/order/${id}`, data);
  return res.data;
};

// Tạo đơn hàng mới
export const createOrder = async (data) => {
  const res = await axios.post(`${API_BASE}/create`, data);
  return res.data;
};

// Xóa đơn hàng
export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_BASE}/delete/${id}`);
  return res.data;
};
