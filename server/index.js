// server/index.js///

const express = require("express");
const cors = require("cors");
var mysql2 = require('mysql2');

var connection = mysql2.createConnection({
  host: "dragon.kent.ac.uk",
  user: "comp6000_09",
  password: "p3oulla",
  database: "comp6000_09"
})


const PORT = process.env.PORT || 3001;

const app = express();


// middleware
app.use(cors()); // CORS for all routes
app.use(express.json());

// creates a user, registers them to the database and website
app.post('/register', (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const query = 'INSERT INTO User (username, password, firstName, lastName, email) VALUES (?, SHA2(?,256), ?, ?, ?)';


  connection.query(query, [username, password, firstName, lastName, email], (err, results) => {
    if (err) {
      console.error('Error registering user: ' + err.stack);
      res.status(500).send('Error registering user');
      return;
    }
    res.status(200).send('User registered successfully');
  });
});

app.post('/login', (req,res) => {
  const body = req.body;
  const results = connection.query("SELECT * FROM User WHERE username = ? AND password = SHA2(?,256)", [body.username, body.password], function (err, result) {
    if (err) throw err;
    result.length == 0 ? res.send({isAuthenticated : false, UserID : null}) : res.send({isAuthenticated : true, UserID : results._rows[0][0].UserID});
  });
  //console.log(results);
});

app.post('/home', (req,res) => {
  const body = req.body;
  if(body.information == "User Details") {
    const results = connection.query("SELECT * FROM User WHERE UserID = ?", [body.UserID], function (err,result,fields) {
      if (err) throw err;
      res.send(results._rows[0][0]);
    });
  }

})

app.post('/events',(req,res) => {
  const body = req.body;
  const results = connection.query("SELECT * FROM Event", function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

//console.log(connection); // check if query


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




