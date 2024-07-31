const todoRepository = require("../repositories/todoRepository");

const createTodo = async (todoData) => {
    return await todoRepository.createTodo(todoData);
}

const getTodoById = async (todoId) => {
    return await todoRepository.getTodoById(todoId);
}

const getTodos = async (queryParams) => {
    const { page, limit, sort, order, completed } = queryParams;

    const offset = (page - 1) * limit;

    return await todoRepository.getTodos(offset, limit, sort, order, completed);
}

const updateTodoById = async (todoId, newTodo) => {
    return await todoRepository.updateTodoById(todoId, newTodo);
}

const deleteTodoById = async (todoId) => {
    return await todoRepository.deleteTodoById(todoId);
}

module.exports = { createTodo, getTodoById, getTodos, updateTodoById, deleteTodoById };