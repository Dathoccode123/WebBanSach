import React from "react";
import "../main.css";
import banner1 from "../assets/img/banner1.png";

const Banner = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg">
        <img src={banner1} alt="Banner" className="w-full h-full object-fill" />
      </div>
    </div>
  );
};

export default Banner;
