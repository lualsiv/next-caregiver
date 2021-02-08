// api.js
import Axios from "axios";

const api = Axios.create({
    baseURL: process.env.NEXTAUTH_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;