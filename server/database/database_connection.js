var mysql2 = require('mysql2');

var con = mysql2.createConnection({
    host: "dragon.kent.ac.uk",
    user: "comp6000_09",
    password: "p3oulla",
    database: "comp6000_09"
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM User;", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});