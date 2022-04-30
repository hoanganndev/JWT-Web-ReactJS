import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NotFoundPage.scss";
import imageGif from "./404-tenlua.gif";
const NotFoundPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="notfound-page-left text-center  col-sm-12 col-md-12 col-lg-12 ">
                    <div className="re-direact-homepage">
                        <NavLink className="nav-link nav-brand-name" to="/">
                            <i className="fa fa-undo" aria-hidden="true"></i>
                            <span className="ms-2"> Home Page</span>
                        </NavLink>
                    </div>
                    <div className="brand">
                        <div className="image-not-found"></div>
                        <p>The page you are looking for cannot be found !!!</p>
                    </div>
                </div>
                <div className="notfound-page-right text-center d-none col-md-12 d-md-block">
                    <div className="detail">
                        Sometimes people are beautiful. Not in looks. Not in
                        what they say. Just in what they are.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
