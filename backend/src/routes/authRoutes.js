const express = require("express");
const { login, register, refresh } = require("../controllers/authControllers");

const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refresh);

module.exports = router;
