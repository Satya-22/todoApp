const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
 
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: String, required: true },
  dateCompleted: { type: String, required: false },
});

module.exports = mongoose.model("Todo", PostSchema);
