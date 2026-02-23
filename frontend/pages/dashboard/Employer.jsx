import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import API from "../../api/dashApi";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const Employer = () => {
    const [data, setData] = useState("");
    useEffect(() => {
        const fetchData = async (e) => {
            e.preventDefault();
            try{
                const res = await API.get("/employer-data");
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
          <h2 className="text-2xl font-bold mb-4">Welcome Employer 💼</h2>
          <p className="text-gray-600">
            Post Jobs, Manage Applicants and Track Applications.
          </p>
        </div>
      </div>
    </>
  );
};

export default Employer;