import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //🔥 Config Toastify
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import AppRoutes from "./routes/AppRoutes";
import { InfinitySpin } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
function App() {
    const { user } = useContext(UserContext);
    return (
        <Router>
            {user && user.isLoading ? (
                <div className="loading-container">
                    <div>
                        <InfinitySpin
                            height="200"
                            width="200"
                            color="#893838"
                            ariaLabel="loading"
                        />
                    </div>
                    <div className="loading-title">
                        Please wait a few seconds...😚
                    </div>
                </div>
            ) : (
                <>
                    <div className="app-header">
                        <NavHeader />
                    </div>
                    <div className="app-container">
                        <AppRoutes />
                    </div>
                </>
            )}
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
