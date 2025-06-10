// backend/controllers/userController.js
const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username firstName lastName email createdAt')
      .sort({ username: 1 });

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 'username firstName lastName email createdAt');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUser
};