import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import "../styles/QRcodeOTP.css";

export default function QRcodeOTP({ otpValue }) {
    const [qrcode, setQrcode] = useState("");
    console.log("este es el valor del otp  " + otpValue);

    const generateQrCode = (urlIn) => {
        QRCode.toDataURL(urlIn, (err, url) => {
            if (err) return console.error(err);
            console.log(url);
            setQrcode(url);
        });
    };

    useEffect(() => {
        let url = "http://192.168.100.14:3000/AppSafe/generateJWT".concat(
            ";",
            otpValue
        );
        generateQrCode(url);
    }, [otpValue]);

    return (
        <div className="otpValueQrContainer">
            <div className="otpQrBorder">
                <img src={qrcode} />
            </div>
        </div>
    );
}
