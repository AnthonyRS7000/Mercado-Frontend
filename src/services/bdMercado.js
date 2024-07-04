// src/services/bdMercado.js
import axios from 'axios';

const bdMercado = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // Esto es importante para manejar cookies
});

export default bdMercado;
