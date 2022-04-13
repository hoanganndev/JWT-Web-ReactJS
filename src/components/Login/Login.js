import React from "react";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import marcusLogo from "./marcus.png";

const Login = () => {
    const history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("/register");
    };
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0 py-3">
                    <div className="content-left col-12 d-none col-sm-8 d-sm-block ">
                        <div className="brand">
                            <img className="marcus-logo" src={marcusLogo} />
                        </div>
                        <div className="detail">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit.dolor sit amet consectetur adipisicing elit.
                        </div>
                    </div>
                    <div className="content-right col-12  col-sm-4 d-flex flex-column gap-3 py-3 px-3 ">
                        <div className="brand brand-mobile d-sm-none">
                            <img className="marcus-logo" src={marcusLogo} />
                        </div>
                        <div className="form-group">
                            <lable>Email or Phone:</lable>
                            <input
                                className="form-control py-2"
                                placeholder="Email address or phone number"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <lable>Password:</lable>
                            <input
                                className="form-control py-2"
                                placeholder="Password"
                                type="password"
                            />
                        </div>

                        <button className="btn btn-primary py-2 login">
                            Login
                        </button>
                        <span className="text-center forgot-password">
                            <a href="#" className="forgot-password">
                                Forgotten password?
                            </a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button
                                className="btn btn-outline-success create-account"
                                onClick={() => handleCreateNewAccount()}
                            >
                                Create New Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
