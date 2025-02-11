import axios from "axios";


const APIAuthenticated = axios.create({
    baseURL: 'http://localhost:5000/',
    headers : {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `${localStorage.getItem('token')}`
    }
})

const API = axios.create({
    baseURL: 'http://localhost:5000/',
    headers : {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
})


export {API, APIAuthenticated}