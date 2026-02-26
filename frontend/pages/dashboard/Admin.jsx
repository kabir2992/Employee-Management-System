import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import API from "../../api/dashApi";
import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import AdminRoleTable from "../../components/AdminRoleTable";
import { jwtDecode } from "jwt-decode";

const Admin = () => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const [data, setData] = useState("");

  return (
    <>
      <DashboardLayout>
      <div className="flex justify-center items-center h-[80vh] bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
          <h2 className="text-3xl font-bold">Welcome Admin 👑</h2>
          <p className="text-gray-600">
            You have full access to Manage Users, Employers and System Settings.
          </p>
          <AdminRoleTable role = "Employer" loggedInUser={decode.id}></AdminRoleTable>
          <AdminRoleTable role = "User" loggedInUser={decode.id}></AdminRoleTable>
          <AdminRoleTable role = "Admin" loggedInUser={decode.id}></AdminRoleTable>
        </div>
      </div>
      </DashboardLayout>
    </>
  );
};

export default Admin;