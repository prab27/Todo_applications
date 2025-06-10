// backend/routes/users.js
const express = require('express');
const { getUsers, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;