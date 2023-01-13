import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavigationBar from "./components/NavigationBar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationBar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
