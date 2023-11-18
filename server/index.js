// server/index.js

const express = require("express");
const cors = require("cors");
const connection = require('./database/database_connection');

const PORT = process.env.PORT || 3002;

const app = express();


// middleware
app.use(cors()); // CORS for all routes
app.use(express.json());

// creates a user, registers them to the database and website
app.post('/register', (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const query = 'INSERT INTO User (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)';


  connection.query(query, [username, password, firstName, lastName, email], (err, results) => {
    if (err) {
      console.error('Error registering user: ' + err.stack);
      res.status(500).send('Error registering user');
      return;
    }
    res.status(200).send('User registered successfully');
  });
});

console.log(connection); // check if query


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




