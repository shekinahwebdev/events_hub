const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const { getEventById } = require("../controllers/eventControllers");
const { registerForEvent } = require("../controllers/registrationControllers");

router.post("/book/ticket", authenticateUser, registerForEvent);
router.get("/:id", getEventById);

module.exports = router;
