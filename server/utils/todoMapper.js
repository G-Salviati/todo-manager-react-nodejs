const mapTodoToResponse = (todo) => {
    return {
        id: todo._id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
    }
}

module.exports = {
    mapTodoToResponse
}