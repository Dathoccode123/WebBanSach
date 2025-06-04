import React, { useEffect, useState } from "react";
import { getCartByUser, clearCart } from "../../API/cartApi";
import { createOrder } from "../../API/orderApi";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import Header from "../../components/Header"; // Thêm dòng này

const PaymentPage = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: "",
    _id: "",
  });
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user._id) {
      fetchCart(user._id);
    }
  }, [user._id]);

  const fetchCart = async (userId) => {
    try {
      const data = await getCartByUser(userId);
      setCart(data.items || []);
    } catch (error) {
      setCart([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const getTotal = () =>
    cart.reduce((sum, item) => {
      if (!item.bookId || !item.bookId.salePrice) return sum;
      return sum + item.bookId.salePrice * item.quantity;
    }, 0);

  const handleOrder = async () => {
    if (!user.name || !user.phone || !user.address) {
      alert("Vui lòng nhập đầy đủ thông tin người nhận!");
      return;
    }
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }
    try {
      await createOrder({
        items: cart.map((item) => ({
          bookId: item.bookId._id,
          quantity: item.quantity,
        })),
        paymentMethod: payment,
        status: "pending",
        totalPrice: getTotal(),
        userId: user._id,
      });
      await clearCart(user._id);
      alert("Đặt hàng thành công!");
      navigate("/cart");
    } catch (error) {
      alert("Đặt hàng thất bại!");
    }
  };

  return (
    <>
      <Header /> {/* Thêm dòng này */}
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
        <div className="max-w-3xl mx-auto mt-8 mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 tracking-wide drop-shadow">
            Thanh toán đơn hàng
          </h2>

          {/* Thông tin người nhận */}
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-blue-100">
            <h3 className="font-semibold mb-4 text-lg text-blue-700 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-blue-600 rounded-full"></span>
              Thông tin người nhận
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Tên người nhận
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                  className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm trong giỏ hàng */}
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-blue-100">
            <h3 className="font-semibold mb-4 text-lg text-blue-700 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-blue-600 rounded-full"></span>
              Sản phẩm trong giỏ hàng
            </h3>
            {loading ? (
              <div>Đang tải...</div>
            ) : cart.length === 0 ? (
              <div className="text-gray-500">
                Không có sản phẩm nào trong giỏ hàng.
              </div>
            ) : (
              <table className="w-full text-sm border border-blue-100 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-2 border-b border-blue-100">
                      Tên sách
                    </th>
                    <th className="py-2 px-2 border-b border-blue-100">
                      Giá bán
                    </th>
                    <th className="py-2 px-2 border-b border-blue-100">
                      Số lượng
                    </th>
                    <th className="py-2 px-2 border-b border-blue-100">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.bookId._id} className="hover:bg-blue-50">
                      <td className="py-2 px-2 border-b border-blue-100 font-medium text-blue-700">
                        {item.bookId.name}
                      </td>
                      <td className="py-2 px-2 border-b border-blue-100 text-blue-600 font-semibold">
                        {item.bookId.salePrice.toLocaleString()}₫
                      </td>
                      <td className="py-2 px-2 border-b border-blue-100 text-center">
                        {item.quantity}
                      </td>
                      <td className="py-2 px-2 border-b border-blue-100 font-bold text-green-700">
                        {(
                          item.bookId.salePrice * item.quantity
                        ).toLocaleString()}
                        ₫
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="text-right font-bold py-2 px-2">
                      Tổng cộng:
                    </td>
                    <td className="font-bold py-2 px-2 text-blue-700 text-lg">
                      {getTotal().toLocaleString()}₫
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Chọn phương thức thanh toán */}
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-blue-100">
            <h3 className="font-semibold mb-4 text-lg text-blue-700 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-blue-600 rounded-full"></span>
              Phương thức thanh toán
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={handlePaymentChange}
                  className="mr-2 accent-blue-600"
                />
                <span className="font-medium">
                  Thanh toán khi nhận hàng (COD)
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={payment === "bank"}
                  onChange={handlePaymentChange}
                  className="mr-2 accent-blue-600"
                />
                <span className="font-medium">Chuyển khoản ngân hàng</span>
              </label>
            </div>
          </div>

          {/* Nút xác nhận mua */}
          <div className="text-center">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-12 rounded-lg text-lg shadow-lg transition-all duration-200"
              onClick={handleOrder}
            >
              Xác nhận mua
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
