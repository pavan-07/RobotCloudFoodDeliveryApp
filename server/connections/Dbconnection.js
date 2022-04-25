mysql = require('mysql');
var db;

function dbConnectionProvider() {
    if (!db) {
        db = mysql.createPool({
            connectionLimit: 10,
            host: "robocloud.cc5dkkjbxv9s.us-east-1.rds.amazonaws.com",
            port: 3306,
            user: "admin",
            password: "admin1234",
            database: "robocloud"
        });
    }
    return db;

}
module.exports = dbConnectionProvider();