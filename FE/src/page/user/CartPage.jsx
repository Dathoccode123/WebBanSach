import React, { useState } from "react";
import Header from "../../components/Header";
import ProductCart from "../../components/ProductCart";
import products from "../../data";
import "../../index.css";

const initialCart = products.slice(0, 5).map((item) => ({
  ...item,
  checked: false,
  quantity: 1,
}));

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const handleCheck = (idx) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDecrease = (idx) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === idx
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleIncrease = (idx) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Tính tổng giá các sản phẩm đã chọn
  const total = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.salePrice * item.quantity, 0);

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
          {cart.length === 0 ? (
            <div className="text-center text-gray-500">
              Chưa có sản phẩm nào trong giỏ hàng.
            </div>
          ) : (
            cart.map((item, idx) => (
              <ProductCart
                key={idx}
                checked={item.checked}
                onCheck={() => handleCheck(idx)}
                image={item.image}
                title={item.title}
                salePrice={item.salePrice}
                quantity={item.quantity}
                onDecrease={() => handleDecrease(idx)}
                onIncrease={() => handleIncrease(idx)}
                onRemove={() =>
                  setCart((prev) => prev.filter((_, i) => i !== idx))
                }
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
