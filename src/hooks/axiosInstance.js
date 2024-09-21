import axios from "axios"
import { BASE_URL } from "../env.js"

const axiosInstace = axios.create();
const token = localStorage.getItem("token");

axiosInstace.defaults.baseURL = BASE_URL;
// axiosInstace.defaults.withCredentials = true;
axiosInstace.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axiosInstace;