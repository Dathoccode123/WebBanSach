import {UserModel} from "../model/userModel.js";
import {BookModel} from "../model/bookModel.js";
import {OrderModel} from "../model/orderModel.js";

// Tìm kiếm user theo tên hoặc email
export const searchUser = async (req, res) => {
  try {
    const { q } = req.query;
    const users = await UserModel.find({
      $or: [
        { fullname: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tìm kiếm book theo tên hoặc mô tả
export const searchBook = async (req, res) => {
  try {
    const { q } = req.query;
    const books = await BookModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } }
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tìm kiếm order theo mã đơn hoặc tên người nhận
export const searchOrder = async (req, res) => {
  try {
    const { q } = req.query;
    const orders = await OrderModel.find({
      $or: [
        { orderCode: { $regex: q, $options: "i" } },
        { receiverName: { $regex: q, $options: "i" } },
      ],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
