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

// Admin-only routes
UserRouter.get('/', getAllUser);
// Public routes
UserRouter.post('/register', registerUser);
UserRouter.post('/login', login);

// Admin-only routes
UserRouter.get('/', getAllUser);
UserRouter.delete('/delete/:id', DeleteUser);

// User-only routes
UserRouter.put('/profile/:id', updateProfile);

export default UserRouter;