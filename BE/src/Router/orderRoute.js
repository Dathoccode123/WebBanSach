import express from 'express';
import { createOrder, GetAllOrder,DeleteOrder,getOrdersByUser,updateOrder } from '../Controller/orderController.js';

const OrderRouter = express.Router();

OrderRouter.get('/',GetAllOrder);
OrderRouter.get('/:userId',GetAllOrder);
OrderRouter.post('/create',createOrder);
OrderRouter.delete('/delete/:id',DeleteOrder);
OrderRouter.get("/user/:userId", getOrdersByUser);
OrderRouter.put("/order/:id", updateOrder);

export default OrderRouter;