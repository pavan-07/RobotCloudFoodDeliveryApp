const router = require("express").Router();
//const dbpool = require();
//const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")

router.get("/Restaurant", (req, res) => {

    
    

    con.query("select * from restaurant ", (err, result, fields) => {
        console.log(err);
        console.log(result, fields)
        res.send(result);
    })
  
})

module.exports = router;