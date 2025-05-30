import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import DetailProduct from "../../components/DetailProduct";
import { getBookById } from "../../API/bookApi";
import "../../index.css";

const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getBookById(id);
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  return (
    <>
      <Header />
      <div className="h-[112px]"></div>
      {loading ? (
        <div className="text-center mt-10">Đang tải...</div>
      ) : product ? (
        <DetailProduct {...product} />
      ) : (
        <div className="text-center text-red-500 mt-10">
          Không tìm thấy sản phẩm!
        </div>
      )}
    </>
  );
};

export default DetailProductPage;
