import express from "express";
import fileUpload from "express-fileupload";
import postRoutes from "./routes/user.routes.js";
import appInfoRoutes from "./routes/app.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import sockets from "./sockets.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";
import { Server as WebSocketServer } from "socket.io";
import http from "http";

const app = express();
connectDB();

app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./upload",
    })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, X-Request-With,Content-Type,Accept, Access-Control-Allow,Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    res.header("Allow", "GET,POST,OPTIONS,PUT,DELETE");

    next();
});
app.use(postRoutes);
app.use(appInfoRoutes);
app.use(otpRoutes);

app.listen(PORT);

console.log("Server running on port ", PORT);
