import app from "./app.js";
import { Server as WebSocketServer } from "socket.io";
import http from "http";

const server = new http.createServer(app);
const httpServer = server.listen(4000);
const io = new WebSocketServer(httpServer);

console.log("Server listening on port 4000");
