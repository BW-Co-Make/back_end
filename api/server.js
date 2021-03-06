// JWT token template for user/register/login
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const locationsRouter = require("../locations/locations-router.js");
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");
const issuesRouter = require("../issues/issues-router")
const authenticator = require("../auth/authenticator"); // if authenticator is ever needed to lock an entire router
// authenticator imported to routers individually as alfred

const server = express();


server.use(helmet());
server.use(express.json());
server.use(cors());


server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/issues", issuesRouter);
server.use("/api/locations", locationsRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});



module.exports = server;