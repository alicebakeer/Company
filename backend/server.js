const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const contentRoutes = require("./content");
console.log("CONTENT ROUTES LOADED");

app.use("/api", contentRoutes);

const contactRoutes = require("./contact");
console.log("CONTACT ROUTES LOADED");

app.use("/api", contactRoutes);

app.get("/", (req, res) => {
    res.send("Backend server is running");
});

const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

server.on("error", (err) => {
    console.error("SERVER ERROR:", err);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});