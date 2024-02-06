import axios from "axios";

const AxiosClent = axios.create({
    baseURL: "http://52.74.225.116:3001/api"
})

AxiosClent.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if(token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
    
}, function(err) {
    return Promise.reject(err);
})

export default AxiosClent

