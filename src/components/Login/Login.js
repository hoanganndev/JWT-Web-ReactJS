import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import marcusLogo from "./marcus.png";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userServices";

const Login = () => {
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("/register");
    };
    const dafaultValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objCheckInput, setOpjCheckInput] = useState(dafaultValidInput);
    const handleLogin = async () => {
        setOpjCheckInput(dafaultValidInput);
        if (!valueLogin) {
            setOpjCheckInput({
                ...dafaultValidInput,
                isValidValueLogin: false,
            });
            toast.warning("Please enter your email address or phone number !");
            return;
        }
        if (!password) {
            setOpjCheckInput({
                ...dafaultValidInput,
                isValidPassword: false,
            });
            toast.warning("Please enter your password !");
            return;
        }
        let res = await loginUser(valueLogin, password);
        if (res && +res.errorCode === 0) {
            //🔥 Success
            let data = {
                isAuthenticated: true,
                token: "face tooken",
            };
            sessionStorage.setItem("account", JSON.stringify(data));
            history.push("/users");
            window.location.reload(); //🔥 This code will reload at users page
        }
        if (res && +res.errorCode !== 0) {
            toast.error(res.errorMessage);
        }
    };
    const handlePressEnter = e => {
        if (e.charCode === 13 && e.code === "Enter") {
            handleLogin();
        }
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
                            Sometimes people are beautiful. Not in looks. Not in
                            what they say. Just in what they are.
                        </div>
                    </div>
                    <div className="content-right col-12  col-sm-4 d-flex flex-column gap-3 py-3 px-3 ">
                        <div className="brand brand-mobile d-sm-none">
                            <img className="marcus-logo" src={marcusLogo} />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="input-email-phone"
                                className="form-label"
                            >
                                Email or Phone:
                            </label>
                            <input
                                id="input-email-phone"
                                className={
                                    objCheckInput.isValidValueLogin
                                        ? "form-control py-2"
                                        : "form-control py-2 is-invalid"
                                }
                                placeholder="Email address or phone number"
                                type="text"
                                value={valueLogin}
                                onChange={e => setValueLogin(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="input-password"
                                className="form-label"
                            >
                                Password:
                            </label>
                            <input
                                id="input-password"
                                className={
                                    objCheckInput.isValidPassword
                                        ? "form-control py-2"
                                        : "form-control py-2 is-invalid"
                                }
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyPress={e => handlePressEnter(e)}
                            />
                        </div>

                        <button
                            className="btn btn-primary py-2 login"
                            onClick={() => handleLogin()}
                        >
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
