var mysql2 = require('mysql2');


// connecting to database with login details
var con = mysql2.createConnection({
    host: "dragon.kent.ac.uk",
    user: "comp6000_09",
    password: "p3oulla",
    database: "comp6000_09"
})

// checks if connected successfully if not returns error message
con.connect((err) => {
    if (err) {
        console.error("DB connection failed: " + err.stack);
        return;
    }
    console.log('Connected to DB successfully');


    // execute query once connection is established.
    con.query("SELECT * FROM User;", (err, result, fields) => {
        if (err) {
            console.error("Error when executing query", err);
            return;
        }

        console.log('Query: ', result);

    });

});


// old code for now

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("SELECT * FROM User;", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });