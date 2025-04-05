const express = require("express");
const router = express.Router();

const { createTask, updateTask, deleteTask, getTaskList, markTaskAsCompleted } = require('./task');
const { userAuth } = require("../middleware/auth");

router.route("/createTask").post(userAuth, createTask);
router.route("/updateTask").put(userAuth,updateTask);
router.route("/deleteTask").delete(userAuth,deleteTask);
router.route("/get-all-tasks").get(userAuth,getTaskList);
router.route("/markAsdone").patch(userAuth,markTaskAsCompleted);

module.exports = router;
