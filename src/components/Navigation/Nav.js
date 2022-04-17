import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.scss";
const Nav = () => {
    let location = useLocation();
    const [isShow, setIsShow] = useState(true);
    useEffect(() => {
        if (location.pathname === "/login") {
            setIsShow(false);
        }
    }, []);
    return (
        <>
            {isShow === true && (
                <div className="topnav">
                    <NavLink to="/" exact>
                        Home
                    </NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            )}
        </>
    );
};

export default Nav;
