# 📚 Book Notes Manager

A full-stack web application designed to help you track, organize, and review the books you've read. Inspired by Derek Sivers' book notes website, this project lets you store your personal book reviews, ratings, and other key details in a database and display them in an easy-to-navigate interface.

## 🛠 Features
- **Book Tracking**: Add, edit, delete, and manage book entries in your collection.
- **Dynamic Data Presentation**: Sort and filter your book list by rating, recency, or title.
- **Cover Integration**: Automatically fetch and display book covers using the Open Library Covers API.
- **Database Persistence**: Store and manipulate book data in a PostgreSQL database with full CRUD functionality.
- **Error Handling**: Robust error logging and user-friendly error messages.
- **Responsive Design**: A clean and user-friendly UI built with HTML, CSS, and EJS templates.

## 🔧 Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS (templating engine)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **API Integration**: Open Library Covers API
- **HTTP Requests**: Axios


## 🚀 Getting Started
- Clone the repository
- Install dependencies: npm install
- Set up your PostgreSQL database:
- Create a database and set up the schema using the provided SQL script.
- Update the database connection details in your .env file.
- Start the server using nodemon index.js or npm run dev
- Visit the application in your browser at http://localhost:3000
