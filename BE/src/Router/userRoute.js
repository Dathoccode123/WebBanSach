import express from 'express';
const UserRouter = express.Router();

import {
    getAllUser,
    registerUser,
    login,
    DeleteUser,
    updateProfile
} from "../Controller/userController.js";

import { isAuth, isAdmin } from "../until.js";

// Public routes
UserRouter.post('/register', registerUser);
UserRouter.post('/login', login);

// Admin-only routes
UserRouter.get('/', isAuth, isAdmin, getAllUser);
UserRouter.delete('/delete/:id', isAuth, isAdmin, DeleteUser);

// User-only routes
UserRouter.put('/profile', isAuth, updateProfile);

export default UserRouter;