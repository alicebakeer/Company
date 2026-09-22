const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
app.use(cors());

app.use(express.json());
const contentRoutes = require("./content");
console.log("CONTENT ROUTES LOADED");
app.use("/api", contentRoutes);
const contactRoutes = require("./contact");
console.log("CONTACT ROUTES LOADED");
app.use("/api", contactRoutes)
const signupRoutes = require("./Signup");
console.log("SIGNUP ROUTES LOADED");
app.use("/api/auth", signupRoutes);
const loginRoutes = require("./Login");
console.log("LOGIN ROUTES LOADED");
app.use("/api/auth", loginRoutes);

const serviceRoutes=require("./Service");
app.use("/api/service",serviceRoutes);

const authMiddleware = require("./middleware/authmiddleware");

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
