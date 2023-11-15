// server/index.js

const express = require("express");
const mysql2 = require('mysql2');
const cors = require("cors");

const con = mysql2.createConnection({
    host: "dragon.kent.ac.uk",
    user: "comp6000_09",
    password: "p3oulla",
    database: "comp6000_09"
})
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
  res.send("It's working!")
})

app.post('/login', (req,res) => {
  const body = req.body;
  const results = con.query("SELECT * FROM Authentication WHERE username = ? AND password = SHA2(?,256)", [body.username, body.password], function (err, result, fields) {
    if (err) throw err;
    result.length == 0 ? res.send({isAuthenticated : false, UserID : null}) : res.send({isAuthenticated : true, UserID : results._rows[0][0].UserID});
  });
});

app.post('/home', (req,res) => {
  const body = req.body;
  if(body.information == "User Details") {
    const results = con.query("SELECT * FROM User WHERE UserID = ?", [body.UserID], function (err,result,fields) {
      if (err) throw err;
      res.send(results._rows[0][0]);
    });
  }

})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




