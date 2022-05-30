"use strict";

const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

// In real-world application we can use a database like MongoDB
// You can use the fastify plugin https://github.com/fastify/fastify-mongodb
module.exports = fp(async function (fastify, opts) {
  fastify.decorate("todoDb", [
    {
      id: 1,
      description: "Complete code review 👌",
      done: true,
      doneAt: "2022-05-30T11:55:46.974Z",
    },
    {
      id: 2,
      description: "Commit and push everything 🤖",
    },
  ]);
});
