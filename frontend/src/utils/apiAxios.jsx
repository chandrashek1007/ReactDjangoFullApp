import axios from 'axios';
 
export default axios.create({
  timeout: 20000,
  baseURL: process.env.NODE_ENV === 'production' ? "http://localhost:3000" : "http://localhost:8000"
})