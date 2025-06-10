# Todo Application

A full-stack todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a modern UI and comprehensive task management capabilities.

## Features

- 🔐 **User Authentication**

  - Secure login system
  - JWT-based authentication
  - Demo user accounts for quick testing

- 📝 **Todo Management**

  - Create, read, update, and delete todos
  - Mark todos as complete/incomplete
  - Priority levels (High, Medium, Low)
  - Add tags to todos
  - Add notes to todos
  - Mention other users in todos

- 🔍 **Advanced Filtering & Sorting**

  - Filter by priority
  - Filter by completion status
  - Filter by tags
  - Sort by creation date
  - Sort by priority
  - Pagination support

- 👥 **User Features**

  - User profiles
  - User mentions in todos
  - User listing

- 💅 **Modern UI/UX**
  - Responsive design
  - Loading states
  - Error handling
  - Clean and intuitive interface

## Demo

Watch our application demo video to see all features in action:

[![Todo App Demo](https://img.youtube.com/vi/4vpnslLZyTA/0.jpg)](https://www.youtube.com/watch?v=4vpnslLZyTA)

Click the image above to watch the demo video on YouTube.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env file with your configuration
# Edit .env file and add:
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
PORT=5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

### 1. Start MongoDB

Make sure your MongoDB server is running locally or update the MONGODB_URI in the backend .env file with your MongoDB connection string.

### 2. Start Backend Server

```bash
# In the backend directory
npm run dev
```

The backend server will start on http://localhost:5000

### 3. Start Frontend Development Server

```bash
# In the frontend directory
npm start
```

The frontend development server will start on http://localhost:3000

## Demo Users

The application comes with pre-configured demo users for testing:

```
Username: alice_wonder
Password: password123

Username: bob_builder
Password: password123

Username: charlie_brown
Password: password123

Username: diana_prince
Password: password123

Username: eve_online
Password: password123
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Todos

- GET `/api/todos` - Get all todos (with filters)
- POST `/api/todos` - Create new todo
- GET `/api/todos/:id` - Get specific todo
- PUT `/api/todos/:id` - Update todo
- DELETE `/api/todos/:id` - Delete todo
- POST `/api/todos/:id/notes` - Add note to todo

### Users

- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get specific user

## Project Structure

```
todo/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── services/
│       └── App.js
└── README.md
```

## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
PORT=5000
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Built with React.js and Node.js
- Styled with CSS
- Database: MongoDB
- Authentication: JWT
- Icons: Lucide React
