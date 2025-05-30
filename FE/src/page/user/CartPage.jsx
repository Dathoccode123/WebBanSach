import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductCart from "../../components/ProductCart";
import { getCartByUser, addToCart, removeFromCart, clearCart } from "../../API/cartApi";
import "../../index.css";

// Giả lập userId, thực tế lấy từ auth hoặc localStorage
const userId = "YOUR_USER_ID_HERE";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });

  // Lấy giỏ hàng từ API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartByUser(userId);
        setCart(data);
      } catch (err) {
        setCart({ items: [] });
      }
    };
    fetchCart();
  }, []);

  // Xử lý chọn sản phẩm
  const handleCheck = (idx) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  // Giảm số lượng
  const handleDecrease = async (idx) => {
    const item = cart.items[idx];
    if (item.quantity > 1) {
      await addToCart({ userId, bookId: item.bookId._id || item.bookId, quantity: -1 });
      setCart((prev) => ({
        ...prev,
        items: prev.items.map((it, i) =>
          i === idx ? { ...it, quantity: it.quantity - 1 } : it
        ),
      }));
    }
  };

  // Tăng số lượng
  const handleIncrease = async (idx) => {
    const item = cart.items[idx];
    await addToCart({ userId, bookId: item.bookId._id || item.bookId, quantity: 1 });
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((it, i) =>
        i === idx ? { ...it, quantity: it.quantity + 1 } : it
      ),
    }));
  };

  // Xóa sản phẩm khỏi giỏ
  const handleRemove = async (idx) => {
    const item = cart.items[idx];
    await removeFromCart({ userId, bookId: item.bookId._id || item.bookId });
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  };

  // Tính tổng giá các sản phẩm đã chọn
  const total = cart.items
    .filter((item) => item.checked)
    .reduce(
      (sum, item) =>
        sum +
        (item.bookId.salePrice || 0) * (item.quantity || 1),
      0
    );

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      <div className="max-w-6xl mx-auto mt-10 flex gap-8">
        {/* Danh sách sản phẩm trong giỏ */}
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
                checked={item.checked}
                onCheck={() => handleCheck(idx)}
                image={item.bookId.image}
                title={item.bookId.title}
                salePrice={item.bookId.salePrice}
                quantity={item.quantity}
                onDecrease={() => handleDecrease(idx)}
                onIncrease={() => handleIncrease(idx)}
                onRemove={() => handleRemove(idx)}
              />
            ))
          )}
        </div>
        {/* Khối tổng giá */}
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
          <button
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
            disabled={total === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;