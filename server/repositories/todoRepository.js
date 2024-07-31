const Todo = require("../models/todoModel.js")


const createTodo = async (todoData) => {
    const todo = new Todo(todoData);
    const moongoseResponse = await todo.save();

    return moongoseResponse._id.toString();

}

const getTodoById = async (todoId) => {
    const todo = await Todo.findById(todoId);
    return todo;
}

const getTodos = async (offset, limit, sort, order, completed) => {
    const findQuery = {};

    if (completed !== undefined) {
        findQuery["completed"] = completed;
    }

    const todos = await Todo.find(findQuery).skip(offset).limit(limit).sort([[sort, order]]);
    return todos;
}

const updateTodoById = async (todoId, newTodo) => {
    const res = await Todo.updateOne({ _id: todoId }, newTodo);

    return res.matchedCount;
}

const deleteTodoById = async (todoId) => {
    const res = await Todo.deleteOne({ _id: todoId });

    return res.deletedCount;
}

module.exports = { createTodo, getTodoById, getTodos, updateTodoById, deleteTodoById };