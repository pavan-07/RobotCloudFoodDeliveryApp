

//import imagestore from  '../routes/imageStore.js'
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const multer = require("multer");
const  LandingPage  = require("./routes/LandingPage");
const  UserProfile  = require("./routes/UserProfile");
const  RegisterUser  = require("./routes/RegisterUser");
const con = require("./connections/Dbconnection").connect
const  imageStore  = require("./routes/imageStore");
const Restaurant = require("./routes/Restaurant");
const Dishes = require("./routes/Dishes")
const Favourites = require("./routes/Favourites")
const Orders = require("./routes/Orders")
const DeliveryAddress = require("./routes/DeliveryAddress")


const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//app.use("/",imagestore)
var corsOptions = {
    origin: "http://18.117.130.13:3000"
  };



// con.connect(function(err) {
//     if (err) throw err;
//     console.log("connected");
// })

app.use("/uber-eats/api",LandingPage)
app.use("/uber-eats/api", RegisterUser)
app.use("/uber-eats/api",UserProfile)
app.use("/uber-eats/api",imageStore)
app.use("/uber-eats/api", Restaurant)

app.use("/uber-eats/api", Dishes)
app.use("/uber-eats/api", Favourites)
app.use("/uber-eats/api", Orders)
app.use("/uber-eats/api", DeliveryAddress)


// app.get("/UserProfile", (req, res) => {

//     con.query("Select * from Customer1 where CustomerId=1", (err, result, fields) => {
//         if(err) throw err;
//         console.log(err);
//         res.send(result);
//         console.log("hello")
//     })
//     console.log("hello")
// })

const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
    console.log(`Running on port ${PORT}`)
})

module.exports = app;