const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const {v4 : uuidv4} = require('uuid');

router.get("/Restaurant/:id/dishes",function(req,res){
    const restaurantId = req.params.id;
    const query = "SELECT * FROM dishes where RestaurantId = ?";
    con.query(query, [restaurantId], (err,results,fields)=>{
        res.status(200).send(results);

    });
});

router.post("/restaurant/dishes", (req, res) =>{
    let {name,dishdesc,restaurantId,category,price,imageUrl} = req.body;
    console.log("res" ,req)
    dishId = uuidv4();

    const query = "INSERT INTO dishes(DishId, RestaurantId, DishDesc, DishCategory, Price,DishImage, DishName) VALUES(?,?,?,?,?,?,?)";
    con.query(query,[dishId,restaurantId,dishdesc,category,price,imageUrl,name],async (err,results,fields)=>{
        if(err){
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send({error:"Dish already exists"});
            }else{
                res.status(500).send({error:'Unknown internal server error'});
            }
        }else{
            res.send({dishId:dishId});
        }
    })

})


router.get("/dishes/:id",function(req,res){
    const dishId = req.params.id;
    const query = "SELECT * FROM dishes where DishId = ?";
    con.query(query,[dishId], (err,results,fields)=>{
        console.log(results)
        res.status(200).send(results[0]);

    });
});

module.exports = router;
