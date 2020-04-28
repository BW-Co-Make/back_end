// JWT token template for user/register/login
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const locationsRouter = require("../locations/locations-router.js");
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");
const authenticator = require("../auth/authenticator");

const server = express();


server.use(helmet());
server.use(express.json());
server.use(cors());

// add authenticator on users perhaps later, for now recieve a list
server.use("/api/users", usersRouter);
server.use("/api/locations", locationsRouter);
server.use("/api/auth", authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});



module.exports = server;