import React, { useState, useEffect } from "react";
import { createNewUserRequest } from "../api/user";
import User from "../models/User.js";
import "../styles/newUserForm.css";
import { useNavigate, Link } from "react-router-dom";
import { userUserContext } from "../context/userContext";

export default function NewUserForm() {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = userUserContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [emptyUsername, setEmptyUsername] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);

    const handleSubmitNewUser = async (e) => {
        e.preventDefault();
        username === "" ? setEmptyUsername(true) : "";
        password === "" ? setEmptyPassword(true) : "";
        if (!emptyUsername && !emptyPassword) {
            let newUser = new User("", username, password);
            const res = await createNewUserRequest(newUser);
            setUsername("");
            setPassword("");
            currentUser.currentUser._id = res.data.user._id;
            currentUser.currentUser.username = res.data.user.username;
            currentUser.currentUser.twoFactorAuthentication.activated =
                res.data.user.twoFactorAuthentication.activated;
            currentUser.currentUser.twoFactorAuthentication.deliveryMethod =
                res.data.user.twoFactorAuthentication.deliveryMethod || "";
            setCurrentUser(currentUser);
            navigate("/home");
        }
    };

    useEffect(() => {
        if (username != "") setEmptyUsername(false);
        if (password != "") setEmptyPassword(false);
    }, [username, password]);

    return (
        <form className="createUserForm">
            <p className="app-name">
                ¡Bienvenido a <br></br> App Safe!
            </p>
            <br></br>
            <label className="username-label">Nombre de usuario:</label>
            <br></br>
            <input
                className="username"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            {emptyUsername ? (
                <p className="empty-username">Nombre de usuario requerido *</p>
            ) : (
                <></>
            )}

            <br></br>
            <label className="pass-label">Contraseña</label>
            <br></br>
            <input
                className="pass"
                type="password"
                name="pass"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {emptyPassword ? (
                <p className="empty-password">Constraseña requerida *</p>
            ) : (
                <></>
            )}

            <br></br>
            <Link className="forget-pass" to="/">
                ¿Ya tienes una cuenta?
            </Link>
            <input
                className="btn-create-user"
                type="button"
                value="Crear Cuenta"
                onClick={handleSubmitNewUser}
            />
        </form>
    );
}
