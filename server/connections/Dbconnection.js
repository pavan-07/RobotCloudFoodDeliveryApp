mysql = require('mysql');
var db;

function dbConnectionProvider() {
    if (!db) {
        db = mysql.createPool({
            connectionLimit: 10,
            host: "lab1akshay.cejfw5uyxavi.us-east-2.rds.amazonaws.com",
            port: 3306,
            user: "admin",
            password: "admin1234",
            database: "uber"
        });
    }
    return db;

}
module.exports = dbConnectionProvider();