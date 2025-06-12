import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Handle environment variable safely
const serverBaseUrl = import.meta.env.VITE_APP_URI || "http://localhost:5000";
axios.defaults.baseURL = serverBaseUrl;

// Safely get the root element
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Make sure your HTML has a <div id='root'></div>");
}
