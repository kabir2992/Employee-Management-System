import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import API from "../../api/dashApi";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const User = () => {
    const [data, setData] = useState("");
    useEffect(() => {
        const fetchData = async (e) => {
            e.preventDefault();
            try{
                const res = await API.get("/user-data");
                setData(res.data.message);
            }
            catch (err)
            {
                alert("Unauthorized Access");
            }
        };
        fetchData();
    }, []);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center h-[80vh] bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome User 👤</h2>
          <p className="text-gray-600">
            Browse jobs and apply to opportunities that match your profile.
          </p>
        </div>
      </div>
    </>
  );
};

export default User;