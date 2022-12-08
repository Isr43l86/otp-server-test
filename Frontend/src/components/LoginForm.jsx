import React, { useState, useEffect } from "react";
import "../styles/loginForm.css";
import { authUserRequest } from "../api/user";
import User from "../models/User.js";
import { userUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = userUserContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [wrongUserOrPass, setWrongUserOrPass] = useState(false);

    const handleCreateNewUser = () => {
        navigate("/new-user");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let validateUser = new User("", username, password);
        try {
            const res = await authUserRequest(validateUser);
            setUsername("");
            setPassword("");

            console.log(res.status);

            if (res.status === 200) {
                console.log(res.data.user);
                currentUser.currentUser._id = res.data.user._id;
                currentUser.currentUser.username = res.data.user.username;

                currentUser.currentUser.twoFactorAuthentication.activated =
                    res.data.user.twoFactorAuthentication.activated;

                currentUser.currentUser.twoFactorAuthentication.deliveryMethod =
                    res.data.user.twoFactorAuthentication.typeOfDelivery;

                setCurrentUser(currentUser);

                currentUser.currentUser.twoFactorAuthentication.activated
                    ? navigate("/enterOtp")
                    : navigate("/home");
            }
        } catch (error) {
            setUsername("");
            setPassword("");
            setWrongUserOrPass(true);
        }
    };

    useEffect(() => {
        if (username != "") {
            setWrongUserOrPass(false);
        }
    }, [username]);

    return (
        <form className="loginForm">
            <p className="app-name">App Safe</p>
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
            {wrongUserOrPass ? (
                <p className="user-pass-incorrect">
                    Usuario o contraseña incorrectos
                </p>
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
            <br></br>
            <p className="forget-pass">¿Has olvidado tu contraseña?</p>
            <input
                className="btn-login"
                type="button"
                value="Iniciar Sesión"
                onClick={handleLogin}
            />
            <input
                className="btn-create"
                type="button"
                value="Crear Cuenta"
                onClick={handleCreateNewUser}
            />
        </form>
    );
}
