import React, { useEffect, useState } from "react";
import { getOrdersByUser } from "../../API/orderApi";
import { updateUser } from "../../API/userApi";
import Header from "../../components/Header"; // Thêm dòng này

const statusStyle = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "shipping":
      return "bg-blue-100 text-blue-700";
    case "processing":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const statusText = (status) => {
  switch (status) {
    case "pending":
      return "Chờ xác nhận";
    case "processing":
      return "Đang xử lý";
    case "shipping":
      return "Đang giao";
    case "completed":
      return "Hoàn thành";
    case "cancelled":
      return "Đã hủy";
    default:
      return status || "Chưa xác định";
  }
};

const UserInfoPage = ({ userInfo }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // State cho form sửa thông tin
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser._id);
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
      setPhone(storedUser.phone || "");
      setAddress(storedUser.address || "");
    }
    if (storedUser?._id) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const data = await getOrdersByUser(storedUser._id);
          setOrders(data);
        } catch {
          setOrders([]);
        }
        setLoading(false);
      };
      fetchOrders();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }
    try {
      const updated = await updateUser(userId, {
        name,
        email,
        phone,
        address,
      });
      // Cập nhật lại localStorage
      localStorage.setItem("user", JSON.stringify(updated));
      setIsEdit(false);
      alert("Cập nhật thông tin thành công!");
    } catch {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <>
      <Header /> {/* Thêm dòng này */}
      <div className="h-[112px]"></div>
      <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-8 items-start">
        {/* Khối thông tin bên trái */}
        <div className="md:w-1/3 w-full bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-600 font-bold mb-4">
            {name ? name[0]?.toUpperCase() : "U"}
          </div>
          {isEdit ? (
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ tên"
                required
              />
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại"
              />
              <input
                className="w-full border rounded px-3 py-2 mb-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Địa chỉ"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setIsEdit(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="text-xl font-bold text-blue-700 mb-2">{name}</div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {email}
              </div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">SĐT:</span>{" "}
                {phone || "Chưa cập nhật"}
              </div>
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Địa chỉ:</span>{" "}
                {address || "Chưa cập nhật"}
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                onClick={() => setIsEdit(true)}
              >
                Sửa thông tin
              </button>
            </>
          )}
        </div>
        {/* Danh sách đơn hàng bên phải */}
        <div className="md:w-2/3 w-full bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-8 text-blue-700 text-center tracking-wide">
            Lịch sử đơn hàng của bạn
          </h2>
          {loading ? (
            <div className="text-center text-blue-600">Đang tải...</div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-500">
              Bạn chưa có đơn hàng nào.
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-blue-200 rounded-lg bg-blue-50 p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-700">
                        Mã đơn:
                      </span>
                      <span className="text-gray-800">
                        {order.orderCode || order._id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-700">
                        Ngày đặt:
                      </span>
                      <span className="text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-700">
                        Tổng tiền:
                      </span>
                      <span className="text-green-700 font-bold text-lg">
                        {order.totalPrice?.toLocaleString()}₫
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-700">
                        Trạng thái:
                      </span>
                      <span
                        className={
                          "px-3 py-1 rounded-full text-xs font-semibold border " +
                          statusStyle(order.status)
                        }
                      >
                        {statusText(order.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfoPage;
