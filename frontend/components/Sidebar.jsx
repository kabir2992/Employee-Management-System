import { NavLink, useNavigate } from "react-router-dom";
import { Home , Users, LogOut, Moon, Sun } from "lucide-react";
import { ThemeProvider } from "../context/ThemeContext";

const Sidebar = ({ role }) => {
  const { darkMode, toggleTheme } = ThemeProvider;

  const links = {
    Admin: [
      { to: "/admin", label: "Dashboard", icon: <Home size={18} />},
      { to: "/admin/users", label: "Users", icon: <Home size={18} />}
    ],
    Employer: [
      { to: "/employer", label: "Dashboard", icon: <Home size={18} />}
    ],
    User: [
      { to: "/user", label: "Dashboard", icon: <Home size={18} />}
    ]
  };

  return (
    <div className = "w-64 h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white flex flex-col p-5 shadow-xl">
      <h2 className="text-2xl font-bold mb-8 tracking-wide">MyPortal</h2>

      <nav className="flex-1 space-y-3">
        {links[role]?.map((link, index) => (
          <NavLink key = {index} to = {link.to} className = {({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-white text-indigo-700"
                  : "hover:bg-indigo-500" }`
                }
                >
                {link.icon}
                {link.label}
          </NavLink>
        ))}
      </nav>
      <div className = "mt-6 flex justify-between items-center">
        <button onClick = {toggleTheme}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
        <button onClick = {() => {
          localStorage.clear();
          window.location.href = "/login";
        }} className = "flex items-center gap-2 hover:text-gray-300"><LogOut size = {18}>Log Out</LogOut></button>
      </div>
    </div>
  );
};

export default Sidebar;