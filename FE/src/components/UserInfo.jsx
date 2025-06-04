import React, { useState, useEffect } from "react";
import "../index.css";
import { updateUser } from "../API/userApi";

const UserInfo = ({
  initialName = "",
  initialEmail = "",
  initialAddress = "",
  initialPhone = "",
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);
  const [phone, setPhone] = useState(initialPhone);
  const [password, setPassword] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUserId(storedUser._id);
      if (storedUser.name) setName(storedUser.name);
      if (storedUser.email) setEmail(storedUser.email);
      if (storedUser.address) {
        setAddress(storedUser.address);
      } else {
        console.log("Không tìm thấy address trong localStorage");
      }
      if (storedUser.phone) {
        setPhone(storedUser.phone);
      } else {
        console.log("Không tìm thấy phone trong localStorage");
      }
      console.log("User data:", storedUser); // log dạng object
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEdit(false);
    if (!userId) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }
    try {
      await updateUser(userId, {
        name,
        email,
        address,
        phone,
        password: password || undefined, // Nếu không đổi thì không gửi lên
      });
      alert("Thông tin đã được cập nhật!");
      setPassword("");

      // Cập nhật lại thông tin người dùng trong localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...user, name, email, address, phone };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto mt-8"
    >
      <div className="mb-4 flex justify-between items-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Họ tên:
        </label>
        {!isEdit && (
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            Sửa
          </button>
        )}
      </div>
      <div className="mb-4">
        {isEdit ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ) : (
          <div className="py-2 px-3 bg-gray-100 rounded">
            {name || <span className="text-gray-400">Chưa có</span>}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        {isEdit ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ) : (
          <div className="py-2 px-3 bg-gray-100 rounded">
            {email || <span className="text-gray-400">Chưa có</span>}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Địa chỉ:
        </label>
        {isEdit ? (
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ) : (
          <div className="py-2 px-3 bg-gray-100 rounded">
            {address || <span className="text-gray-400">Chưa có</span>}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Số điện thoại:
        </label>
        {isEdit ? (
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ) : (
          <div className="py-2 px-3 bg-gray-100 rounded">
            {phone || <span className="text-gray-400">Chưa có</span>}
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mật khẩu mới:
        </label>
        {isEdit ? (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Để trống nếu không đổi"
          />
        ) : (
          <div className="py-2 px-3 bg-gray-100 rounded text-gray-400">
            ******
          </div>
        )}
      </div>
      {isEdit && (
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Lưu
        </button>
      )}
    </form>
  );
};

export default UserInfo;
