import axios from "axios";

const API_BASE = "http://localhost:3000/user";

// Lấy tất cả user
export const getAllUsers = async () => {
  const res = await axios.get(`${API_BASE}`);
  return res.data;
};

// Lấy chi tiết user theo id
export const getUserById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

// Đăng ký user mới
export const registerUser = async (data) => {
  const res = await axios.post(`${API_BASE}/register`, data);
  return res.data;
};

// Đăng nhập user
export const loginUser = async (data) => {
  const res = await axios.post(`${API_BASE}/login`, data);
  return res.data;
};

// Cập nhật user
export const updateUser = async (id, data) => {
  const res = await axios.put(`${API_BASE}/${id}`, data);
  return res.data;
};

// Xóa user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
