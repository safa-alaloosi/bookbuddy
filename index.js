const express = require('express');
const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');
const path = require('path');
var expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout', 'layout');

// MySQL connection
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin'
};

// MongoDB connection
const mongoUrl = 'mongodb://admin:admin@localhost:27017';
const mongoClient = new MongoClient(mongoUrl);
let mongoDb;

async function initializeDatabases() {
  try {
    // Initialize MySQL
    const connection = await mysql.createConnection(mysqlConfig);
    
    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS bookbuddy');
    await connection.query('USE bookbuddy');
    
    // Create books table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL
      )
    `);
    
    console.log('MySQL database and table created');

    // Insert sample data into MySQL
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM books');
    if (rows[0].count === 0) {
      await connection.query(`
        INSERT INTO books (title, author) VALUES
        ('To Kill a Mockingbird', 'Harper Lee'),
        ('1984', 'George Orwell'),
        ('Pride and Prejudice', 'Jane Austen'),
        ('The Great Gatsby', 'F. Scott Fitzgerald'),
        ('The Catcher in the Rye', 'J.D. Salinger')
      `);
      console.log('Sample books added to MySQL');
    }

    // Close the initial connection
    await connection.end();

    // Create the pool for subsequent connections
    global.mysqlPool = mysql.createPool({
      ...mysqlConfig,
      database: 'bookbuddy'
    });

    // Initialize MongoDB
    await mongoClient.connect();
    mongoDb = mongoClient.db('bookbuddy');
    console.log('Connected to MongoDB');

    // Create recommendations collection if it doesn't exist
    if (!(await mongoDb.listCollections({name: 'recommendations'}).hasNext())) {
      await mongoDb.createCollection('recommendations');
      console.log('MongoDB collection created');
    }

    // Insert sample data into MongoDB
    const recommendationsCount = await mongoDb.collection('recommendations').countDocuments();
    if (recommendationsCount === 0) {
      await mongoDb.collection('recommendations').insertMany([
        { userId: 1, bookId: 1 },
        { userId: 1, bookId: 3 },
        { userId: 2, bookId: 2 },
        { userId: 2, bookId: 4 },
        { userId: 3, bookId: 5 }
      ]);
      console.log('Sample recommendations added to MongoDB');
    }

  } catch (error) {
    console.error('Error initializing databases:', error);
    process.exit(1);
  }
}

// Routes
app.get('/', async (req, res) => {
  try {
    const [books] = await global.mysqlPool.query('SELECT * FROM books LIMIT 5');
    const recommendations = await mongoDb.collection('recommendations').find().limit(5).toArray();
    res.render('index', {title: "Home", books, recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: "Error", message: 'An error occurred' });
  }
});

app.get('/books', async (req, res) => {
  try {
    const [books] = await global.mysqlPool.query('SELECT * FROM books');
    res.render('books', { title: 'Book Catalog', books });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: "Error", message: 'An error occurred' });
  }
});

app.get('/recommendations', async (req, res) => {
  try {
    const recommendations = await mongoDb.collection('recommendations').find().toArray();
    const [books] = await global.mysqlPool.query('SELECT * FROM books');
    res.render('recommendations', { title: 'Book Recommendations', recommendations, books });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: "Error", message: 'An error occurred' });
  }
});

app.get('/add-book', (req, res) => {
  res.render('add-book', {title: 'Add a New Book'});
});

app.post('/add-book', async (req, res) => {
  const { title, author } = req.body;
  try {
    await global.mysqlPool.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author]);
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: "Error", message: 'An error occurred while adding the book' });
  }
});

app.get('/add-recommendation', async (req, res) => {
  try {
    const [books] = await global.mysqlPool.query('SELECT * FROM books');
    res.render('add-recommendation', { title:'Add a Recommendation', books });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: "Error", message: 'An error occurred' });
  }
});

app.post('/add-recommendation', async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    await mongoDb.collection('recommendations').insertOne({ userId: parseInt(userId), bookId: parseInt(bookId) });
    res.redirect('/recommendations');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: "Error", message: 'An error occurred while adding the recommendation' });
  }
});

// Initialize databases before starting the server
initializeDatabases().then(() => {
  app.listen(port, () => {
    console.log(`BookBuddy app listening at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Failed to initialize databases:', error);
  process.exit(1);
});