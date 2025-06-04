import React from "react";
import { Link } from "react-router-dom";

const ProductCard2 = ({ image, name, _id }) => {
  return (
    <Link
      to={`/detail/${_id}`}
      className="bg-gradient-to-b from-white to-blue-200 rounded-lg shadow p-3 w-40 h-56 flex flex-col items-center hover:shadow-lg transition cursor-pointer group"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img
        src={`data:image/jpeg;base64,${image}`}
        alt={name}
        className="h-32 w-full object-contain rounded mb-2 transition-transform duration-300 group-hover:scale-110"
      />
      <h3 className="text-sm font-medium text-blue-900 text-center line-clamp-2 flex-1 flex items-center">
        {name}
      </h3>
    </Link>
  );
};

export default ProductCard2;
