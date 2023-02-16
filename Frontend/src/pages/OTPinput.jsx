import React, { useEffect, useState } from "react";
import { userUserContext } from "../context/userContext";
import { sendOTPgeneratedRequest } from "../api/otp";
import PlainTextOTP from "../components/PlainTextOTP.jsx";
import QRcodeOTP from "../components/QRcodeOTP.jsx";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../styles/OTPinput.css";

const socket = io("http://localhost:4000");

export default function OTPinput() {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = userUserContext();
    const [otp, setOTP] = useState();
    const [access, setAccess] = useState(false);

    console.log(socket.id);

    const geneateAndSendOTPgenerated = async () => {
        const otpValue =
            Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

        setOTP(otpValue);

        const otpInfo = {
            userId: currentUser.currentUser._id,
            username: currentUser.currentUser.username,
            otpValue: otpValue,
            socketId: socket.id,
        };

        try {
            const saveOTPresponse = await sendOTPgeneratedRequest(otpInfo);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        geneateAndSendOTPgenerated();
        console.log("primer generado del otp ", otp);
    }, []);

    try {
        socket.on("access", (data) => {
            console.log(data);
            if (data === "true") {
                navigate("/home");
            }
        });
    } catch (error) {
        console.log(error);
    }

    return (
        <div className="popup">
            <div className="otpContainer">
                <h1>Doble Factor de Atenticación</h1>
                <p>
                    Ingrese el valor OTP en la aplicación móvil <b>App Safe.</b>
                </p>
                {currentUser.currentUser.twoFactorAuthentication
                    .deliveryMethod === "qr_code" ? (
                    <QRcodeOTP
                        otpValue={otp}
                        userId={currentUser.currentUser._id}
                        username={currentUser.currentUser.username}
                    />
                ) : (
                    <PlainTextOTP otpValue={otp} />
                )}
            </div>
        </div>
    );
}
