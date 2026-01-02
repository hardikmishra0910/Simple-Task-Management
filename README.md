# Simple Task Management System

A complete MERN stack application for managing tasks with user authentication and priority-based organization.

![Task Management System](https://img.shields.io/badge/MERN-Stack-green)
![Node.js](https://img.shields.io/badge/Node.js-v14+-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## 🚀 Features

### Backend Features
- **User Authentication**: JWT-based register/login system
- **Task CRUD Operations**: Complete REST API for task management
- **Task Schema**: Title, description, due date, status, priority, assignment
- **Authorization**: Only authenticated users can manage tasks
- **Pagination**: Efficient task list pagination
- **Protected Routes**: Auth middleware on all task endpoints
- **Input Validation**: Server-side validation with express-validator

### Frontend Features
- **Modern UI**: Clean, responsive React interface
- **Task Management**: Full CRUD operations with real-time updates
- **Priority Organization**: Color-coded columns (High=Red, Medium=Yellow, Low=Green)
- **Task Status**: Toggle between pending/completed status
- **Confirmation Dialogs**: Safe deletion with user confirmation
- **Pagination**: Frontend pagination controls
- **React Hooks**: Modern React patterns throughout
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Frontend**: React.js, Axios, React Router, Context API
- **Database**: MongoDB (with in-memory fallback for development)
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Custom CSS with responsive design

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - uses in-memory database for development)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/hardikmishra0910/Simple-Task-Management.git
cd Simple-Task-Management
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure
```
Simple-Task-Management/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task management logic
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── tasks.js             # Task routes
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Express server setup
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Navigation header
│   │   │   ├── TaskCard.js      # Individual task component
│   │   │   ├── ConfirmDialog.js # Deletion confirmation
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── pages/
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── TaskList.js      # Main task dashboard
│   │   │   ├── CreateTask.js    # Task creation form
│   │   │   ├── EditTask.js      # Task editing form
│   │   │   └── TaskDetails.js   # Task detail view
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── utils/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── .gitignore
│   └── package.json
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get user's tasks (with pagination)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/users` - Get all users (for assignment)

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Tasks**: Add new tasks with title, description, due date, and priority
3. **Manage Tasks**: Edit, complete, or delete tasks as needed
4. **Organize by Priority**: View tasks in color-coded priority columns
5. **Track Progress**: Mark tasks as completed and monitor your productivity

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy the backend folder

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder
3. Configure API URL environment variable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Hardik Mishra**
- GitHub: [@hardikmishra0910](https://github.com/hardikmishra0910)

## 🙏 Acknowledgments

- Built with the MERN stack
- Inspired by modern task management applications
- Uses MongoDB Memory Server for development convenience

---

⭐ Star this repository if you found it helpful!