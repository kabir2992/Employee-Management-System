import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import authAPI from "../../api/authApi";

const Login = () => {
    const [form, setForm] = useState({ email: ""});
    const navigate = useNavigate();
    const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const handleGoogleSuccess = async (credentialResponse) => {
        try{
            const res = await authAPI.post("/login", {
                token : credentialResponse.credential
            });

            if (res.data.exists)
            {
                toast.success("OTP Sent to Your Email");
                navigate("/verify-otp-login",{
                state: {email: res.data.email, type: "login"}
            });
            }
            else
            {
                toast.error("Email Not Registered!!");
            }
        }
        catch (err)
        {
            toast.error(err.response?.data?.message || "Login Failed through Google");
            console.log(err);
        }
    }

    return (
        <div className = "flex flex-col items-center justify-center h-screen">
            <h2 className = "text-2xl font-bold mb-4">Login</h2>
            <form>
                <input type = "email" name = "email" placeholder = "Email" onChange = {(e) => setForm({...form, email: e.target.value})} 
                className = "border p-2 mb-2" />
                <input type = "password" name = "password" placeholder = "Password" onChange = {(e) => setForm({...form, password: e.target.value})} 
                className = "border p-2 mb-2" />
                <div id = "googleBtn">
                <GoogleLogin onSuccess = {handleGoogleSuccess} onError = {() => toast.error("Google Login Failed!!")}></GoogleLogin>
                </div>
                <p className="mt-4 text-blue-600 cursor-pointer" onClick = {() => navigate("/signup")}>
                    Don't Have an Account? Signup</p>
            </form>
        </div>
    );
};

export default Login;