const express = require("express");
const router = express.Router();
const {
  Login,
  UserRegister,
  getUser,
  deleteUser,
} = require("../controller/controller");

router.get("/user/:id", getUser);
router.post("/login", Login);
router.post("/user/register", UserRegister);
router.delete("/user/:id", deleteUser);

module.exports = router;
