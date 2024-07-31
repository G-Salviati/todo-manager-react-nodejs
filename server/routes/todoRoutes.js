const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");


router.post("/", todoController.createTodo);
router.get("/:todoId", todoController.getTodoById);
router.get("/", todoController.getTodos);
router.put("/:todoId", todoController.updateTodoById);
router.delete("/:todoId", todoController.deleteTodoById);

module.exports = router;