const router = require("express").Router();
//const dbpool = require();
//const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")

router.post("/LandingPage", (req, res) => {

    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    

    con.query("INSERT INTO customer (EmailId, CustomerPassword) VALUES (?, ?)", [useremail,
        userpassword
    ], (err, result) => {
        console.log(err);
    })
  
})

module.exports = router;