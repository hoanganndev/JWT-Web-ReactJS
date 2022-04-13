import React from "react";
import { useHistory } from "react-router-dom";
import "./Register.scss";
import marcusLogo from "./marcus.png";

const Register = () => {
    const history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    };
    return (
        <div className="register-container">
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
                            <lable>Email:</lable>
                            <input
                                className="form-control py-2"
                                placeholder="Enter email address "
                                type="email"
                            />
                        </div>
                        <div className="form-group">
                            <lable>Phone number:</lable>
                            <input
                                className="form-control py-2"
                                placeholder="Enter phone number"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <lable>User name:</lable>
                            <input
                                className="form-control py-2"
                                placeholder="Enter user name"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <lable>Password:</lable>
                            <input
                                className="form-control py-2"
                                placeholder="Enter your assword"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <lable>Re-enter password:</lable>
                            <input
                                className="form-control py-2"
                                placeholder="Re-enter your password"
                                type="text"
                            />
                        </div>

                        <button className="btn btn-primary py-2 register">
                            Register
                        </button>

                        <hr />
                        <div className="text-center">
                            <button
                                className="btn btn-outline-success create-account"
                                onClick={() => handleLogin()}
                            >
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
