# 📚 Book Notes Manager
A personal book notes app to keep track of the books you have read. 

# 🚀 Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Set up PostgreSQL and configure your `.env` file.
id= DBname
pass=yourPassword
port= portForDb
5. Start the server with `nodemon index.js`

# 🛠 Features
- Book Tracking: Add, edit, delete, and manage book entries in your collection.
- Dynamic Data Presentation: Sort and filter your book list by rating, recency, or title.
- Cover Integration: Automatically fetch and display book covers using the Open Library Covers API.
- Database Persistence: Store and manipulate book data in a PostgreSQL database with full CRUD functionality.
- Error Handling: Robust error logging and user-friendly error messages.
- Responsive Design: A clean and user-friendly UI built with HTML, CSS, and EJS templates.
  
# 🔧 Technologies Used
- Frontend: HTML, CSS, JavaScript, EJS (templating engine)
- Backend: Node.js, Express.js
- Database: PostgreSQL
- API Integration: Open Library Covers API
- HTTP Requests: Axios
