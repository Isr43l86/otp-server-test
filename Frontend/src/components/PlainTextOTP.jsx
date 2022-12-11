import React from "react";
import "../styles/plainTextOTP.css";

export default function PlainTextOTP({ otpValue }) {
    return (
        <div className="otpValuePlainTextContainer">
            <p className="otpText">{otpValue}</p>
        </div>
    );
}
