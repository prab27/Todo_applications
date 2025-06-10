// backend/utils/seedUsers.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const users = [
  {
    username: 'alice_wonder',
    email: 'alice@example.com',
    password: 'password123',
    firstName: 'Alice',
    lastName: 'Wonder'
  },
  {
    username: 'bob_builder',
    email: 'bob@example.com',
    password: 'password123',
    firstName: 'Bob',
    lastName: 'Builder'
  },
  {
    username: 'charlie_brown',
    email: 'charlie@example.com',
    password: 'password123',
    firstName: 'Charlie',
    lastName: 'Brown'
  },
  {
    username: 'diana_prince',
    email: 'diana@example.com',
    password: 'password123',
    firstName: 'Diana',
    lastName: 'Prince'
  },
  {
    username: 'eve_online',
    email: 'eve@example.com',
    password: 'password123',
    firstName: 'Eve',
    lastName: 'Online'
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp');
    
    // Clear existing users
    await User.deleteMany({});
    
    // Create new users
    const createdUsers = await User.create(users);
    
    console.log('Users seeded successfully:');
    createdUsers.forEach(user => {
      console.log(`- ${user.username} (${user.email})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();