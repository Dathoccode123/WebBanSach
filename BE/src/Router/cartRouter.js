import express from "express";
import {
  getCartByUser,
  addToCart,
  removeFromCart,
  clearCart,
} from "../Controller/cartController.js";

const CartRouter = express.Router();

// Lấy giỏ hàng của user
CartRouter.get("/:userId", getCartByUser);

// Thêm hoặc cập nhật sản phẩm trong giỏ hàng
CartRouter.post("/add", addToCart);

// Xóa một sản phẩm khỏi giỏ hàng
CartRouter.post("/remove", removeFromCart);

// Xóa toàn bộ giỏ hàng của user
CartRouter.post("/clear", clearCart);

export default CartRouter;
