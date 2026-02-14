import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default server;