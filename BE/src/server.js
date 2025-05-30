import express from "express";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import connectDB from "./Db.js";

// Routers
import UserRouter from "./Router/userRoute.js";
import BookRouter from "./Router/bookRoute.js";
import OrderRouter from "./Router/orderRoute.js";
import SearchRouter from "./Router/searchRouter.js";
import PaymentRouter from "./Router/paymentRouter.js";
import CartRouter from "./Router/cartRouter.js";

const app = express();
const PORT = 3000;
const SECRET_KEY = 'super-secret-key'; // để trong env file khi deploy

app.use(express.json());
app.use(cors());

// Middleware kiểm tra token
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Chưa có token' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token không hợp lệ' });
        req.user = user;
        next();
    });
}

// Kết nối DB
connectDB();

app.get('/', (req, res) => {
    res.send('Chào mừng đến với API sách');
});

// Gắn routers
app.use('/user', UserRouter);
app.use('/book', BookRouter);
app.use('/order', OrderRouter);
app.use('/search', SearchRouter);
app.use('/payment', PaymentRouter);
app.use('/cart', CartRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});