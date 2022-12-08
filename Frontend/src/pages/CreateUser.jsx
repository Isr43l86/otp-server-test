import React from "react";
import NewUserForm from "../components/NewUserForm";
import "../styles/newUser.css";
import image from "../assets/icon.png";

export default function CreateUser() {
    return (
        <div id="mainContainer">
            <div className="login-background"></div>
            <div className="login-container">
                <img src={image} alt="app_logo" />
                <div className="form-container">
                    <NewUserForm />
                </div>
            </div>
        </div>
    );
}
