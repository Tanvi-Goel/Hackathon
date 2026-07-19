import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://hackathon99.onrender.com";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;