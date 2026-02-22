import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/authApi";

const Signup = () => {
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        role: "User"
    });

    const navigate = useNavigate();

    const handleSignup = async () => {
        try{
            await signupUser(form);
            navigate ("/verify-otp",{
                state: { email: form.email, type: "signup"}
            });
        }
        catch (err)
        {
            alert(err.response?.data?.message || "Signup Failed");
        }
    };

    return(
        <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit = {handleSignup}>
        {["fname","lname","email","password"].map((field) => (
        <input key = {field} type = {field === "password" ? "password" : "text"} name = {field} placeholder = {field}
        onChange = {(e) => setForm({...form, [field]: e.target.value})} className = "border p-2 mb-2" />
        ))}

        <select onChange = {(e) => setForm({...form, role: e.target.value})} className = "border p-2 mb-2">
            <option value = "User">User</option>
            <option value = "Employer">Employer</option>
            <option value = "Admin">Admin</option>
        </select>

        <input type = "submit" value = "Signup" />
        </form>
        <p className="mt-4 text-blue-600 cursor-pointer" onClick = {() => navigate("/login")}>
                    Already hold an Account? Login</p>
        </div>
    );
};

export default Signup;