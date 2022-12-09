import React from "react";
import { userUserContext } from "../context/userContext";
import PlainTextOTP from "../components/PlainTextOTP.jsx";
import QRcodeOTP from "../components/QRcodeOTP.jsx";
import "../styles/OTPinput.css";

export default function OTPinput() {
    const { currentUser, setCurrentUser } = userUserContext();

    const otpValue =
        Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

    return (
        <div className="popup">
            <div className="otpContainer">
                <h1>Doble Factor de Atenticación</h1>
                <p>
                    Ingrese el valor OTP en la aplicación móvil <b>App Safe.</b>
                </p>
                {currentUser.currentUser.twoFactorAuthentication
                    .deliveryMethod === "qr_code" ? (
                    <QRcodeOTP otpValue={otpValue} />
                ) : (
                    <PlainTextOTP otpValue={otpValue} />
                )}
            </div>
        </div>
    );
}
