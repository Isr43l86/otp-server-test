import React from "react";
import "../styles/plainTextOTP.css";

export default function PlainTextOTP({ otpValue }) {
    return (
        <div className="otpValueContainer">
            <p className="otpText">{otpValue}</p>
        </div>
    );
}
