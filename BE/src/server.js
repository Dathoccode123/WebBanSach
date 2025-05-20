import express from "express";
import UserRouter from "./Router/userRoute.js";
import BookRouter from "./Router/bookRoute.js";
import OrderRouter from "./Router/orderRoute.js";
const app = express();
const PORT = 3000;
import connectDB from "./Db.js";
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Chào mừng đến với API sách');
});

connectDB();
app.use('/user',UserRouter);
app.use('/book', BookRouter);
app.use('/order',OrderRouter);
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
});