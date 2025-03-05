import axios from "axios";

const APIAuthenticated = axios.create({
    //using type assertion as any to access the env variables
    baseURL: (import.meta as any).env.VITE_APP_SERVER_URL,
    headers : {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        // 'Authorization' : `${localStorage.getItem((import.meta as any).env.ADMIN_STORAGE_KEY)}`
        'Authorization' : `${localStorage.getItem('admin_auth_token')}`
    }
})

// Add a request interceptor to set the token dynamically
// APIAuthenticated.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['Authorization'] = `${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

const API = axios.create({
    baseURL:(import.meta as any).env.VITE_APP_SERVER_URL,
    headers : {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
})


export {API, APIAuthenticated}