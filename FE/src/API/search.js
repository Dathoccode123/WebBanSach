import axios from "axios";

const API_BASE = "http://localhost:3000";

// User search
export const searchUser = async (q) => {
  const res = await axios.get(`${API_BASE}/search/user`, { params: { q } });
  return res.data;
};

// Product (Book) search
export const searchBook = async (q) => {
  const res = await axios.get(`${API_BASE}/search/book`, { params: { q } });
  return res.data;
};

// Order search
export const searchOrder = async (q) => {
  const res = await axios.get(`${API_BASE}/search/order`, { params: { q } });
  return res.data;
};
  