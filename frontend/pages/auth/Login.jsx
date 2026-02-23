import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: ""});
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await loginUser(form);
            toast.success("OTP Sent to Your Email");
            navigate("/verify-otp-login",{
                state: {email: form.email, type: "login"}
            });
        }
        catch (err)
        {
            toast.error(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className = "flex flex-col items-center justify-center h-screen">
            <h2 className = "text-2xl font-bold mb-4">Login</h2>
            <form onSubmit = {handleLogin}>
                <input type = "email" name = "email" placeholder = "Email" onChange = {(e) => setForm({...form, email: e.target.value})} 
                className = "border p-2 mb-2" />
                <input type = "password" name = "password" placeholder = "Password" onChange = {(e) => setForm({...form, password: e.target.value})} 
                className = "border p-2 mb-2" />
                <input type = "submit" value = "Login" className="bg-green-500 text-white px-4 py-2 rounded" />

                <p className="mt-4 text-blue-600 cursor-pointer" onClick = {() => navigate("/signup")}>
                    Don't Have an Account? Signup</p>
            </form>
        </div>
    );
};

export default Login;