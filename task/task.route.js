const express = require("express");
const router = express.Router();

const { createTask } = require('./task');
const { userAuth } = require("../middleware/auth");

router.route("/createTask").post(createTask);

module.exports = router;
