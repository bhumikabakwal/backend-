const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Books = require('./BooksSchema');
require('./MongoDBConnect'); // Connect to MongoDB

const app = express();
app.use(bodyParser.json());
app.use(cors());

// CRUD Routes

// Display all books
app.get('/allbooks', async (req, res) => {
    const books = await Books.find();
    res.json(books);
});

// Display a single book by ID
app.get('/getbook/:id', (req, res) => {
    const { id } = req.params;
    Books.findById(id, (err, book) => {
        if (err) return res.status(400).send('Error fetching book');
        res.json(book);
    });
});

// Add a new book
app.post('/addbooks', (req, res) => {
    const newBook = new Books(req.body);
    newBook.save()
        .then(() => res.status(200).json({ 'message': 'Book added successfully' }))
        .catch(err => res.status(400).send('Error adding book'));
});

// Update a book by ID
app.post('/updatebook/:id', (req, res) => {
    const { id } = req.params;
    Books.findByIdAndUpdate(id, req.body, { new: true })
        .then(() => res.status(200).json({ 'message': 'Book updated successfully' }))
        .catch(err => res.status(400).send('Error updating book'));
});

// Delete a book by ID
app.post('/deletebook/:id', (req, res) => {
    const { id } = req.params;
    Books.findByIdAndDelete(id)
        .then(() => res.status(200).send('Book deleted'))
        .catch(err => res.status(400).send('Error deleting book'));
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
