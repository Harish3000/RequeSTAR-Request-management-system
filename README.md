# Request Management System 
## -- Full Stack Development Assignment --

## Introduction 📋
Welcome to the Request Management System! This project is built using the MERN (MongoDB, Express, React, Node.js) stack with TypeScript, aiming to manage and track requests efficiently. The system features a responsive design, a functional navigation bar, and complete CRUD operations with a focus on GET, POST, and PATCH methods. 

Currently, the system primarily handles request management but is designed to be open for extension, allowing for the integration of additional features such as feedback management, reports generation, and more.

## Features ✨
- **Responsive Navbar**: Highlights the active status of each section (Dashboard, Requests, Feedbacks, Reports, Patient, Settings), with a dropdown menu in the Settings section.
- **Request Status Circles**: Displays responsive circles showing counts for New Requests, In Progress Requests, Escalated Requests, and On Hold Requests.
- **Request Table**: Displays a table with request details including filters for status and department, with badges for status and priority.
- **Request Form**: Add/edit requests with fields like Request ID, Created On, Location, Service, Status, Priority, Department, Requested By, Assigned To, including actions for delete and edit.
- **Backend API**: CRUD operations with endpoints for retrieving, adding, updating, and deleting requests.
- **Mobile Responsive**: All UI components are designed to be mobile responsive.
- **Real-time Updates**: Real-time updates of the request table upon adding/editing/deleting requests.
- **Modals**: Creative modals for edit and delete functions.
- **Styling**: Styled using Tailwind CSS and Ant Design frameworks.
- **Secure Authentication**: Implemented secure User authentication using Clerk.
- **Extensible Design**: The system is designed to be open for extension, making it easy to add new features such as feedback management, reports generation, and more.

## How to Setup the Project 🛠️

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/Harish3000/RequeSTAR-Request-management-system.git
cd request-management-system
```

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env` file and add your MongoDB connection string and any other necessary configurations.
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables if necessary.
4. Start the development server:
   ```bash
   npm start
   ```

### Running the Application
- Open your browser and navigate to `http://localhost:5173/` to view the frontend.
- The backend server should be running on `http://localhost:5000`.

## Deliverables 📦
- **Source Code Repository**: A complete project code on a GitHub repository.
- **README File**: Includes setup instructions and project overview.
- **Demo Video**: A video demonstrating the application's features and functionalities.
