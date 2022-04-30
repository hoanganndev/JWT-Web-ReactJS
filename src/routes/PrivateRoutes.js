import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = props => {
    const { user } = useContext(UserContext);
    if (user && user.isAuthenticated === true) {
        //! Logged in user
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        );
    } else {
        return (
            <>
                <Redirect to="/login" />
            </>
        ); //! if user not login redireact to page login
    }
};

export default PrivateRoutes;
