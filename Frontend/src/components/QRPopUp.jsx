import React from "react";
import "../styles/QRPopUp.css";

export default function QRPopUp({ children, trigger }) {
    return trigger ? (
        <div className="popup">
            <div className="popupContainer">{children}</div>
        </div>
    ) : (
        ""
    );
}
