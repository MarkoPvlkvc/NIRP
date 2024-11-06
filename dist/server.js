"use strict";
const express = require("express");
const path = require("path");
const SERVER_PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, "../frontend")));
console.log("lmao: " + path.join(__dirname, "../frontend"));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});
app.get("/database", (req, res) => {
    res.sendFile("database.html");
});
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
});
