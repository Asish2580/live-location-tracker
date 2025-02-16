const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));

let users = {}; // Store user locations

io.on("connection", (socket) => {
    console.log("New user connected: " + socket.id);

    socket.emit("broadcastLocation", users);
    
    socket.on("updateLocation", (data) => {
        users[socket.id] = data;
        io.emit("broadcastLocation", users);
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("broadcastLocation", users);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
