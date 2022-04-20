import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userServices";
import "./Register.scss";

const Register = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dafaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objCheckInput, setOpjCheckInput] = useState(dafaultValidInput);
    const history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    };
    const isValidInputs = () => {
        setOpjCheckInput(dafaultValidInput);
        if (!email) {
            setOpjCheckInput({ ...dafaultValidInput, isValidEmail: false });
            toast.error("😒 Email is required !");
            return false;
        }
        let regx = /\S+@\S+\.\S+/; //🔥 regular expression for email
        //🔥 In js .test return true or false
        if (!regx.test(email)) {
            toast.warning("Please Enter a valid email address ! 😥");
            return false;
        }
        if (!phone) {
            setOpjCheckInput({ ...dafaultValidInput, isValidPhone: false });
            toast.error("😒 Phone is required !");
            return false;
        }
        if (!password) {
            setOpjCheckInput({ ...dafaultValidInput, isValidPassword: false });
            toast.error("😒 Password is required !");
            return false;
        }
        if (password !== confirmPassword) {
            setOpjCheckInput({
                ...dafaultValidInput,
                isValidConfirmPassword: false,
            });
            toast.error("😒 Your password is not the same !");
            return false;
        }
        return true;
    };
    const handleRegister = async () => {
        let check = isValidInputs();
        if (check) {
            let res = await registerNewUser(email, phone, username, password);
            if (res && +res.errorCode === 0) {
                toast.success(res.errorMessage, {
                    icon: "🤨",
                });
                history.push("/login");
            } else {
                toast.error(res.errorMessage, {
                    icon: "🤨",
                });
            }
        }
    };
    const handlePressEnter = e => {
        if (e.charCode === 13 && e.code === "Enter") {
            handleRegister();
        }
    };
    return (
        <div className="register-container">
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
                            <label htmlFor="input-email" className="form-label">
                                Email:
                            </label>
                            <input
                                id="input-email"
                                className={
                                    objCheckInput.isValidEmail
                                        ? "form-control py-2"
                                        : "form-control py-2 is-invalid"
                                }
                                placeholder="Enter email address "
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="input-phonenumber"
                                className="form-label"
                            >
                                Phone number:
                            </label>
                            <input
                                id="input-phonenumber"
                                className={
                                    objCheckInput.isValidPhone
                                        ? "form-control py-2"
                                        : "form-control py-2 is-invalid"
                                }
                                placeholder="Enter phone number"
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="input-username"
                                className="form-label"
                            >
                                User name:
                            </label>
                            <input
                                id="input-username"
                                className="form-control py-2"
                                placeholder="Enter user name"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
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
                                placeholder="Enter your assword"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="input-re-password"
                                className="form-label"
                            >
                                Re-enter password:
                            </label>
                            <input
                                id="input-re-password"
                                className={
                                    objCheckInput.isValidConfirmPassword
                                        ? "form-control py-2"
                                        : "form-control py-2 is-invalid"
                                }
                                placeholder="Re-enter your password"
                                type="password"
                                value={confirmPassword}
                                onChange={e =>
                                    setConfirmPassword(e.target.value)
                                }
                                onKeyPress={e => handlePressEnter(e)}
                            />
                        </div>
                        <button
                            className="btn btn-primary py-2 register"
                            onClick={() => handleRegister()}
                        >
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
