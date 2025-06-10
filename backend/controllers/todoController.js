// backend/controllers/todoController.js
const Todo = require('../models/Todo');
const User = require('../models/User');

const getTodos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      priority,
      tags,
      mentionedUser,
      completed,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { createdBy: req.user._id };

    // Apply filters
    if (priority) filter.priority = priority;
    if (completed !== undefined) filter.completed = completed === 'true';
    if (tags) filter.tags = { $in: tags.split(',') };
    if (mentionedUser) filter.mentionedUsers = mentionedUser;

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const todos = await Todo.find(filter)
      .populate('mentionedUsers', 'username firstName lastName')
      .populate('createdBy', 'username firstName lastName')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Todo.countDocuments(filter);

    res.json({
      success: true,
      data: {
        todos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    })
    .populate('mentionedUsers', 'username firstName lastName')
    .populate('createdBy', 'username firstName lastName');

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, priority, tags, mentionedUsers } = req.body;

    // Validate mentioned users
    const validUsers = [];
    if (mentionedUsers && mentionedUsers.length > 0) {
      const users = await User.find({ username: { $in: mentionedUsers } });
      validUsers.push(...users.map(user => user._id));
    }

    const todo = await Todo.create({
      title,
      description,
      priority,
      tags: tags || [],
      mentionedUsers: validUsers,
      createdBy: req.user._id
    });

    const populatedTodo = await Todo.findById(todo._id)
      .populate('mentionedUsers', 'username firstName lastName')
      .populate('createdBy', 'username firstName lastName');

    res.status(201).json({
      success: true,
      data: populatedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description, priority, tags, mentionedUsers, completed } = req.body;

    const todo = await Todo.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Validate mentioned users
    let validUsers = todo.mentionedUsers;
    if (mentionedUsers !== undefined) {
      validUsers = [];
      if (mentionedUsers.length > 0) {
        const users = await User.find({ username: { $in: mentionedUsers } });
        validUsers.push(...users.map(user => user._id));
      }
    }

    // Update fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (priority !== undefined) todo.priority = priority;
    if (tags !== undefined) todo.tags = tags;
    if (mentionedUsers !== undefined) todo.mentionedUsers = validUsers;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    const updatedTodo = await Todo.findById(todo._id)
      .populate('mentionedUsers', 'username firstName lastName')
      .populate('createdBy', 'username firstName lastName');

    res.json({
      success: true,
      data: updatedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const addNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Note text is required'
      });
    }

    const todo = await Todo.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todo.notes.push({ text: text.trim() });
    await todo.save();

    const updatedTodo = await Todo.findById(todo._id)
      .populate('mentionedUsers', 'username firstName lastName')
      .populate('createdBy', 'username firstName lastName');

    res.json({
      success: true,
      data: updatedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const exportTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ createdBy: req.user._id })
      .populate('mentionedUsers', 'username firstName lastName')
      .populate('createdBy', 'username firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        exportedAt: new Date().toISOString(),
        user: req.user.username,
        totalTodos: todos.length,
        todos
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  addNote,
  exportTodos
};