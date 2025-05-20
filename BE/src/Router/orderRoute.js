import express from 'express';
import { createOrder, GetAllOrder,GetAllOrderInAMonth,DeleteOrder } from '../Controller/orderController.js';

const OrderRouter = express.Router();

OrderRouter.get('/',GetAllOrder);
OrderRouter.get('/:userId',GetAllOrder);
OrderRouter.post('/create',createOrder);
OrderRouter.get('/getOrder',GetAllOrderInAMonth);
OrderRouter.delete('/delete/:id',DeleteOrder);

export default OrderRouter;