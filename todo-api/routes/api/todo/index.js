'use strict'

// In real-world application, declare a JSON Schema in fastify route to validate incoming data
// You can use something like https://github.com/fastify/fluent-json-schema
module.exports = async function (fastify, opts) {
  fastify.get('/', async function () {
    return fastify.todoDb
  })

  fastify.get('/:id', async function (request, reply) {
    const todoId = +request.params.id
    if (isNaN(todoId)) {
      return reply.badRequest('The given id is not a number.')
    }

    const todo = fastify.todoDb.find(predicateTodoById(todoId))

    if (!todo) {
      return reply.notFound('Todo not found.')
    }

    return todo
  })

  fastify.post('/', async function (request, reply) {
    if (!request.body.description) {
      return reply.badRequest('description is required.')
    }

    const isTodoDone = !!request.body.done || false
    const todo = {
      id: fastify.todoDb.length
        ? fastify.todoDb[fastify.todoDb.length - 1].id + 1
        : 1,
      description: request.body.description,
      done: isTodoDone,
      doneAt: generateTodoDoneAt(isTodoDone)
    }

    fastify.todoDb.push(todo)

    return todo
  })

  fastify.put('/:id', async function (request, reply) {
    const todoId = +request.params.id
    if (isNaN(todoId)) {
      return reply.badRequest('The given id is not a number.')
    }

    const todoIndex = fastify.todoDb.findIndex(predicateTodoById(todoId))
    if (todoIndex === -1) {
      return reply.notFound(`Todo id ${todoId} does not exist.`)
    }

    const todo = fastify.todoDb[todoIndex]
    const description = request.body.description ?? todo.description
    const done = request.body.done == null ? todo.done : !!request.body.done
    let doneAt = todo.doneAt
    if (done) {
      if (doneAt == null) {
        doneAt = generateTodoDoneAt(true)
      }
    } else {
      if (doneAt != null) {
        doneAt = generateTodoDoneAt(false)
      }
    }

    fastify.todoDb[todoIndex] = {
      ...todo,
      description,
      done,
      doneAt
    }

    return fastify.todoDb[todoIndex]
  })

  fastify.delete('/:id', async function (request, reply) {
    const todoId = +request.params.id
    if (isNaN(todoId)) {
      return reply.badRequest('The given id is not a number.')
    }

    const todoIndex = fastify.todoDb.findIndex(predicateTodoById(todoId))
    if (todoIndex === -1) {
      return reply.notFound(`Todo id ${todoId} does not exist.`)
    }

    fastify.todoDb.splice(todoIndex, 1)

    reply.code(204)
  })
}

function predicateTodoById (todoId) {
  return (todo) => todo.id === todoId
}

function generateTodoDoneAt (done) {
  return done ? new Date().toISOString() : undefined
}
