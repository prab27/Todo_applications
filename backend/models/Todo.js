// backend/models/Todo.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  mentionedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  notes: [noteSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Update completedAt when todo is marked as completed
todoSchema.pre('save', function(next) {
  if (this.isModified('completed')) {
    this.completedAt = this.completed ? new Date() : null;
  }
  next();
});

// Index for efficient querying
todoSchema.index({ createdBy: 1, createdAt: -1 });
todoSchema.index({ tags: 1 });
todoSchema.index({ priority: 1 });

module.exports = mongoose.model('Todo', todoSchema);