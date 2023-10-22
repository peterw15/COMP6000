var mysql = require('mysql');

var con = mysql.createConnection({
    host: "dragon.kent.ac.uk",
    user: "comp6000_09",
    password: "p3oulla",
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});