const Mongoose = require("mongoose");

const TaskSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    tags: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    userId: Mongoose.Schema.Types.ObjectId
});
const Task = Mongoose.model("Task", TaskSchema);

module.exports = Task;
