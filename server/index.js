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

var userIDGLOBAL = null;


// middleware
app.use(cors()); // CORS for all routes
app.use(express.json());

app.get('/loggedIn', (req, res) => {
  res.send("" + userIDGLOBAL);
});

app.get('/logout', (req, res) => {
  userIDGLOBAL = null;
  res.send('Logged out successfully');
});

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

app.post('/login', (req, res) => {
  const body = req.body;
  const results = connection.query("SELECT * FROM User WHERE username = ? AND password = SHA2(?,256)", [body.username, body.password], function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ isAuthenticated: false, UserID: null })
    }
    else {
      userIDGLOBAL = results._rows[0][0].UserID;
      console.log(userIDGLOBAL);
      res.send({ isAuthenticated: true, UserID: results._rows[0][0].UserID });
    }
  });
  //console.log(results);
});

app.post('/home', (req, res) => {
  const body = req.body;
  if (body.information == "User Details") {
    const results = connection.query("SELECT * FROM User WHERE UserID = ?", [userIDGLOBAL], function (err, result, fields) {
      if (err) throw err;
      res.send(results._rows[0][0]);
    });
  }

})

app.post('/events', (req, res) => {
  const results = connection.query("SELECT eventName,eventDateTime,location,description,price,firstName,lastName,EventID FROM Event JOIN User WHERE Event.organiser = User.UserID", function (err) {
    if (err) throw err;
    console.log(results._rows[0]);
    res.send(results._rows[0]);
  })
})

app.post('/myevents', (req, res) => {
  const results = connection.query("SELECT * FROM Event INNER JOIN EventRegistration ON Event.EventID=EventRegistration.EventID WHERE EventRegistration.UserID = ?", [userIDGLOBAL], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/upcomingevents', (req, res) => {
  const results = connection.query("SELECT * FROM Event INNER JOIN EventRegistration ON Event.EventID=EventRegistration.EventID WHERE EventRegistration.UserID = ? ORDER BY eventDateTime LIMIT 1", [userIDGLOBAL], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/createEvent', (req, res) => {
  const { eventName, eventDateTime, location, description, organiser, price } = req.body;

  const query = "INSERT INTO Event (eventName,eventDateTime,location,description,organiser,price) VALUES (?,?,?,?,?,?)";

  connection.query(query, [eventName, eventDateTime, location, description, organiser, price], (err) => {
    if (err) {
      console.error('Error creating event: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(true);
  });
})

app.post('/getEventID', (req,res) => {
  const { eventName, eventDateTime, location, description, organiser, price } = req.body;

  const query = "SELECT EventID FROM Event WHERE eventName = ? AND eventDateTime = ? AND location = ? AND description = ? AND organiser = ? AND price = ?";
  const results = connection.query(query, [eventName, eventDateTime, location, description, organiser, price], (err) => {
    if (err) {
      console.error('Error creating event: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(results._rows[0]);
  });

})

app.post('/addEventTag', (req,res) => {
  console.log(req.body);
  const { EventID, tag} = req.body;
  const query = "INSERT INTO EventTags (EventID, tag) VALUES (?,?)";
  connection.query(query, [EventID, tag], (err) => {
    if (err) {
      console.error('Error creating event: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(true);
  });
})

app.post('/joinEvent', (req, res) => {
  try {
    const { EventID } = req.body
    const query = "INSERT INTO EventRegistration VALUES (?,?)";
    try {
      connection.query(query, [EventID, userIDGLOBAL], (err) => { });
    }
    catch (error) { }
  }
  catch (error) { }
})

app.post('/leaveEvent', (req, res) => {
  try {
    const { EventID } = req.body
    const query = "DELETE FROM EventRegistration WHERE EventID = ? AND UserID = ?";
    try {
      connection.query(query, [EventID, userIDGLOBAL], (err) => { });
    }
    catch (error) { }
  }
  catch (error) { }
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post('/api/search', async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const descriptionTerm = req.body.description;
    const locationTerm = req.body.location;
    const organiserTerm = req.body.organiser;
    const priceTerm = req.body.price;
    
    const query = `
    SELECT * FROM Event 
    WHERE 
      eventName LIKE '%${searchTerm}%' OR
      description LIKE '%${searchTerm}%' OR
      location LIKE '%${searchTerm}%' OR
      organiser LIKE '%${searchTerm}%' OR
      price LIKE '%${searchTerm}%'
  `;
  

    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json({ results });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/infoFromID', (req, res) => {
  query = 'SELECT * FROM User WHERE UserID = ?';
  console.log(req);
  const results = connection.query(query, req.body.ID, function (err) {
    if (err) throw err;
    res.send(results._rows[0][0]);
  })
})




