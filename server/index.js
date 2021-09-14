import mysql from 'mysql'
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'


const app = express();

app.use(express.json())

var con = mysql.createConnection({
    host: "lab1akshay.cejfw5uyxavi.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "admin1234",
    database: "userDetails"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
})

app.post("/", (res, req) => {
    con.query("INSERT INTO userLoginDetails (username, userpassword) VALUES (?, ?", [username,
        password
    ], (err, result) => {
        console.log(err);
    })
})

const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
    console.log(`Running on port ${PORT}`)
})