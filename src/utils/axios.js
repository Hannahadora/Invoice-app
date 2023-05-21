import axios from 'axios';

const token = null

const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
});

authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default authApi;
