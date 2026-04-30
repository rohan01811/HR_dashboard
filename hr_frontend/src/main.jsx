import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3200,
          className: "!bg-slate-800 !text-slate-100 !border !border-slate-700 !shadow-soft",
          style: { fontSize: "14px" },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
