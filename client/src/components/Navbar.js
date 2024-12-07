import React from "react";
import {
  FaHome,
  FaQuestionCircle,
  FaMapMarkedAlt,
  FaUsers,
  FaTrophy,
  FaSignInAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

function Navbar() {
  // Navigation items array with corresponding routes
  const navItems = [
    { name: "Home", icon: <FaHome size={24} />, path: "/" },
    { name: "Quiz", icon: <FaQuestionCircle size={24} />, path: "/quiz" },
    {
      name: "ExploreMap",
      icon: <FaMapMarkedAlt size={24} />,
      path: "/exploremap",
    },
    { name: "Community", icon: <FaUsers size={24} />, path: "/community" },
    {
      name: "LeaderboardPage",
      icon: <FaTrophy size={24} />,
      path: "/leaderboard",
    },
    { name: "Login", icon: <FaSignInAlt size={24} />, path: "/login" },
    { name: "Profile", icon: <FaUsers size={24} />, path: "/profile" }, // Profile option
    { name: "Challenges", icon: <FaTrophy size={24} />, path: "/challenges" }, // Challenges option
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-bold tracking-wide cursor-pointer hover:text-yellow-400 transition"
        >
          🌍 Ithacea
        </NavLink>

        {/* Navigation Icons */}
        <div className="space-x-6 flex items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path} // Use the path for navigation
              className={({ isActive }) =>
                `flex items-center rounded-lg px-4 py-2 hover:bg-yellow-400 transition transform hover:scale-105 ${
                  isActive ? "bg-yellow-400" : ""
                }`
              }
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* User Icon triggers drawer */}
        <div className="relative group">
          <label htmlFor="my-drawer-4" className="cursor-pointer">
            <div className="avatar">
              <div className="mask mask-hexagon w-12 transition transform hover:scale-105">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
