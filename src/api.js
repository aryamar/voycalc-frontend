import axios from 'axios';

const api = axios.create({
  baseURL: 'https://voycalc-backend.vercel.app',
});

export default api;