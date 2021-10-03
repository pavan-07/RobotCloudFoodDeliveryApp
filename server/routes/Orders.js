const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');

router.get("/Orders/:id", function (req, res) {
    const CustomerId = req.params.id;
    const query = "SELECT * FROM orders where CustomerId = ?";

    const query1 = "select * from orders inner join restaurant on orders.RestaurantId = restaurant.RestaurantId where CustomerId = ?" ;

    con.query(query1, [CustomerId], (err, results, fields) => {
        res.status(200).send(results);

    });
});

router.get("/restaurant/Orders/:id", function (req, res) {
    const RestaurantId = req.params.id;
    const query = "SELECT * FROM orders where CustomerId = ?";

    const query1 = "select * from orders inner join Customer1 on orders.CustomerId = Customer1.CustomerId where RestaurantId = ?" ;

    con.query(query1, [RestaurantId], (err, results, fields) => {
        res.status(200).send(results);

    });
});

router.post("/restaurant/Orders/:id1/:id2", function (req, res) {
    const OrderStatus = req.params.id2;
    const OrderId= req.params.id1;

    console.log("i am here")

    const query= "update orders set OrderStatus = ? where OrderId = ?"

    con.query(query, [OrderStatus, OrderId], (err, results, fields) =>{
       if(err){
           console.log(err)
       } 
       else{
           res.status(200).send(results)
       }
    })
})



module.exports = router;