import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoadingProvider } from "../context/LoadingContext.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from '../context/ThemeContext.jsx';
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <LoadingProvider>
    <App />
    <Toaster position = "top-right" reverseOrder = {false}></Toaster>
  </LoadingProvider>
  </ThemeProvider>
);