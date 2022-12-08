import React from "react";
import LoginForm from "../components/LoginForm";
import "../styles/login.css";
import image from "../assets/icon.png";

export default function Login() {
    return (
        <div id="mainContainer">
            <div className="login-background"></div>
            <div className="login-container">
                <img src={image} alt="app_logo" />
                <div className="form-container">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
