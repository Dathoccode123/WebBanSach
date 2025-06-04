import { UserModel } from "../model/userModel.js";
import { generateToken } from "../until.js";
import expressAsyncHandler from 'express-async-handler';

export const getAllUser = expressAsyncHandler(async (req, res) => {
    const users = await UserModel.find({});
    res.send(users);
});

export const registerUser = expressAsyncHandler(async (req, res) => {
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
        res.status(400).json({ message: 'Email đã được đăng ký' });
        return;
    }

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: '',
        phone: '',
        isAdmin: false,
    });

    const createdUser = await user.save();

    res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        address: createdUser.address,
        phone: createdUser.phone,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
});

export const login = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email, password: req.body.password  });
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    } else {
        res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
});

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    console.log(user);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'Xóa người dùng thành công' });
    } else {
        res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id); 

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            token: generateToken(updatedUser),
        });
    } else {
        res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
});