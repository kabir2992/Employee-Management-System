import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifySignupOtp, verifyLoginOtp } from "../../api/authApi";
import toast from "react-hot-toast";

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const type = location.state;

    const handleVerify = async (e) => {
        e.preventDefault();
        try{
            let res;

            if (type === "signup")
            {
                res = await verifySignupOtp({ email, otp });
                toast.success("Sign Up Successful");
            }
            else
            {
                res = await verifyLoginOtp({ email, otp });
                toast.success("Login Successful");
            }

            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);

            if (user.role === "Admin")
            {
                navigate("/admin");
            }
            else if (user.role === "Employer")
            {
                navigate("/employer");
            }
            else
            {
                navigate("/user");
            }
        }
        catch (err)
        {
            toast.error(err.response?.data?.message || "OTP Verification Failed");
        }
    };

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <form onSubmit = {handleVerify}>
                <input type = "text" name = "otp" value = {otp} placeholder = "Enter 6 Digit OTP" onChange = {(e) => setOtp(e.target.value)} 
                className = "border p-2 rounded mb-4" />
                <input type = "submit" value = "Verify OTP" className="bg-white-500 text-white px-4 py-2 rounded" />
            </form>
        </div>
    );
};

export default VerifyOtp;