const express = require("express");
const router = express.Router();
const Login = require("./controller");

router.post("/login", Login);

module.exports = router;
