import axios from "axios";

const API_BASE = "http://localhost:3000/payment";

// Tạo thanh toán mới
export const createPayment = async (data) => {
  const res = await axios.post(`${API_BASE}`, data);
  return res.data;
};

// Lấy thông tin thanh toán theo orderId
export const getPaymentByOrder = async (orderId) => {
  const res = await axios.get(`${API_BASE}/${orderId}`);
  return res.data;
};
