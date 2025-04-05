const Task = require("../model/Task");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "80fP2W6qPXorIp7apPfY4iRL8";

exports.createTask = async (req, res, next) => {
  const { title, status, tags, category, description } = req.body;
  const token = req?.headers?.authorization;
  const user = jwt.verify(token, jwtSecret);
  await Task.create({ title, status, tags, category, description, userId: user.id })
    .then((task) => {
      res.status(201).json({
        message: "Task created successfully",
        task,
      });
    })
    .catch((error) =>
      res.status(400).json({
        message: "Task not created",
        error: error.message,
      })
    );
};

exports.getTaskList = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || '';
    const token = req?.headers?.authorization;
    const user = jwt.verify(token, jwtSecret);

    const task = await Task.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.id),
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { category: { $regex: searchQuery, $options: "i" } }
          ]
        }
      },
      {
        $facet: {
          count: [{ $count: "value" }],
          data: [
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: limit }
          ]
        }
      },
      { $unwind: { path: "$count", preserveNullAndEmptyArrays: true } },
      { $set: { count: { $ifNull: ["$count.value", 0] } } }
    ]);

    res.status(200).json({
      message: "Data fetched successfully",
      task: task[0] || { count: 0, data: [] }
    });

  } catch (err) {
    res.status(401).json({ message: "Not successful", error: err.message });
  }
};

exports.updateTask = async (req, res, next) => {
  const { id, taskData } = req.body;

  if (!id || !taskData) {
    return res.status(400).json({
      message: "Send proper Data",
    });
  };
  const token = req?.headers?.authorization;
  const user = jwt.verify(token, jwtSecret);
  const payload = {
    ...taskData,
    userId: user.id
  }
  try {
    await Task.findByIdAndUpdate(id, {
      ...payload
    }).then((ele) => {
      res.status(200).json({
        message: "Task updated successfully",
        data: payload
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update Task",
      error: err
    });
  };
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.body;
  await Task.findByIdAndDelete(id)
    .then((task) => {
      if (!task) {
        res.status(400).json({ message: "Task not found" });
      } else {
        res
          .status(201)
          .json({ message: "Task deleted successfully", task });
      }
    })
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};


exports.markTaskAsCompleted = async (req, res) => {
  try {
    const taskId = req.query.id;
    const token = req?.headers?.authorization;
    const user = jwt.verify(token, jwtSecret);
    const task = await Task.findOne({
      _id: new mongoose.Types.ObjectId(taskId),
      userId: new mongoose.Types.ObjectId(user.id),
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    task.status = "completed";
    await task.save();

    res.status(200).json({
      message: "Task marked as completed",
      task,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark task as completed", error: err.message });
  }
};

