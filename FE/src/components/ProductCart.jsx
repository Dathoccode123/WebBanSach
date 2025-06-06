import React from "react";
import "../index.css";

const ProductCart = ({
  image,
  name,
  salePrice,
  quantity,
  onDecrease,
  onIncrease,
  onRemove,
}) => {
  // Luôn hiển thị name, nếu không có thì hiện "Không có tên"
  const displayName = name || "Không có tên";

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4 mb-4">
      <img
        src={`data:image/jpeg;base64,${image}`}
        alt={displayName}
        className="w-20 h-20 object-contain rounded"
      />
      <div className="flex-1">
        <div className="font-semibold text-base mb-1">{displayName}</div>
        <div className="text-blue-600 font-bold text-lg mb-2">
          {salePrice?.toLocaleString()}₫
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded bg-gray-200 text-lg font-bold hover:bg-gray-300"
            onClick={onDecrease}
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
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="ml-4 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={onRemove}
        title="Xóa khỏi giỏ hàng"
      >
        Xóa
      </button>
    </div>
  );
};

export default ProductCart;
