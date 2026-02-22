import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className = "flex justify-between items-center bg-gray-900 text-white px-8 py-4 shadow-md">
            <h1 className = "text-xl font-bold">{role} Dashboard</h1>

            <div className = "flex gap-6 items-center">
                {role === "Admin" && <span>Manage Users</span>}
                {role === "Employer" && <span>Post Jobs</span>}
                {role === "User" && <span>Apply Jobs</span>}
            </div>

            <button className = "bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition" onClick = {handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Navbar;