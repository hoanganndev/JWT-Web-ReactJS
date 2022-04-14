import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //🔥 Config Toastify
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import Register from "./components/Register/Register";
function App() {
    return (
        <Router>
            <div className="app-container">
                {/* <Nav /> */}
                <Switch>
                    <Route path="/news">news</Route>
                    <Route path="/contact">contact</Route>
                    <Route path="/about">About</Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/" exact>
                        home
                    </Route>
                    <Route path="*">404 not found</Route>
                </Switch>
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
