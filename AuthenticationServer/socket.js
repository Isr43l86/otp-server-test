import axios from "axios";

export default (io) => {
    io.on("connection", (socket) => {
        console.log(socket.id);
        console.log("a user connected");

        socket.on("sendOTPfromMobile", function (otpInfo) {
            const getSocketInfo = async () => {
                await axios({
                    method: "get",
                    url: "http://localhost:3000/AppSafe/getOTPinfo",
                    params: {
                        userId: otpInfo.id,
                        username: otpInfo.username,
                    },
                }).then((response) => {
                    const otpInfoWeb = response.data.otp;
                    console.log(otpInfoWeb);
                    if (otpInfoWeb.otpValue === otpInfo.otpValue) {
                        console.log("access granted");
                        console.log(
                            io.to(otpInfoWeb.socketId).emit("access", "true")
                        );
                    } else {
                        console.log("access denied");
                    }
                });
            };
            getSocketInfo();
        });
    });
};
