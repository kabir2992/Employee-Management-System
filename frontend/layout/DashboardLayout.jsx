import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
    const role = localStorage.getItem("role");

    return (
        <div className = "flex">
            <Sidebar role = {role}></Sidebar>
            <div className = "flex-1 p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">{ children }</div>
        </div>
    );
}

export default DashboardLayout;