import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Users.scss";
const Users = () => {
    const history = useHistory();
    useEffect(() => {
        let sesstion = sessionStorage.getItem("account");
        if (!sesstion) {
            history.push("/login");
        }
    }, []);
    return <div>users</div>;
};

export default Users;
