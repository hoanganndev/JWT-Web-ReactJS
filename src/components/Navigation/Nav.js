import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Nav.scss";
const Nav = () => {
    let location = useLocation();
    const { user } = useContext(UserContext);
    if ((user && user.isAuthenticated === true) || location.pathname === "/") {
        return (
            <>
                <div className="topnav">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default Nav;
