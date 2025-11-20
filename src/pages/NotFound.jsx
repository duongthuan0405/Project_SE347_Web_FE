import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-primary">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Trang không tồn tại</p>
        <a href="/" className="text-primary underline hover:text-primary/70">
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFound;
