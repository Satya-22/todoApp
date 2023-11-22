const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const mongoose = require("mongoose");
const privateKey = "";

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.post("/", async function (req, res) {
  const post = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    completed: false,
    dateCreated: req.body.dateCreated,
    dateCompleted: "",
  });
  post
    .save()
    .then((savedPost) => {
      return res.status(201).json({
        id: savedPost._id,
        title: savedPost.title,
        description: savedPost.description,
        author: savedPost.author,
        completed: savedPost.completed,
        dateCreated: savedPost.dateCreated,
        dateCompleted: savedPost.dateCompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  Todo.find()
    .where("author")
    .equals(req.payload.id)
    .then((todos) => {
      return res.status(200).json(todos);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/:id", async function (req, res) {
  console.log("In GET /post handler :id", req.params.id);

  const id = req.params.id;

  console.log("id:", id);
  console.log("typeof id:", typeof id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid id:", id);
    return res.status(400).json({ error: "Invalid id." });
  }

  Todo.findOne({ _id: id, author: req.payload.id })
    .then((todo) => {
      if (todo) {
        return res.status(200).json({
          id: todo._id,
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          dateCreated: todo.dateCreated,
          dateCompleted: todo.dateCompleted,
        });
      }
      return res.status(404).json({ error: "Todo not found." });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;

  console.log("id:", id);
  console.log("typeof id:", typeof id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid id:", id);
    return res.status(400).json({ error: "Invalid id." });
  }

  Todo.findByIdAndDelete(id)
    .where("author")
    .equals(req.payload.id)
    .then((todo) => {
      if (todo) {
        // send a response if the Todo was found and deleted
        res.json({ message: "Todo deleted successfully" });
      } else {
        // send a response if the Todo was not found
        res.status(404).json({ error: "Todo not found" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the Todo" });
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log("id:", id);
  console.log("typeof id:", typeof id);

  try {
    const todo = await Todo.findByIdAndUpdate(id, updatedData, { new: true });
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json(todo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating Todo" });
  }
});
module.exports = router;
