import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const categories = [
  "Văn Học",
  "Kinh Tế",
  "Tâm Lý",
  "Thiếu Nhi",
  "Lịch Sử",
  "Khác",
];

const BannerWithCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    // Chuyển hướng đến trang home với query type
    navigate(`/?type=${encodeURIComponent(cat)}`);
    console.log(`Chuyển hướng đến thể loại: ${cat}`);
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto my-8 gap-6">
      {/* Danh mục */}
      <div
        className="bg-white rounded-lg shadow p-4 w-1/3 flex flex-col border border-blue-200"
        style={{ height: "360px" }}
      >
        <h2 className="font-bold text-lg mb-4 text-blue-600">Danh mục sách</h2>
        <ul className="space-y-2 flex-1">
          {categories.map((cat, idx) => (
            <li
              key={idx}
              className="py-2 px-3 rounded cursor-pointer transition hover:bg-blue-50 hover:text-blue-600"
              onClick={() => handleCategoryClick(cat)}
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
