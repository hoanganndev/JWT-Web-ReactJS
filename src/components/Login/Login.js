import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { loginUser } from "../../services/userServices";
import "./Login.scss";
const Login = () => {
    const { loginContext } = useContext(UserContext);
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
            //! Success
            let email = res.data.email;
            let username = res.data.username;
            let token = res.data.access_token;
            let groupWithRoles = res.data.groupWithRoles;
            let data = {
                isAuthenticated: true, //! True when user login sucess
                token: token,
                account: { groupWithRoles, email, username },
            };
            localStorage.setItem("jwt", token); //! We can save token in redux or localStorage
            loginContext(data); //! Set data for method login in context api
            history.push("/users");
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
                            <h1>Marcus</h1>
                            <p>Web Developer</p>
                        </div>
                        <div className="detail">
                            Sometimes people are beautiful. Not in looks. Not in
                            what they say. Just in what they are.
                        </div>
                    </div>
                    <div className="content-right col-12  col-sm-4 d-flex flex-column gap-3 py-3 px-3 ">
                        <div className="brand brand-mobile d-sm-none">
                            <h1 className="text-center">Marcus</h1>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="input-email-phone"
                                className="form-label label"
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
                                className="form-label label"
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
                            className="btn btn-login py-2 login"
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
                                className="btn  create-account"
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
