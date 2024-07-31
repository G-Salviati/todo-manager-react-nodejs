require('dotenv').config();
const todoService = require("../services/todoService");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { mapTodoToResponse } = require("../utils/todoMapper");

const todoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    completed: Joi.boolean()
});

const todoUpdateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    completed: Joi.boolean()
});

const getTodosQuerySchema = Joi.object({
    sort: Joi.string().valid("createdAt").default("createdAt"),
    order: Joi.string().valid("asc", "desc").default("asc"),
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    completed: Joi.boolean().optional()

})

const idSchema = Joi.object({
    todoId: Joi.objectId().required()
});

const createTodo = async (req, res) => {
    try {
        const todoData = req.body;
        const { validationError, value } = todoSchema.validate(todoData);

        if (validationError) {
            return res.status(400).json({ error: validationError.details[0].message });
        }

        const todoId = await todoService.createTodo(value);
        const locationUrl = `${process.env.BASE_PATH}/todos/${todoId}`;

        return res.status(201).location(locationUrl).end();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTodoById = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const { validationError } = idSchema.validate(todoId);

        if (validationError) {
            return res.status(400).json({ error: validationError.details[0].message });
        }

        const todo = await todoService.getTodoById(todoId);

        if (!todo) {
            return res.status(404).json({ error: "Not found!" });
        }

        const todoResponse = mapTodoToResponse(todo);

        return res.status(200).json(todoResponse);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTodos = async (req, res) => {
    try {
        const queryParams = req.query;

        const { validationError, value } = getTodosQuerySchema.validate(queryParams);

        if (validationError) {
            res.status(400).json({ error: validationError.details[0].message });
        }

        const todos = await todoService.getTodos(value);

        const todosResponse = todos.map((todo) => mapTodoToResponse(todo));

        console.log(todosResponse);

        return res.status(200).json(todosResponse);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const updateTodoById = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const { validationErrorId } = idSchema.validate(todoId);

        if (validationErrorId) {
            return res.status(400).json({ error: validationErrorId.details[0].message });
        }

        const todoData = req.body;
        const { validationErrorBody, value } = todoUpdateSchema.validate(todoData);

        if (validationErrorBody) {
            return res.status(400).json({ error: validationErrorBody.details[0].message });
        }

        const matchedCount = await todoService.updateTodoById(todoId, value);

        if (!matchedCount) {
            return res.status(404).end();
        }

        return res.status(204).end();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteTodoById = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const { validationError } = idSchema.validate(todoId);

        if (validationError) {
            return res.status(400).json({ error: validationError.details[0].message });
        }

        const deletedCount = await todoService.deleteTodoById(todoId);

        if (!deletedCount) {
            return res.status(404).end();
        }

        return res.status(204).end();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { createTodo, getTodoById, getTodos, updateTodoById, deleteTodoById };