Task Management System

Overview

This project is a role-based task management system built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
It allows Admins, Managers, and Users to manage tasks efficiently with different access levels.

The application includes:
• Secure authentication with JWT
• Role-based permissions
• Task creation, assignment, and status tracking
• Role management by Admin

⸻

Tech Stack

Frontend: React.js (Vite), Axios, Context API, CSS
Backend: Node.js, Express.js, MongoDB, JWT
Database: MongoDB Atlas

⸻

Features
• Authentication: Signup/Login with JWT token storage
• Admin: Create/assign tasks, manage roles
• Manager: Assign tasks to users
• User: View and update their assigned tasks
• Dynamic UI: Conditional rendering based on role

Installation & Setup

1. Clone Repository
   git clone https://github.com/Anujkumarsony/task-management-system
   cd <repo-name>

2. Backend Setup
   cd backend
   npm install

Create .env file in the backend folder:

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend server:

npm start

3. Frontend Setup

cd frontend
npm install

Run frontend:

npm run dev

Running the App
• Backend: http://localhost:5001
• Frontend: http://localhost:5173
