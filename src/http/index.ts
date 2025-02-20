import axios from "axios";

const APIAuthenticated = axios.create({
    baseURL: 'http://localhost:5000/',
    headers : {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `${localStorage.getItem('token')}`
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
    baseURL: 'http://localhost:5000/',
    headers : {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
})


export {API, APIAuthenticated}