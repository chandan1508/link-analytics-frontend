import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          {/* Hamburger menu button - visible on medium and smaller screens */}
          <button
            className="md:hidden mr-4 text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            Link Analytics Dashboard
          </h1>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              {user.email}
            </span>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
