import {OrderModel} from "../model/orderModel.js";

// Tạo thanh toán mới (giả lập)
export const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, amount } = req.body;
    // Giả lập xử lý thanh toán thành công
    // Có thể tích hợp với cổng thanh toán thực tế ở đây
    // Ví dụ: cập nhật trạng thái đơn hàng thành "Đã thanh toán"
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status: "Đã thanh toán", paymentMethod, paidAmount: amount },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json({ success: true, message: "Thanh toán thành công", order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// Lấy thông tin thanh toán của đơn hàng
export const getPaymentByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json({
      orderId: order._id,
      status: order.status,
      paymentMethod: order.paymentMethod,
      paidAmount: order.paidAmount,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
