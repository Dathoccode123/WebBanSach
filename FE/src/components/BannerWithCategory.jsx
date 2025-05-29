import React from "react";
import "../index.css";

const categories = [
  "Sách Lập Trình",
  "Sách Kỹ Năng",
  "Sách Ngoại Ngữ",
  "Sách Thiếu Nhi",
  "Sách Văn Học",
  "Sách Kinh Tế",
];

const BannerWithCategory = () => {
  return (
    <div className="flex w-full max-w-7xl mx-auto my-8 gap-6">
      {/* Danh mục */}
      <div
        className="bg-white rounded-lg shadow p-4 w-1/3 flex flex-col"
        style={{ height: "360px" }}
      >
        <h2 className="font-bold text-lg mb-4 text-blue-600">Danh mục sách</h2>
        <ul className="space-y-2 flex-1">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className="py-2 px-3 rounded hover:bg-blue-50 cursor-pointer transition"
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
      {/* Banner */}
      <div className="w-2/3 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
          alt="Banner"
          className="rounded-lg shadow w-full object-cover"
          style={{ height: "360px" }}
        />
      </div>
    </div>
  );
};

export default BannerWithCategory;
