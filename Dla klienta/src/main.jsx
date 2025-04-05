import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LanguageProvider } from "./context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider> {/* 👈 aplikacja musi być tutaj */}
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

