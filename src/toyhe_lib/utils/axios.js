import axios from "axios";

const instance = axios.create({
    baseURL: "https://toyhe-2.onrender.com/",
    //   baseURL: "http://192.168.43.178:8080",
    //baseURL :  "http://localhost:8080/api/v1"
});

// Add Axios interceptor to include token in every request
instance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;