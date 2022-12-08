import React from "react";
import { userUserContext } from "../context/userContext";
import "../styles/OTPinput.css";

export default function OTPinput() {
    const { currentUser, setCurrentUser } = userUserContext();

    const otpValue =
        Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

    return (
        <div className="popup">
            <div className="otpContainer">
                <p>
                    Ingrese el valor OTP en la aplicación móvil <b>App Safe</b>
                </p>
                {currentUser.currentUser.twoFactorAuthentication
                    .deliveryMethod === "qr_code" ? (
                    <div>
                        <p>QR</p>
                    </div>
                ) : (
                    <div>
                        <p>Texto plano</p>
                    </div>
                )}
            </div>
        </div>
    );
}
