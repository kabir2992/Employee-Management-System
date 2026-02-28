import axios from "axios";

const authAPI = axios.create({
    baseURL : "http://localhost:5000/api/auth"
});

export const signupUser = (data) => API.post('/signup', data);
export const verifySignupOtp = (data) => API.post('/verify-otp', data);

export const loginUser = (data) => API.post('/login', data);
export const verifyLoginOtp = (data) => API.post('/verify-otp-login', data);

export default authAPI;