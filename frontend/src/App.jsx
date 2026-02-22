import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyOtp from "../pages/auth/VerifyOtp";

import Admin from "../pages/dashboard/Admin";
import Employer from "../pages/dashboard/Employer";
import User from "../pages/dashboard/User";

import Protect from "../routes/ProtectedRoute";

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<Login />}></Route>
        <Route path = "/signup" element = {<Signup />}></Route>
        <Route path = "/verify-otp" element = {<VerifyOtp />} ></Route>

        <Route path = "/employer" element = {
          <Protect allowedRoles={["Employer"]}><Employer/></Protect>
          }></Route>

        <Route path = "/admin" element = {
          <Protect allowedRoles={["Admin"]}><Admin /></Protect>
        }></Route>

        <Route path = "/user" element = {
          <Protect allowedRoles={["User"]}><User /></Protect>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;