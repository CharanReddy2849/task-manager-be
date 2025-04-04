const Task = require("../model/Task");
const jwt = require("jsonwebtoken");
const jwtSecret = "80fP2W6qPXorIp7apPfY4iRL8";

exports.createTask = async (req, res, next) => {
  const { title, status, tags, category, description, userId } = req.body;

  await Task.create({title, status, tags, category, description, userId})
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
  const skip = req.query.skip || 0;
  const limit = req.query.limit || 10;
  const searchQuery = req.query.search || '';
  const token = req?.headers?.authorization?.split(" ")[1];
    const user = jwt.verify(token, jwtSecret);
    console.log(user)
  res
  .status(200)
  .json({ message: "Data fetched successfully", ...char[0], });
//   await Task.aggregate([
//         { 
//         $match: { 
//             userId: userId,
//             $or: [
//             { name: { $regex: searchQuery, $options: "i" } }, 
//             { nick_name: { $regex: searchQuery, $options: "i" } }
//             ]
//         } 
//         },
//         {
//         $facet: {
//             count: [{ $count: "value" }],
//             data: [{ $sort: { _id: -1 } }, { $skip: parseInt(skip) }, { $limit: parseInt(limit) }]
//         }
//         },
//         { $unwind: "$count" },
//         { $set: { count: "$count.value" } }
//   ]).then((char) => {
//       res
//         .status(200)
//         .json({ message: "Data fetched successfully", ...char[0], });
//     })
//     .catch((err) =>
//       res.status(401).json({ message: "Not successful", error: err.message })
//     );
};

exports.updateChar = async (req, res, next) => {
  const { id, char_data } = req.body;

  if (!id || !char_data) {
    return res.status(400).json({
      message: "Send proper Data",
    });
  };
  try {
    await Fiction.findByIdAndUpdate(id, {
      ...char_data
    }).then((ele) => {
      res.status(200).json({
        message: "character updated successfully",
        data: ele
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update character",
      error: err
    });
  };
};

exports.deleteChar = async (req, res, next) => {
  const { id } = req.query;
  await Fiction.findByIdAndDelete(id)
    .then((char) => {
      if (!char) {
        res.status(400).json({ message: "Character is not found" });
      } else {
        res
          .status(201)
          .json({ message: "Character deleted successfully", char });
      }
    })
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
