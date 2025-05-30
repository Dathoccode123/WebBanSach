import express from "express";
import {
  createPayment,
  getPaymentByOrder,
} from "../Controller/paymentController.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/", createPayment); // POST /payment
PaymentRouter.get("/:orderId", getPaymentByOrder); // GET /payment/:orderId

export default PaymentRouter;
