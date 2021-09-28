const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');
const { json } = require("body-parser");


router.post("/favourites/:id1/:id2", function (req, res) {
    const CustomerId = req.params.id1;
    const RestaurantId = req.params.id2;
    console.log(RestaurantId, CustomerId)

    // const query1 = "select * from Personalization where CustomerId = ?"
    // con.query(query1, [CustomerId], (err, results, fields) =>{
    //     if(results != '')
    //     {
    //         const query2 = "Update Personalization set RestaurantId = ? where CustomerId = ?"
    //         con.query(query2, [RestaurantId, CustomerId], (err, results, fields) =>{
    //             console.log(results)
    //             console.log("executed update")
    //             res.status(200).send(results)
    //         })
    //     }
    //     else
    //     {
    const query = "INSERT INTO Personalization (CustomerId, RestaurantId) VALUES(?, ?)"
    con.query(query, [CustomerId, RestaurantId], (err, results, fields) => {
        console.log(results, err, fields)
        console.log("executed insert")
        res.status(200).send(results)
    })

    // }
    // })

})


router.get("/favourites/:id", (req, res) => {
    const CustomerId = req.params.id;
    console.log(CustomerId);
    let restId = [];
    var count = 0;

    const query1 = "select * from restaurant where RestaurantId IN (select RestaurantId from Personalization where CustomerId = ?)"
    con.query(query1, [CustomerId], (err, results, fields) => {
        if (err) {
            if(err.code ==='ER_DUP_ENTRY'){
            console.log(results, "hello");
            res.status(400).send({error:"Restaurant Already added as favourite"})
            }
        }
        // restId = results;
        else {
            console.log("here", results)
            res.status(200).send(results)
        }
    })
})


        
      
    
    

module.exports = router;