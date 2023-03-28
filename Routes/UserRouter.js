const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  updateUser,
} = require("../Controllers/UserController");
const { AuthMiddleware } = require("../MiddleWares/AuthMiddleware");
const { DataValidation } = require("../MiddleWares/DataValidation");

router.post("/signup", DataValidation, Register);
router.post("/signin", Login);
router.put("/profile/:id", AuthMiddleware, updateUser);

module.exports = router;
