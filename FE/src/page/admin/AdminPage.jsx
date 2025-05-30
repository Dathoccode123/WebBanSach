import React from "react";
import NavAdmin from "../../components/NavAdmin";

const AdminPage = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <NavAdmin />
      <div className="flex-1 ml-56 p-8 bg-gray-100">
        {/* Nội dung trang admin sẽ hiển thị ở đây */}
        {children || (
          <div className="text-2xl font-bold text-blue-800">
            Chào mừng đến trang quản trị!
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
