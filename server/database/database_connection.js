var mysql2 = require('mysql2');


// connecting to database with login details
var connection = mysql2.createConnection({
    host: "dragon.kent.ac.uk",
    user: "comp6000_09",
    password: "p3oulla",
    database: "comp6000_09"
})

module.exports = connection;

// checks if connected successfully if not returns error message
connection.connect((err) => {
    if (err) {
        console.error("DB connection failed: " + err.stack);
        return;
    }
    console.log('Connected to DB successfully');

    // execute query once connection is established.
    connection.query("SELECT * FROM User;", (err, result, fields) => {
        if (err) {
            console.error("Error when executing query", err);
            return;
        }

        console.log('Query: ', result);

    });

});
