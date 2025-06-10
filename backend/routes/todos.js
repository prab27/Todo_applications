// backend/routes/todos.js
const express = require('express');
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  addNote,
  exportTodos
} = require('../controllers/todoController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.get('/export', exportTodos);

router.route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

router.post('/:id/notes', addNote);

module.exports = router;