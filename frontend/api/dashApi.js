import axis from "axios";
import { getLoadingFuncitons } from "../utils/loadingHandler";

const API = axis.create({
    baseURL : "http://localhost:5000/api/dashboard"
});

API.interceptors.request.use((req) =>{
    const token = localStorage.getItem("token");
    if (token)
    {
        req.headers.Authorization = `Bearer ${token}`;
    }
    getLoadingFunctions()?.setLoading(true);

    return req;
});

API.interceptors.request.use((res) => {
    getLoadingFunctions()?.setLoading(false);
    return res;
},
(error) => {
    getLoadingFunctions()?.setLoading(false);
    return Promise.reject(error);
});

export default API;