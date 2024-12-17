import React from "react";
import { FaHome, FaChartBar, FaWallet } from "react-icons/fa";
import { RiChatPrivateFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 w-full place-content-center">
          FinPortfolio
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/Portfolio"
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FaHome size={24} />
          </Link>
          <Link
            to="/AssetList"
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FaChartBar size={24} />
          </Link>
          <Link
            to="/Holdings"
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FaWallet size={24} />
          </Link>
          {user?.role === "Admin" ? (
            <Link
              to="/AdminPage"
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <RiChatPrivateFill size={24} />
            </Link>
          ) : (
            <Link
              to="/UauthorizedPage"
              className="text-gray-600 hover:text-gray-400 cursor-pointer"
            />
          )}

          <div>
            {isAuthenticated ? (
              <Link to="/Logout" className="px-2">
                Logout
              </Link>
            ) : (
              <Link to="/" className="px-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
