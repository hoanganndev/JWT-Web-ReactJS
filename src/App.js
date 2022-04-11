import Nav from "./components/Navigation/Nav";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
function App() {
    return (
        <Router>
            <div className="app-container">
                <Nav />
                <Switch>
                    <Route path="/news">news</Route>
                    <Route path="/contact">contact</Route>
                    <Route path="/about">About</Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/" exact>
                        home
                    </Route>
                    <Route path="*">404 not found</Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
