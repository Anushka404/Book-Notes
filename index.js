import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import 'dotenv/config';
import methodOverride from 'method-override';

const app = express();
app.use(methodOverride('_method')); // Add this before defining any routes
const port = 3000;

const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database: process.env.id,
    password: process.env.pass,
    port: process.env.port,
});

db.connect();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));



async function getBookCover(title) {
    try {
        const encodedTitle = encodeURIComponent(title);
        const coverUrl = `https://covers.openlibrary.org/b/title/${encodedTitle}-M.jpg`;

        // Check if the URL is valid
        const response = await axios.get(coverUrl, { responseType: "arraybuffer" });
        if (response.status === 200) {
            return coverUrl; // Valid cover URL
        }
    } catch (error) {
        console.error("Error fetching cover image:", error);
    }

    // Return a default cover URL if no cover is found
    return "https://via.placeholder.com/128x192?text=No+Cover+Available";
}

app.get("/", async (req, res) => {
    const sortOpt = req.query.sort;
    let sortQuery = "ORDER BY id ASC"; // default sorting

    //sort query based on user selection
    switch (sortOpt) {
        case "rating_desc":
            sortQuery = "ORDER BY rating DESC";
            break;
        case "rating_asc":
            sortQuery = "ORDER BY rating ASC";
            break;
        case "date_desc":
            sortQuery = "ORDER BY date_read DESC";
            break;
        case "date_asc":
            sortQuery = "ORDER BY date_read ASC";
            break;
    }

    try {
        const result = await db.query(`SELECT * FROM books ${sortQuery}`);
        res.render("index.ejs", {
            books: result.rows, 
        });
    } catch (error) {
        console.error('Error rendering the page:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/books/add", async(req, res)=>{
    const newBook ={
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        notes: req.body.notes,
        date_read: req.body.date_read,
    }
    const url = await getBookCover(req.body.title);
    try{
        await db.query(
        "INSERT INTO books (title, author, cover_url, rating, date_read, notes) VALUES ($1, $2, $3, $4, $5, $6)",
        [newBook.title, newBook.author, url, newBook.rating, newBook.date_read, newBook.notes]
        );
        res.redirect("/");  
    } catch (err){
        console.log(err);
    }
});


//This route fetches the book details from the database and renders the edit form.
app.get('/books/edit/:id', async(req, res)=>{
    const { id } = req.params;
    try{
        const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
        if(result.rows.length > 0){
            const books = result.rows[0];
            res.render("edit.ejs", {book: books}); // render injes. ejs file

        } else {
            res.status(404).send("Book not found");
        }
    } catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
});

app.post("/books/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, date_read, notes } = req.body;
  
    try {
      await db.query(
        "UPDATE books SET title = $1, author = $2, rating = $3, date_read = $4, notes = $5 WHERE id = $6",
        [title, author, rating, date_read || null, notes, id]
      );
      res.redirect("/"); // Redirect to the homepage after updating
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
  

app.delete("/books/delete/:id", async (req, res)=>{
    const { id } = req.params;
    console.log("Delete request received for ID:", id);
    try{
        const result = await db.query(
        "DELETE FROM books WHERE id = $1",
        [id]
        );
        console.log("Deletion result:", result.rowCount);

        if(result.rowCount === 0){
            console.log(`No book found with ID: ${id}`);
            res.status(404).send("Book not found");
        } else {
            console.log(`Successfully deleted book with ID: ${id}`);
            res.redirect("/");
        }

    } catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
});

app.get("/books/details/:id", async(req,res)=>{
    const { id } = req.params;
    try{
        const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
        if(result.rows.length > 0){
            const books = result.rows[0];
            res.render("bookDetails.ejs", {book: books}); 

        } else {
            res.status(404).send("Book not found");
        }
    } catch(err){
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });