import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiHeart, FiCalendar, FiBarChart2, FiInfo } from "react-icons/fi";
import { ContextFunction } from "../context/context";

function MobileNav() {
  const { isplaying } = useContext(ContextFunction);

  const navItems = [
    { to: "/allsongs", icon: FiHome, label: "Home" },
    { to: "/favorites", icon: FiHeart, label: "Fav" },
    { to: "/history", icon: FiCalendar, label: "History" },
    { to: "/statistics", icon: FiBarChart2, label: "Stats" },
    { to: "/about", icon: FiInfo, label: "About" },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-t border-gray-800" style={{ paddingBottom: isplaying ? "0" : "0" }}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-amber-500"
                  : "text-gray-500 hover:text-gray-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? "text-amber-500" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileNav;
