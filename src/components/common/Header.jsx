import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/authService";
import { FaUserCircle } from "react-icons/fa"; // Icon avatar
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";

const Header = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // setIsAuthenticated(false);
    window.location.href = "/login"; // Chuyển hướng trực tiếp về login
  };

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-900">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Tiêu đề */}
        <h1 className="text-2xl font-semibold text-white">{title}</h1>

        {/* Avatar + Dropdown */}
        <div className="relative">
          {/* Avatar icon */}
          <button
            className="text-white text-3xl focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <HiOutlineLogout />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-800 rounded-lg shadow-lg z-50 transform translate-x-[-100%] translate-y-[-15px]">
              <button
                className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-red-500 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
