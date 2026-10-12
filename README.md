# Company Management System

## 1. Project Overview

The Company Management System is a web application developed to organize and manage company-related information through a user-friendly interface.

The application provides a dashboard where users can navigate between different sections, including services, customer requests, documents, projects, content, and contact information.

The system follows a frontend-backend architecture. The frontend provides the user interface, while the backend processes requests and communicates with the database.

## 2. Technologies Used

### Frontend
- React.js
- JavaScript
- Vite
- HTML5
- CSS3
- React Router DOM

### Backend
- Node.js
- Express.js
- REST API

### Database
- Microsoft SQL Server

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

## 3. Main Features

### User Authentication
Users can register and log in to access the application. Authentication is handled through the backend API.

### Dashboard
The dashboard provides an overview of the application and navigation to the available sections.

### DashboardHome Component
`DashboardHome.jsx` provides a reusable dashboard layout with sidebar navigation. It allows multiple pages to share the same layout without duplicating the sidebar code.

### Services Management
The Services section allows users to access company services and related information.

### Customer Requests
The Customer Requests section provides an interface for accessing customer requests.

### Document Management
The Documents section provides an interface for managing documents and integrating with the backend API.

### Projects Management
`Projects.jsx` provides the Projects page for displaying and managing project information through the application.

### Content Management
The Content section provides an interface for accessing and managing application content.

### Contact Us
The Contact page contains a form where users can submit their name, email, phone number, subject, and message.

### User Profile
The Profile section provides a dedicated page for user-related information.

### Admin Dashboard
The application includes administrative pages for managing users and accessing customer requests.

## 4. Project Architecture

The application uses a client-server architecture.

```text
User
 |
 v
React Frontend
 |
 | React Components and Pages
 | React Router DOM
 v
Express REST API
 |
 | Request Processing
 | Validation and Business Logic
 v
Microsoft SQL Server
 |
 v
Database Response
 |
 v
Express API Response
 |
 v
React Frontend Updates the UI
```

The frontend sends HTTP requests to the backend. The backend processes each request and communicates with Microsoft SQL Server when database operations are required. The response is then returned to the frontend.

## 5. Project Flow

### Step 1: User Access
The user opens the application and accesses the login or registration page.

### Step 2: Authentication
The frontend sends the user's credentials to the backend. The backend validates the request and returns the appropriate response.

### Step 3: Dashboard Navigation
After successful login, the user can access the dashboard and navigate between the available pages.

### Step 4: Shared Dashboard Layout
`DashboardHome.jsx` provides the common sidebar and layout. Individual pages render their content inside this shared layout.

### Step 5: Accessing Application Pages
The user selects a section such as Services, Customer Requests, Documents, Projects, Content, Contact Us, or Profile.

React Router DOM displays the appropriate page according to the configured route.

### Step 6: Sending Requests to the Backend
When the user submits a form or performs an operation, the frontend sends an HTTP request to the relevant Express API endpoint.

### Step 7: Database Operations
The backend processes the request and performs the required database operation using Microsoft SQL Server.

### Step 8: Displaying Results
The backend returns a response, and the frontend displays the result or an appropriate error message.

## 6. Project Structure

The repository contains the frontend application, backend application, configuration files, and documentation.

```text
Company/
├── backend/
├── public/
├── src/
│   ├── App.jsx
│   ├── DashboardHome.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Documents.jsx
│   ├── Services.jsx
│   ├── CustomerService.jsx
│   ├── Content.jsx
│   ├── Header.jsx
│   ├── App.css
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

The filenames listed under `src/` are examples of the main application files. The actual structure may contain additional components, pages, stylesheets, routes, and backend files.

## 7. Important Components

### App.jsx
The main application component configures the application routes and connects pages to their corresponding layouts.

### DashboardHome.jsx
Provides a reusable sidebar layout for the user dashboard. This avoids repeating the same navigation structure in every page.

### Projects.jsx
Implements the Projects page and its user interface.

### Contact.jsx
Implements the contact form and sends submitted information to the backend API.

### Documents.jsx
Provides the user interface for document-related operations.

## 8. Installation and Setup

### Prerequisites
Install the following tools before running the project:

- Node.js and npm
- Microsoft SQL Server
-
