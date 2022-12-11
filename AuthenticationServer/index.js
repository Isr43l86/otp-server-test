import app from "./app.js";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import sockets from "./socket.js";

const server = new http.createServer(app);
const httpServer = server.listen(4000);
console.log("Server listening on port 4000");
const io = new WebSocketServer(httpServer, {
    cors: {
        origin: "*",
    },
});
sockets(io);
