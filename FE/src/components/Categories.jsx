import React from "react";
import "../main.css";

const Categories = () => {
  const categories = [
    { id: 1, name: "Sách Văn Học", image: "/src/assets/img/laohac.jpg" },
    { id: 2, name: "Sách Kinh Tế", image: "/src/assets/img/nhagiakim.jpg" },
    { id: 3, name: "Sách Kỹ Năng", image: "/src/assets/img/dac-nhan-tam.jpg" },
    { id: 4, name: "Sách Thiếu Nhi", image: "/src/assets/img/tadaquen.webp" },
    { id: 5, name: "Sách Văn Học", image: "/src/assets/img/warandpeace.jpg" },
    { id: 6, name: "Sách Tâm Lý", image: "/src/assets/img/viemgapanh.jpg" },
    { id: 7, name: "Sách Văn Học", image: "/src/assets/img/th.jpg" },
    { id: 8, name: "Sách Văn Học", image: "/src/assets/img/th (9).jpg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Danh Mục Sách</h2>
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-lg shadow-md overflow-hidden  hover:scale-105 hover:border-blue-600 transition-transform duration-300 cursor-pointer p-3 border-2 border-gray-500"
          >
            <div className="w-32 h-40 mx-auto">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-medium text-gray-800 text-center group-hover:text-blue-600">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
