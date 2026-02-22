import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      <div className="flex flex-col gap-4 flex-grow">
        {role === "Admin" && (
          <>
            <button onClick={() => navigate("/admin")} className="hover:text-gray-300">
              Admin Panel
            </button>
          </>
        )}

        {role === "Employer" && (
          <>
            <button onClick={() => navigate("/employer")} className="hover:text-gray-300">
              Employer Panel
            </button>
          </>
        )}

        {role === "User" && (
          <>
            <button onClick={() => navigate("/user")} className="hover:text-gray-300">
              User Panel
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;