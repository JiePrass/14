import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:2304/api"; // Sesuaikan dengan backend

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const loginUser = (email, password) => {
    return api
        .post("/login", { email, password })
        .then((response) => {
            const token = response.data.token;
            localStorage.setItem("token", token);

            // Decode token untuk mendapatkan data user
            const decoded = jwtDecode(token);
            // Asumsikan payload token memiliki properti 'id' dan 'username'
            localStorage.setItem("user_id", decoded.id);
            localStorage.setItem("username", decoded.username);

            // Lanjutkan logika aplikasi, misalnya mengembalikan response
            return response;
        })
        .catch((error) => {
            console.error("Login error:", error);
            throw error;
        });
};

export const registerUser = (name, email, password) => {
    return api.post("/register", { name, email, password });
};

export const fetchEmissionData = async () => {
    try {
        const response = await api.get("/kalkulator/riwayat");
        console.log(response.data.emissions)
        return response.data; // Kembalikan data untuk diproses di komponen
    } catch (error) {
        console.error("Error fetching emission data:", error);
        return [];
    }
};

export default api;
