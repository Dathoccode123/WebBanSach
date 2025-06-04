import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { getBookById } from "../../API/bookApi";
import { createOrder } from "../../API/orderApi";
import "../../index.css";

const SinglePaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState({ name: "", _id: "" });
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch {
        setBook(null);
      }
      setLoading(false);
    };
    fetchBook();

    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUser(storedUser);
      setAddress(storedUser.address || "");
      setPhone(storedUser.phone || "");
    }
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user._id) {
      alert("Bạn cần đăng nhập để đặt hàng!");
      return;
    }
    if (!address || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
      return;
    }
    try {
      await createOrder({
        userId: user._id,
        items: [{ bookId: book._id, quantity }],
        address,
        phone,
        paymentMethod: payment,
        status: "pending",
        totalPrice: book.salePrice * quantity,
      });
      alert("Đặt hàng thành công!");
      navigate("/");
    } catch {
      alert("Đặt hàng thất bại!");
    }
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  if (loading) return <div>Đang tải...</div>;
  if (!book) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
        <div className="max-w-3xl mx-auto mt-8 mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 tracking-wide drop-shadow">
            Thanh toán sản phẩm
          </h2>

          {/* Thông tin người nhận */}
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-blue-100">
            <h3 className="font-semibold mb-4 text-lg text-blue-700 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-blue-600 rounded-full"></span>
              Thông tin người nhận
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Tên người nhận
                </label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="border border-blue-200 rounded px-3 py-2 w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1 font-medium">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-blue-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-blue-100">
            <h3 className="font-semibold mb-4 text-lg text-blue-700 flex items-center gap-2">
              <span className="inline-block w-2 h-5 bg-blue-600 rounded-full"></span>
              Sản phẩm
            </h3>
            <div className="flex gap-8 items-center">
              <img
                src={`data:image/jpeg;base64,${book.image}`}
                alt={book.name}
                className="w-32 h-32 object-contain rounded border"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg mb-2 text-blue-700">
                  {book.name}
                </div>
                <div className="text-blue-600 font-bold text-xl mb-2">
                  {book.salePrice?.toLocaleString()}₫
                </div>
                <div className="text-gray-500 mb-2">
                  Giá gốc:{" "}
                  <span className="line-through">
                    {book.price?.toLocaleString()}₫
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span>Số lượng:</span>
                  <button
                    className="w-8 h-8 rounded bg-gray-200 text-lg font-bold hover:bg-gray-300"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center border rounded"
                  />
                  <button
                    className="w-8 h-8 rounded bg-gray-200 text-lg font-bold hover:bg-gray-300"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="font-bold mt-2">
                  Tổng:{" "}
                  <span className="text-green-600">
                    {(book.salePrice * quantity).toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>
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

export default SinglePaymentPage;
