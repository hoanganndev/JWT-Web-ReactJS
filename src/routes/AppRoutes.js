import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import Roles from "../components/Roles/Roles";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import GroupRole from "../components/GroupRole/GroupRole";
import HomePage from "../components/HomePage/HomePage";
const AppRoutes = () => {
    const Projects = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <span>This space will display projects</span>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Projects} />
                <PrivateRoutes path="/roles" component={Roles} />
                <PrivateRoutes path="/group-role" component={GroupRole} />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
