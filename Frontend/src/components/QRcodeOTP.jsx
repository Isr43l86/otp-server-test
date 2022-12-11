import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import "../styles/QRcodeOTP.css";

export default function QRcodeOTP({ otpValue }) {
    const [qrcode, setQrcode] = useState("");

    useEffect(() => {
        QRCode.toDataURL(`http://${otpValue}`, (err, url) => {
            if (err) return console.error(err);
            setQrcode(url);
        });
    }, []);

    return (
        <div className="otpValueQrContainer">
            <div className="otpQrBorder">
                <img src={qrcode} />
            </div>
        </div>
    );
}
