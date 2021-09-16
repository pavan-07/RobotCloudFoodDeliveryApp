import mysql from 'mysql'
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'


const app = express();

app.use(express.json())
app.use(cors());

var corsOptions = {
    origin: "http://localhost:3000"
  };

var con = mysql.createConnection({
    host: "lab1akshay.cejfw5uyxavi.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "admin1234",
    database: "uber"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
})

app.post("/LandingPage", (req, res) => {

    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    

    con.query("INSERT INTO userLoginDetails (email, userpassword) VALUES (?, ?)", [useremail,
        userpassword
    ], (err, result) => {
        console.log(err);
    })
    console.log("hello")
}
)
app.post("/RegisterUser", (req, res) => {
    const username = req.body.username;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    
let count =1;
count++;
    con.query("INSERT INTO customer(CustomerId, EmailId, CustomerName, Customerpassword) VALUES (count, ?, ?, ?)", [useremail,
        ,username, userpassword
    ], (err, result) => {
        console.log(err);
    })
    console.log("hello")
}
)
  
const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
    console.log(`Running on port ${PORT}`)
})