// server/index.js///

const express = require("express");
const cors = require("cors");
var mysql2 = require('mysql2');
const { exec } = require("child_process");


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
      res.status(500).send(false);
      return;
    }
    res.status(200).send(true);
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
  const results = connection.query("SELECT eventName,eventDateTime,location,description,price,firstName,lastName,EventID,imageURL FROM Event JOIN User WHERE Event.organiser = User.UserID", function (err) {
    if (err) throw err;
    console.log(results._rows[0]);
    res.send(results._rows[0]);
  })
})

app.post('/societies', (req, res) => {
  const results = connection.query("SELECT socName, socDateTime, socLocation, socDescription, socOrganiser, socPrice, socLink, SocietiesID FROM Societies JOIN User WHERE Societies.socOrganiser = User.UserID", function (err) {
    if (err) throw err;
    console.log(results);
    res.send(results._rows[0]);
  })
})

app.post('/getSocietyInfo', (req,res) => {
  const {SocietyID} = req.body;
  const results = connection.query("SELECT * FROM Society s JOIN User u ON s.socPresident = u.UserID WHERE SocietyID = ?", [SocietyID], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/getSocietyEvents', (req,res) => {
  const {SocietyID} = req.body;
  const results = connection.query("SELECT * FROM Event e JOIN User u ON e.organiser = u.UserID WHERE societyID = ?", [SocietyID], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/getSocietyMembers', (req,res) => {
  const {SocietyID} = req.body;
  const results = connection.query("SELECT * FROM User u JOIN SocietyRegistration s ON u.UserID = s.UserID WHERE societyID = ?", [SocietyID], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/joinSociety', (req,res) => {
  const {SocietyID} = req.body;
  const results = connection.query("INSERT INTO SocietyRegistration VALUES (?,?)", [SocietyID, userIDGLOBAL], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})





app.post('/myevents', (req, res) => {
  const results = connection.query("SELECT * FROM Event INNER JOIN EventRegistration ON Event.EventID=EventRegistration.EventID WHERE EventRegistration.UserID = ?", [userIDGLOBAL], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/popularEvents', (req, res) => {
  const results = connection.query("select COUNT(r.EventID), e.EventID, eventName, eventDateTime, location, description, organiser, price,imageURL, firstName, lastName from Event e JOIN EventRegistration r ON e.EventID = r.EventID JOIN User u ON e.organiser = u.UserID GROUP BY e.EventID ORDER BY COUNT(r.EventID) DESC LIMIT 5", 
  function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

// app.post('/recommendedEventByTag', (req, res) => {
//   const results = connection.query("select COUNT(et.EventID), e.EventID, eventName, eventDateTime, location, description, organiser, price,imageURL, firstName, lastName from  Event e JOIN EventTags et ON et.EventID = e.EventID JOIN UserTags ut ON ut.tag = et.tag AND ut.UserID = ? JOIN User u ON e.organiser = u.UserID GROUP BY e.EventID ORDER BY COUNT(et.EventID) DESC LIMIT 1;", [userIDGLOBAL],
//   function (err) {
//     if (err) throw err;
//     res.send(results._rows[0]);
//   })
// })

app.post('/upcomingevents', (req, res) => {
  const results = connection.query("SELECT * FROM Event INNER JOIN EventRegistration ON Event.EventID=EventRegistration.EventID JOIN User u ON organiser = u.UserID WHERE EventRegistration.UserID = ? ORDER BY eventDateTime LIMIT 1", [userIDGLOBAL], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/createEvent', (req, res) => {
  const { eventName, eventDateTime, location, description, organiser, price, imageURL } = req.body;

  console.log(imageURL);

  const query = "INSERT INTO Event (eventName,eventDateTime,location,description,organiser,price,imageURL) VALUES (?,?,?,?,?,?,?)";

  connection.query(query, [eventName, eventDateTime, location, description, organiser, price, imageURL], (err) => {
    if (err) {
      console.error('Error creating event: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(true);
  });
})

app.post('/createSocieties', (req, res) => {
  const { socName, socDataTime, socLocation, socDescription, socOrganiser, socPrice, socLink } = req.body;
  const query = "INSERT INTO Societies (socName, socDataTime, socLocation, socDescription, socOrganiser, socPrice, socLink) VALUES (?,?,?,?,?,?,?)";

  connection.query(query, [socName, socDataTime, socLocation, socDescription, socOrganiser, socPrice], (err) => {
    if (err) {
      console.error('Error creating societies: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(true);
  })


})

app.post('/getEventID', (req, res) => {
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

app.post('/getSocietiesID', (req, res) => {
  const { socName, socDateTime, socLocation, socDescription, socOrganiser, socPrice } = req.body;

  const query = "SELECT SocietiesID FROM Societies WHERE socName = ? AND socDateTime = ? AND socLocation = ? AND socDescription = ? AND socOrganiser = ? AND socPrice = ? AND socLink = ?";
  const results = connection.query(query, [socName, socDateTime, socLocation, socDescription, socOrganiser, socPrice], (err) => {
    if (err) {
      console.error('Error creating societies: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(results._rows[0]);
  });

})

app.post('/getUserID', (req, res) => {
  const { username } = req.body;

  const query = "SELECT UserID FROM User WHERE username = ?";
  const results = connection.query(query, [username], (err) => {
    if (err) {
      console.error('Error creating event: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(results._rows[0]);
  });

})

app.post('/addEventTag', (req, res) => {
  console.log(req.body);
  const { EventID, tag } = req.body;
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

app.post('/addSocietiesTag', (req, res) => {
  console.log(req.body);
  const { SocietiesID, tag } = req.body;
  const query = "INSERT INTO SocietiesTags (SocietiesID, tag) VALUES (?,?)";
  connection.query(query, [SocietiesID, tag], (err) => {
    if (err) {
      console.error('Error creating societies: ' + err.stack);
      res.status(500).send(false);
      return;
    }
    res.status(200).send(true);
  });
})

app.post('/addUserTag', (req, res) => {
  console.log(req.body);
  const { UserID, tag } = req.body;
  console.log("HERE");
  console.log(UserID);
  console.log(tag);
  const query = "INSERT INTO UserTags (UserID, tag) VALUES (?,?)";
  connection.query(query, [UserID, tag], (err) => {
    if (err) {
      console.error('Error registering user: ' + err.stack);
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
app.post('/joinSocieties', (req, res) => {
  try {
    const { SocietiesID } = req.body
    const query = "INSERT INTO SocieitesRegistration VALUES (?,?)";
    try {
      connection.query(query, [SocietiesID, userIDGLOBAL], (err) => { });
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

app.post('/leaveSocieties', (req, res) => {
  try {
    const { SocietiesID } = req.body
    const query = "DELETE FROM SocietiesRegistration WHERE EventID = ? AND UserID = ?";
    try {
      connection.query(query, [SocietiesID, userIDGLOBAL], (err) => { });
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

    const query = `
    SELECT 
      Event.*,
      User.firstName AS organiserFirstName,
      User.lastName AS organiserLastName
    FROM 
      Event 
    JOIN 
      User 
    ON 
      Event.organiser = User.UserID
    WHERE 
      eventName LIKE '%${searchTerm}%' OR
      description LIKE '%${searchTerm}%' OR
      location LIKE '%${searchTerm}%' OR
      User.firstName LIKE '%${searchTerm}%' OR
      User.lastName LIKE '%${searchTerm}%' OR
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

app.post('/deleteEvent', (req, res) => {
  try {
    query = "DELETE FROM EventTags WHERE EventID = ?";
    const results = connection.query(query, req.body.EventID, function (err) {
      if (err) throw err;
    })
  } catch (error) {
    console.error(error);
  }
  try {
    query = "DELETE FROM EventRegistration WHERE EVENTID = ?";
    const results = connection.query(query, req.body.EventID, function (err) {
      if (err) throw err;
    })
  } catch (error) {
    console.error(error);
  }
  try {
    query = "DELETE FROM Event WHERE EventID = ?";
    const results = connection.query(query, req.body.EventID, function (err) {
      if (err) throw err;
    })
  } catch (error) {
    console.error(error);
  }
})

app.post('/myCreatedEvents', (req, res) => {
  const results = connection.query("SELECT * FROM Event WHERE Organiser = ?", [userIDGLOBAL], function (err) {
    if (err) throw err;
    res.send(results._rows[0]);
  })
})

app.post('/updateEvent', (req, res) => {

  try {
    query = "UPDATE Event SET eventName = ?, description = ?, location = ?, price = ?, eventDateTime = ? WHERE EventID = ?"
    connection.query(query, [req.body.eventName, req.body.eventDescription, req.body.eventLocation, req.body.eventPrice, req.body.eventDateTime, req.body.eventID])
  } catch (error) {
    console.error(error);
  }
})

app.post('/runKmeansScript', (req, res) => {
  exec("python3 /Users/lukeelliott/Documents/GitHub/COMP6000/server/kmeans.py", (error, stdout, stderr) => { // change me to work for your system 
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Error executing Python script: ${stderr}`);
    }
    res.send(stdout);
  });
});