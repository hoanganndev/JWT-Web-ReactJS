import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { NavLink, Link } from "react-router-dom";
import "./Nav.scss";
import { logoutUser } from "../../services/userServices";
import { toast } from "react-toastify";
const NavHeader = () => {
    let location = useLocation();
    let history = useHistory();
    const { user, logoutContext } = useContext(UserContext);
    const handleLogoutUser = async () => {
        let data = await logoutUser(); //! Clear cookie from server
        localStorage.removeItem("jwt"); //! Clear jwt in localStorage
        logoutContext(); //! Set default user
        if (data && data.errorCode === 0) {
            history.push("/login");
            toast.success(data.errorMessage);
        } else {
            toast.error(data.errorMessage);
        }
    };
    if ((user && user.isAuthenticated === true) || location.pathname === "/") {
        return (
            <>
                <div className="nav-header">
                    <Navbar
                        collapseOnSelect
                        expand="lg"
                        bg="light"
                        variant="light"
                    >
                        <Container>
                            <NavLink className="nav-link nav-brand-name" to="/">
                                Admin-Dashboard
                            </NavLink>
                            <Navbar.Brand href="/"></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto navbar-left">
                                    <NavLink className="nav-link" to="/" exact>
                                        Home
                                    </NavLink>
                                    <NavLink className="nav-link" to="/users">
                                        Users
                                    </NavLink>
                                    <NavLink className="nav-link" to="/roles">
                                        Roles
                                    </NavLink>
                                    <NavLink
                                        className="nav-link"
                                        to="/projects"
                                    >
                                        Projects
                                    </NavLink>
                                    <NavLink className="nav-link" to="/about">
                                        About
                                    </NavLink>
                                </Nav>
                                <Nav className="navbar-right">
                                    {user && user.isAuthenticated === true ? (
                                        <>
                                            <Nav.Item className="nav-link">
                                                Welcome!
                                                <span className="nav-user">
                                                    {`👏 `}
                                                    {`${user.account.username}`}
                                                </span>
                                            </Nav.Item>
                                            <NavDropdown
                                                title={
                                                    <i
                                                        className="fa fa-cog configs"
                                                        aria-hidden="true"
                                                    ></i>
                                                }
                                                id="collasible-nav-dropdown"
                                            >
                                                <NavDropdown.Item>
                                                    Change Password
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item
                                                    onClick={() =>
                                                        handleLogoutUser()
                                                    }
                                                >
                                                    Log Out{" "}
                                                    <i
                                                        className="fa fa-sign-out ms-5"
                                                        aria-hidden="true"
                                                    ></i>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                className="nav-link nav-login"
                                                to="/login"
                                            >
                                                Login !
                                            </Link>
                                        </>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default NavHeader;
