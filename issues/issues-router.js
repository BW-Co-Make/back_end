const router = require("express").Router();

const Issues = require("./issues-model");

const check = require('../middleware/index');

const alfred = require('../auth/authenticator');