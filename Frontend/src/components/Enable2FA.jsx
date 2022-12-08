import React, { useState } from "react";
import QRCode from "qrcode";
import { Box, Switch, FormControlLabel, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import QR_ICON from "../assets/QR_Code_Icon.png";
import PLAIN_TEXT_ICON from "../assets/plain_text_icon.png";
import "../styles/enable2FAform.css";
import QRPopUp from "./QRPopUp";
import { userUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Enable2FA() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = userUserContext();
    const [deliveryMethod, setDeliveryMethod] = useState("");

    const [enable2FA, setEnable2FA] = useState(false);
    const [qrcode, setQrcode] = useState("");

    const handleChange = (event) => {
        setEnable2FA(event.target.checked);
    };

    const [showPopUpEnroll, setShowPopUpEnroll] = useState(false);

    const handleSaveChanges = (event) => {
        if (enable2FA) {
            setShowPopUpEnroll(true);
            currentUser.currentUser.twoFactorAuthentication.deliveryMethod =
                deliveryMethod;
            setCurrentUser(currentUser);
            console.log(currentUser);
            let userString = JSON.stringify(currentUser);
            let url = "http://localhost:3000/AppSafe/enable2FA/".concat(
                ";http://localhost:3000/AppSafe/user/generateJWT",
                ";http://localhost:3000/AppSafe/generateJWT",
                ";http://localhost:3000/AppSafe/sendOTP",
                ";http://localhost:3000/AppSafe/getAppInfo;",
                userString
            );
            generateQrCode(url);
        }
    };

    const handleEnd2FAActivation = (event) => {
        setShowPopUpEnroll(false);
    };

    const generateQrCode = (urlIn) => {
        QRCode.toDataURL(urlIn, (err, url) => {
            if (err) return console.error(err);
            console.log(url);
            setQrcode(url);
        });
    };

    const handleLogOut = () => {
        currentUser.currentUser._id = "";
        currentUser.currentUser.username = "";
        currentUser.currentUser.twoFactorAuthentication.activated = false;
        currentUser.currentUser.twoFactorAuthentication.deliveryMethod = "";
        setCurrentUser(currentUser);
        navigate("/");
    };

    return (
        <div className="enable-2FA-container">
            <Box className="switch-container">
                <FormControlLabel
                    className="switch-label"
                    label="Activar 2FA"
                    control={
                        <Switch checked={enable2FA} onChange={handleChange} />
                    }
                />
                <br></br>
                <p>Seleccione el método de entrega del OTP:</p>
                <div className="metodos-entrega">
                    <div className="QR">
                        <button onClick={() => setDeliveryMethod("qr_code")}>
                            <img src={QR_ICON} />
                        </button>
                    </div>
                    <div className="plain-text">
                        <button onClick={() => setDeliveryMethod("plain_text")}>
                            <img src={PLAIN_TEXT_ICON} />
                        </button>
                    </div>
                </div>
                <input
                    className="btn-save"
                    type="button"
                    value="Guardar Cambios"
                    onClick={handleSaveChanges}
                />
            </Box>
            <Button
                className="btn-logout"
                variant="contained"
                onClick={handleLogOut}
                startIcon={<LogoutIcon />}
            >
                Cerrar Sesión
            </Button>
            <QRPopUp className="popup" trigger={showPopUpEnroll}>
                <p className="title">
                    Suscribe tu cuenta a la Aplicación móvil
                </p>
                <h3 className="description">
                    Para terminar la configuración escanea el siguiente código
                    QR con la aplicación móvil de <b>App Safe</b>.
                </h3>
                <div className="imageContainer">
                    <img src={qrcode} />
                </div>
                <div className="btnContainer">
                    <input
                        type="button"
                        value="Finalizar"
                        onClick={handleEnd2FAActivation}
                    />
                </div>
            </QRPopUp>
        </div>
    );
}
