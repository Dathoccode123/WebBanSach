const UserRouter = express.Router()
import { getAllUser, registerUser, login, DeleteUser, updateProfile } from "../Controller/userController.js"
import express from 'express'
import { isAdmin, isAuth } from "../until.js"

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)
UserRouter.put('/profile', isAuth, updateProfile);
export default UserRouter;