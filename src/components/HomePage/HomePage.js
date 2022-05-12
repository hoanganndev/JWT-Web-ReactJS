import React from "react";
import "./HomePage.scss";
const HomePage = () => {
    return (
        <div className="container homepage-container">
            <div className="row">
                <div className="col-12">
                    <div className="project-info ">
                        <div className="text1 ">Hi! I'm Marcus</div>
                        <div className="text2 ">
                            This is user authentication project
                        </div>
                        <div className="text3">
                            Using Reactjs for client & Nodejs(mysql) for server
                        </div>
                    </div>
                    <div className="my-info">
                        <div className="text1 ">
                            <span className="facebook">
                                <a
                                    href="https://www.facebook.com/an.Best01/"
                                    target="_blank"
                                >
                                    <i
                                        className="fa fa-facebook"
                                        aria-hidden="true"
                                    ></i>
                                </a>
                            </span>
                            <span className="github">
                                <a
                                    href="https://github.com/hoanganndev"
                                    target="_blank"
                                >
                                    <i
                                        className="fa fa-github"
                                        aria-hidden="true"
                                    ></i>
                                </a>
                            </span>
                        </div>

                        <div className="text2">
                            Contact me at :{" "}
                            <span className="email">
                                hoangann.dev@gmail.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
