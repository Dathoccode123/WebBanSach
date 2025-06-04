import expressAsyncHandler from 'express-async-handler';
import { OrderModel } from '../model/orderModel.js';

export const createOrder = expressAsyncHandler(async (req, res) => {
    const {items, paymentMethod, status, totalPrice, userId } = req.body;

    const order = new OrderModel({
        items: items.map(item => ({
            bookId: item.bookId._id || item.bookId, // Đảm bảo bookId là ObjectId
            quantity: item.quantity,
        })),
        paymentMethod: paymentMethod,
        status: status || "pending",
        totalPrice: totalPrice,
        userId: userId,
    });

    const createdOrder = await order.save();
    return res.status(201).send({ message: "New order created", order: createdOrder });
});

export const GetAllOrder = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;

    let filter = {};
    if (userId) {
        filter.userId = userId;  // Đúng tên trường model: userId
        console.log("Fetching orders for user ID: ", userId);
    } else {
        console.log("Fetching all orders");
    }

    const orders = await OrderModel.find(filter)
        .populate('items.bookId')   // populate sách
        .populate('userId')         // populate thông tin user
        .sort({ createdAt: -1 });

    if (orders && orders.length > 0) {
        return res.send(orders);
    } else {
        return res.status(404).send({ message: "No orders found" });
    }
});

// Lấy tất cả đơn hàng của 1 user (GET /api/orders/user/:userId)
export const getOrdersByUser = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send({ message: "Missing userId" });
    }
    const orders = await OrderModel.find({ userId })
        .populate('items.bookId')
        .populate('userId')
        .sort({ createdAt: -1 });
    if (orders && orders.length > 0) {
        return res.send(orders);
    } else {
        return res.status(404).send({ message: "No orders found for this user" });
    }
});

export const DeleteOrder = expressAsyncHandler(async (req, res) => {
    const deleteOrder = await OrderModel.findById(req.params.id);

    if (deleteOrder) {
        await deleteOrder.deleteOne();
        return res.send({ message: "Order deleted" });
    } else {
        return res.status(404).send({ message: "Order not found" });
    }
});

export const updateOrder = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if(order){
        order.status = req.body.status || order.status; // Cập nhật trạng thái nếu có
    }
    const updateOrder = await order.save();
    if(updateOrder) {
        return res.send({ message: "Order updated successfully", order: updateOrder });
    }
    return res.status(404).send({ message: "Order not found" });
});