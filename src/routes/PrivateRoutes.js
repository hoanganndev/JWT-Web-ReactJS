import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

const PrivateRoutes = props => {
    const history = useHistory();
    useEffect(() => {
        let sesstion = sessionStorage.getItem("account");
        if (!sesstion) {
            history.push("/login");
            window.location.reload();
        }
    }, []);
    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    );
};

export default PrivateRoutes;
