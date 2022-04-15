import _ from "lodash";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //🔥 Config Toastify
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Login from "./components/Login/Login";
import Users from "./components/ManageUsers/Users";
import Nav from "./components/Navigation/Nav";
import Register from "./components/Register/Register";
function App() {
    const [account, setAccount] = useState({});
    useEffect(() => {
        let sesstion = sessionStorage.getItem("account");
        if (sesstion) {
            setAccount(JSON.parse(sesstion));
        }
    }, []);
    return (
        <Router>
            <div className="app-container">
                {account && !_.isEmpty(account) && account.isAuthenticated && (
                    <Nav />
                )}
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
                    <Route path="/users">
                        <Users />
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
