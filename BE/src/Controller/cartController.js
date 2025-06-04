// Lấy giỏ hàng của user từ userId
import { CartModel } from "../model/cartModel.js";

export const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await CartModel.findOne({ userId: userId }).populate("items.bookId");


    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    res.json(cart);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// Thêm hoặc cập nhật sản phẩm trong giỏ hàng
export const addToCart = async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ bookId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity });
      }
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa một sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa toàn bộ giỏ hàng của user
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }
    cart.items = [];
    await cart.save();
    res.json({ message: "Đã xóa toàn bộ giỏ hàng" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
