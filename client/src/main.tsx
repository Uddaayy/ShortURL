import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

// Configure axios
const serverBaseUrl = import.meta.env.VITE_APP_URI || 'http://localhost:5000';
axios.defaults.baseURL = serverBaseUrl;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);