import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import DetailProduct from "../../components/DetailProduct";
import "../../index.css";
import products from "../../data";

const DetailProductPage = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      {product ? (
        <DetailProduct {...product} />
      ) : (
        <div className="text-center text-red-500 mt-10">Không tìm thấy sản phẩm!</div>
      )}
    </>
  );
};

export default DetailProductPage;
