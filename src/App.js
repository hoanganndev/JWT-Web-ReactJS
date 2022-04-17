import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //🔥 Config Toastify
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import AppRoutes from "./routes/AppRoutes";
function App() {
    return (
        <Router>
            <div className="app-header">
                <Nav />
            </div>
            <div className="app-container">
                <AppRoutes />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
}

export default App;
