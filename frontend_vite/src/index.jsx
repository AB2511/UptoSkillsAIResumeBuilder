import React from "react";
import ReactDOM from "react-dom/client"; // For React 18 and above
import './index.css'; // Your global styles (if any)
import App from './App'; // Import the main App component

// Create a root element to render the React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
