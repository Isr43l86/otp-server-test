import React from "react";
import Enable2FA from "../components/Enable2FA";
import "../styles/enable2FA.css";

export default function Home() {
    return (
        <div id="mainContainer">
            <div className="enable2FA-background"></div>
            <div className="enable2FA-container">
                <Enable2FA />
            </div>
        </div>
    );
}
