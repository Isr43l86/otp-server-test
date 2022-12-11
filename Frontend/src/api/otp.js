import axios from "axios";

export const sendOTPgeneratedRequest = async (otpInfor) =>
    await axios.post(
        "http://localhost:3000/AppSafe/sendOTPgenerated",
        otpInfor
    );
