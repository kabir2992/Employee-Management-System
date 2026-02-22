import axis from "axios";

const API = axis.create({
    baseURL : "http://localhost:5000/api/dashboard"
});

API.interceptors.request.use((req) =>{
    const token = localStorage.getItem("token");
    if (token)
    {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;