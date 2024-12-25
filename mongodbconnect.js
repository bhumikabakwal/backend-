const mongoose = require('mongoose');
const MONG_URI = 'mongodb://localhost:27017/BooksData'; // Use your MongoDB URI

mongoose.connect(MONG_URI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

const db = mongoose.connection;
db.on('error', (err) => console.log('Error occurred: ' + err));
db.once('connected', () => console.log('Successfully connected to MongoDB'));

module.exports = db;
