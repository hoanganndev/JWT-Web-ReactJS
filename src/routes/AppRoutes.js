import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import Roles from "../components/Roles/Roles";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = () => {
    //! Face component Projects
    const Projects = () => {
        return <span>Projects</span>;
    };
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Projects} />
                <PrivateRoutes path="/roles" component={Roles} />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
