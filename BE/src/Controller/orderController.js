import expressAsyncHandler from 'express-async-handler';
import {OrderModel} from '../model/orderModel.js'

export const createOrder = expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        return res.status(400).send({ message: "Cart is empty" });}
    else{
        const order = new OrderModel({
            paymentMethod : req.body.paymentMethod,
            paymentResult : req.body.paymentResult,
            status: req.body.status ? req.body.status : "pending",
            user: req.body.user,
        })
        const createOrder = await order.save();
    return res
      .status(201)
      .send({ message: "New order created", order: createOrder });
    }
});

export const GetAllOrder = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
  
    let filter = {};
    if (userId) {
      filter.user = userId; // Nếu có userId trong URL thì lọc theo user
      console.log("Fetching orders for user ID: ", userId);
    } else {
      console.log("Fetching all orders"); // Nếu không có userId thì lấy tất cả đơn hàng
    }
  
    const orders = await OrderModel.find(filter).sort({ createdAt: -1 });
  
    if (orders && orders.length > 0) {
      return res.send(orders);
    } else {
      return res.status(404).send({ message: "No orders found" });
    }
  });

  export const DeleteOrder = expressAsyncHandler(async (req, res) => {
    const deleteOrder = await OrderModel.findById({ _id: req.params.id });
  
    if (deleteOrder) {
      await deleteOrder.remove();
      return res.send({ message: "Order deleted" }); // Thêm return
    } else {
      return res.status(404).send({ message: "Order not found" }); // Thêm return
    }
  });

  export const GetAllOrderInAMonth = expressAsyncHandler(async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Missing startDate or endDate" });
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Tìm đơn hàng theo khoảng thời gian
      const orders = await OrderModel.find({
        createdAt: {
          $gte: start,
          $lt: end,
        },
      });
  
      if (orders && orders.length > 0) {
        return res.json(orders);
      } else {
        return res.status(404).json({ message: "No orders in given date range" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });

