import axios from "axios";


let api = axios.create({
    baseURL: "http://localhost:4000/api/"
})

export default api;