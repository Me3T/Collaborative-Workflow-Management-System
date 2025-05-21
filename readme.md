Collaborative Workflow Management System - Backend
This repository contains the backend API for a Collaborative Workflow Management System. It is built using Node.js and Express.js, providing functionalities for user authentication, profile management, and project management.

Technologies Used
Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

MongoDB: NoSQL database for data storage.

Mongoose: MongoDB object data modeling (ODM) library for Node.js.

JWT (JSON Web Tokens): For user authentication and authorization.

bcrypt: For password hashing and comparison.

cookie-parser: Middleware for parsing cookies attached to the client request object.

dotenv: For loading environment variables from a .env file.

validator: For string validation (e.g., email, strong password).

Features
User Authentication:

User registration (/addUser).

User login (/login) with JWT token generation and cookie-based storage.

User Profile Management:

View authenticated user's profile (/profile/view).

Project Management:

Create new projects (/addProject).

(Currently, only project creation is implemented. CRUD operations for projects will need to be expanded.)

Role-Based Access Control (RBAC):

Middleware for user authentication (userAuth).

Middleware for checking admin role (isAdmin). (Currently, isAdmin is defined but not yet fully integrated into routes for protection).

Data Models:

User model with name, email, hashed password, and role. Includes methods for JWT generation and password validation.

Project model with name, description, start date, due date, status, and team members.

Task model with title, description, assigned user, priority, status, due date, and linked project.

Project Structure
.
├── app.js # Main application entry point
├── config
│ └── database.js # Database connection configuration (MongoDB)
├── middlewares
│ └── auth.js # Authentication (JWT) and authorization (isAdmin) middleware
├── models
│ ├── project.js # Mongoose schema for Project
│ ├── task.js # Mongoose schema for Task
│ └── user.js # Mongoose schema for User
├── routes
│ ├── auth.js # Authentication related routes (register, login)
│ ├── profile.js # User profile related routes (view profile)
│ └── project.js # Project related routes (add project)
└── utils
└── validation.js # Utility functions for data validation (e.g., user signup)

Setup Instructions
Follow these steps to get the backend server up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm (Node Package Manager) or Yarn

MongoDB installed and running locally, or access to a cloud MongoDB instance (e.g., MongoDB Atlas).

1. Clone the Repository
   First, clone this repository to your local machine:

git clone <repository_url>
cd <your_backend_folder_name> # e.g., cd workflow-management-backend

2. Install Dependencies
   Navigate to the project root directory and install the required Node.js packages:

npm install # or yarn install

3. Environment Configuration
   Create a .env file in the root of your backend directory. This file will store sensitive information and configuration variables.

PORT=3000
MONGO_URI=mongodb://localhost:27017/workflow_db # Or your MongoDB Atlas connection string
JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_HERE # Generate a strong, random key

PORT: The port on which the server will run (default is 3000).

MONGO_URI: Your MongoDB connection string.

For a local MongoDB instance, it might look like mongodb://localhost:27017/your_database_name.

For MongoDB Atlas, it will be a string provided by Atlas.

JWT_SECRET: A strong, unique secret key used to sign and verify JSON Web Tokens for authentication. It is crucial to generate a complex, random string for this in a production environment.

4. Running the Application
   Once everything is configured, start the server:

npm start # or node app.js

You should see "Connection Established" and "Server is running" messages in your console, indicating the backend is operational. The server will be listening on http://localhost:3000.

API Documentation
This section outlines the primary API endpoints. For detailed request/response schemas, it's recommended to use a tool like Postman or Swagger.

Base URL
http://localhost:3000 (or your deployed backend URL)

Authentication Routes (/)
POST /addUser

Description: Registers a new user.

Request Body:

{
"name": "John Doe",
"email": "john.doe@example.com",
"password": "StrongPassword123!",
"role": "user" // or "admin"
}

Response (Success): User Added (String)

Response (Error): Error saving the user: <error_message> (String)

POST /login

Description: Authenticates a user and sets a JWT in an httpOnly cookie.

Request Body:

{
"email": "john.doe@example.com",
"password": "StrongPassword123!"
}

Response (Success): Login Successfull !! (String)

Response (Error): Error Logging In Please check credentials<error_message> (String)

Profile Routes (/profile)
GET /profile/view

Description: Retrieves the profile of the authenticated user. Requires a valid JWT in the cookie.

Authentication: Required (userAuth middleware applied).

Response (Success): User object (e.g., { "\_id": "...", "name": "...", "email": "...", "role": "..." })

Response (Error): Error: <error_message> (String)

Project Routes (/)
POST /addProject

Description: Creates a new project.

Request Body:

{
"name": "Website Redesign",
"description": "Complete overhaul of the company website.",
"startDate": "2024-05-01T00:00:00.000Z",
"dueDate": "2024-06-30T00:00:00.000Z"
}

Response (Success): Project Added (String)

Response (Error): Error saving the project: <error_message> (String)

Postman Collection (Conceptual)
To easily test these endpoints, you can create a Postman Collection. Here's how you'd set up a few requests:

Create a new Collection in Postman.

Add a new Request for POST /addUser:

Method: POST

URL: http://localhost:3000/addUser

Headers: Content-Type: application/json

Body (raw, JSON):

{
"name": "Admin User",
"email": "admin@example.com",
"password": "AdminStrongPassword123!",
"role": "admin"
}

Add a new Request for POST /login:

Method: POST

URL: http://localhost:3000/login

Headers: Content-Type: application/json

Body (raw, JSON):

{
"email": "admin@example.com",
"password": "AdminStrongPassword123!"
}

Note: After a successful login, Postman will automatically handle the cookie.

Add a new Request for GET /profile/view:

Method: GET

URL: http://localhost:3000/profile/view

Note: This request will automatically send the cookie set by the /login endpoint if you are in the same Postman session.

Swagger/OpenAPI (Conceptual)
For more interactive API documentation, you can integrate a library like swagger-jsdoc and swagger-ui-express into your Node.js backend. This allows you to define your API endpoints, request/response schemas, and authentication methods using JSDoc comments in your code, which then generates interactive API documentation accessible via a web browser (e.g., http://localhost:3000/api-docs).

Seeding the Database with Dummy Data
To test the application effectively, you'll need some initial data in your MongoDB database. You can create a simple Node.js script to achieve this.

Create a seed.js file (e.g., in a scripts folder at the root of your backend directory):

// scripts/seed.js
require('dotenv').config(); // Load environment variables
const connectDB = require('../config/database');
const User = require('../models/user');
const Project = require('../models/project');
const Task = require('../models/task');
const bcrypt = require('bcrypt');

const seedData = async () => {
try {
await connectDB();
console.log('Database connected for seeding...');

    // Clear existing data (optional, for fresh seeding)
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('Existing data cleared.');

    // 1. Create Users
    const hashedPasswordAdmin = await bcrypt.hash('AdminPassword123!', 10);
    const hashedPasswordUser1 = await bcrypt.hash('UserPassword123!', 10);
    const hashedPasswordUser2 = await bcrypt.hash('AnotherUserPass!', 10);

    const users = await User.insertMany([
      { name: 'Admin User', email: 'admin@example.com', password: hashedPasswordAdmin, role: 'admin' },
      { name: 'John Doe', email: 'john.doe@example.com', password: hashedPasswordUser1, role: 'user' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', password: hashedPasswordUser2, role: 'user' },
    ]);
    console.log('Users seeded:', users.map(u => u.name));

    const adminUserId = users.find(u => u.role === 'admin')._id;
    const johnDoeId = users.find(u => u.name === 'John Doe')._id;
    const janeSmithId = users.find(u => u.name === 'Jane Smith')._id;

    // 2. Create Projects
    const projects = await Project.insertMany([
      {
        name: 'Website Redesign',
        description: 'Complete overhaul of the company website with modern UI/UX.',
        startDate: new Date('2024-05-01'),
        dueDate: new Date('2024-07-15'),
        status: 'in-progress',
        teamMembers: [adminUserId, johnDoeId],
      },
      {
        name: 'Mobile App Development',
        description: 'Develop cross-platform mobile application for internal tools.',
        startDate: new Date('2024-06-01'),
        dueDate: new Date('2024-09-30'),
        status: 'open',
        teamMembers: [adminUserId, janeSmithId],
      },
      {
        name: 'Q3 Marketing Campaign',
        description: 'Plan and execute digital marketing strategies for the third quarter.',
        startDate: new Date('2024-03-10'),
        dueDate: new Date('2024-05-20'),
        status: 'completed',
        teamMembers: [johnDoeId, janeSmithId],
      },
    ]);
    console.log('Projects seeded:', projects.map(p => p.name));

    const websiteRedesignId = projects.find(p => p.name === 'Website Redesign')._id;
    const mobileAppId = projects.find(p => p.name === 'Mobile App Development')._id;
    const marketingCampaignId = projects.find(p => p.name === 'Q3 Marketing Campaign')._id;

    // 3. Create Tasks
    await Task.insertMany([
      {
        title: 'Design UI Mockups',
        description: 'Create high-fidelity mockups for key website pages.',
        assignedUser: johnDoeId,
        priority: 'high',
        status: 'in-progress',
        dueDate: new Date('2024-06-10'),
        project: websiteRedesignId,
      },
      {
        title: 'Develop Homepage Frontend',
        description: 'Implement the homepage using React and Tailwind CSS.',
        assignedUser: johnDoeId,
        priority: 'high',
        status: 'to-do',
        dueDate: new Date('2024-06-25'),
        project: websiteRedesignId,
      },
      {
        title: 'Set up Backend API',
        description: 'Configure Node.js Express API and MongoDB connection.',
        assignedUser: adminUserId,
        priority: 'medium',
        status: 'done',
        dueDate: new Date('2024-05-20'),
        project: websiteRedesignId,
      },
      {
        title: 'Define Mobile App Features',
        description: 'List all core features for the mobile application MVP.',
        assignedUser: janeSmithId,
        priority: 'high',
        status: 'to-do',
        dueDate: new Date('2024-06-15'),
        project: mobileAppId,
      },
      {
        title: 'Content Creation for Social Media',
        description: 'Generate engaging content for Facebook, Instagram, and Twitter.',
        assignedUser: janeSmithId,
        priority: 'medium',
        status: 'completed', // Status can be 'done' or 'completed' depending on your enum
        dueDate: new Date('2024-05-10'),
        project: marketingCampaignId,
      },
    ]);
    console.log('Tasks seeded.');

    console.log('Database seeding complete!');

} catch (error) {
console.error('Error seeding database:', error);
process.exit(1);
} finally {
mongoose.connection.close();
}
};

seedData();

Run the seed script:

node scripts/seed.js

This will connect to your database (using the MONGO_URI from your .env), clear existing data (if any), and then insert the dummy users, projects, and tasks.

Optional Deployment
You can deploy your Node.js backend to various cloud platforms. Here are general steps and common choices:

Common Platforms
Render: Good for full-stack applications, supports databases.

Railway: Developer-friendly platform, easy to deploy services and databases.

Heroku: (Free tier limitations apply) A popular PaaS (Platform as a Service).

Vercel: Excellent for serverless functions, suitable if your backend is structured that way.

Deployment Steps (General)
Version Control: Ensure your code is pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket).

Choose a Platform: Select one of the platforms mentioned above.

Connect Repository: Link your backend repository to the chosen hosting platform.

Configure Build Command: Most platforms will automatically detect Node.js, but ensure the build command (if any) and start command (npm start or node app.js) are correctly set.

Set Environment Variables: Crucially, configure all your .env variables (PORT, MONGO_URI, JWT_SECRET, etc.) directly within the hosting platform's dashboard. Never commit your .env file to Git.

Database Provisioning: If you're using a cloud database (like MongoDB Atlas), ensure it's accessible from your deployed server. Some platforms (like Render, Railway) can also host your database.

Deploy: Trigger the deployment. The platform will build and run your application.

Important Notes & Future Improvements
Missing projectRouter Import in app.js:

You have app.use("/", projectRouter); but projectRouter is not imported.

Fix: Add const projectRouter = require("./routes/project"); at the top of app.js.

Inconsistent Field Name in projectRouter:

In routes/project.js, when adding a project, you use endDate in the project object:

const project = new Project({
name,
description,
startDate,
endDate, // <-- This should be 'dueDate'
});

However, your project.js model schema uses dueDate.

Fix: Change endDate to dueDate in routes/project.js to match the schema.

Task Management Routes:

Currently, there are no API routes for tasks (creating, reading, updating, deleting tasks).

Improvement: Implement routes/task.js (or integrate task routes into routes/project.js) with endpoints like:

POST /projects/:projectId/tasks

GET /projects/:projectId/tasks

PUT /tasks/:taskId

DELETE /tasks/:taskId

Full CRUD for Projects:

Only addProject is implemented in routes/project.js.

Improvement: Add routes for GET /projects, GET /projects/:id, PUT /projects/:id, and DELETE /projects/:id.

Role-Based Access Control Implementation:

The isAdmin middleware is defined but not used in the provided routes.

Improvement: Apply isAdmin middleware to routes that should only be accessible by administrators (e.g., creating/updating/deleting projects, managing users). Example:

// In routes/project.js
const { userAuth, isAdmin } = require("../middlewares/auth");

projectRouter.post("/addProject", userAuth, isAdmin, async (req, res) => {
// ...
});

Redundant process Imports:

require("process") is not necessary as process is a global object in Node.js.

Fix: Remove const process = require("process"); from config/database.js, middlewares/auth.js, and models/user.js.

Error Handling:

While try-catch blocks are used, consider implementing a centralized error handling middleware for more consistent responses and better logging.

CORS (Cross-Origin Resource Sharing):

If your frontend is served from a different domain/port than your backend, you will need to enable CORS.

Improvement: Install cors package (npm install cors) and use it in app.js:

const cors = require("cors");
// ...
app.use(cors()); // For all origins, or configure specific origins
// ...

Input Validation:

validateSignUpData is used for user signup.

Improvement: Implement similar validation for project and task creation/updates to ensure data integrity.

Password Strength Validation:

The userSchema includes validator.isStrongPassword. Ensure your JWT_SECRET is strong and users are prompted to create strong passwords.
#   C o l l a b o r a t i v e - W o r k f l o w - M a n a g e m e n t - S y s t e m  
 