import axios from "axios";

const authAPI = axios.create({
    baseURL : "http://localhost:5000/api/auth"
});

export const signupUser = (data) => authAPI.post('/signup', data);
export const verifySignupOtp = (data) => authAPI.post('/verify-otp', data);

export const loginUser = (data) => authAPI.post('/login', data);
export const verifyLoginOtp = (data) => authAPI.post('/verify-otp-login', data);

export default authAPI;