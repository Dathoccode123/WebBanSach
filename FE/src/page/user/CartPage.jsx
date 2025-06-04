import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductCart from "../../components/ProductCart";
import { getCartByUser, addToCart, removeFromCart } from "../../API/cartApi";
import { useNavigate, Link } from "react-router-dom"; // Thêm dòng này
import "../../index.css";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Thêm dòng này

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUserId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const data = await getCartByUser(userId);
          setCart(data);
        } catch (err) {
          setCart({ items: [] });
        }
      };
      fetchCart();
    }
  }, [userId]);

  const handleDecrease = async (idx) => {
    const item = cart.items[idx];
    if (item.quantity > 1) {
      await addToCart({
        userId,
        bookId: item.bookId._id || item.bookId,
        quantity: -1,
      });
      setCart((prev) => ({
        ...prev,
        items: prev.items.map((it, i) =>
          i === idx ? { ...it, quantity: it.quantity - 1 } : it
        ),
      }));
    }
  };

  const handleIncrease = async (idx) => {
    const item = cart.items[idx];
    await addToCart({
      userId,
      bookId: item.bookId._id || item.bookId,
      quantity: 1,
    });
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((it, i) =>
        i === idx ? { ...it, quantity: it.quantity + 1 } : it
      ),
    }));
  };

  const handleRemove = async (idx) => {
    const item = cart.items[idx];
    await removeFromCart({ userId, bookId: item.bookId._id || item.bookId });
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  };

  const total = cart.items.reduce(
    (sum, item) => sum + (item.bookId.salePrice || 0) * (item.quantity || 1),
    0
  );

  // Hàm xử lý khi nhấn nút thanh toán
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <div className="max-w-6xl mx-auto mt-10 flex gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            Giỏ hàng của bạn
          </h2>
          {cart.items.length === 0 ? (
            <div className="text-center text-gray-500">
              Chưa có sản phẩm nào trong giỏ hàng.
            </div>
          ) : (
            cart.items.map((item, idx) => (
              <ProductCart
                key={item.bookId._id || item.bookId}
                image={item.bookId.image}
                name={item.bookId.name}
                salePrice={item.bookId.salePrice}
                quantity={item.quantity}
                onDecrease={() => handleDecrease(idx)}
                onIncrease={() => handleIncrease(idx)}
                onRemove={() => handleRemove(idx)}
              />
            ))
          )}
        </div>
        <div className="w-80 bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="text-lg font-bold mb-4 text-gray-700">
            Tổng thanh toán
          </h3>
          <div className="flex justify-between mb-2">
            <span className="text-base">Tạm tính:</span>
            <span className="text-xl font-bold text-blue-700">
              {total.toLocaleString()}₫
            </span>
          </div>
          <Link
            to="/checkout"
            className={`w-full mt-6 block text-center bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition ${
              total === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartPage;
