import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import BrandPage from "./pages/BrandsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import EmailPage from "./pages/EmailPage";
import ReviewPage from "./pages/ReviewPage";
import { logout } from "./utils/authService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
 
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Cập nhật trạng thái đăng nhập dựa trên token
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/"); // Chuyển đến dashboard sau khi đăng nhập thành công
  };

  // const handleLogout = () => {
  //   logout();
  //   setIsAuthenticated(false);
  //   navigate("/login");
  // };

  return (
    <div className="flex h-screen text-gray-100 overflow-hidden bg-gray-100">
     <ToastContainer />
      {/* bg-gray-900  */}
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <Sidebar />
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/emails" element={<EmailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>

        </>
      )}
    </div>
  );
}

export default App;
