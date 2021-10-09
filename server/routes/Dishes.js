const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');

router.get("/Restaurant/dishes/:id", function (req, res) {
    const restaurantId = req.params.id;
    const query = "SELECT * FROM dishes where RestaurantId = ?";
    con.query(query, [restaurantId], (err, results, fields) => {
        res.status(200).send(results);

    });
});

router.post("/restaurant/Add/dishes", (req, res) => {
    console.log("response body")
    let { dishId, name, type, dishdesc, restaurantId, category, price, imageUrl } = req.body;
    // const dishid = req.params.id;
    console.log("res", req.body.name)
  
    
    // const getdata = "select * from dishes";
    // con.query(getdata, async (err, results, fields) => {
    //     console.log("dish id", dishId)
       // console.log("dish id1", results[0].DishId)

        if (dishId) {
            console.log("dish id is equal")
            const updatedish = "UPDATE dishes SET DishName = ?, DishType = ?, DishDesc = ?, Price = ?, DishCategory = ? WHERE DishId = ?"
            con.query(updatedish, [name, type,dishdesc, price, category, dishId], async (err, results, fields) => {
                if (err)  {
                    console.log(err)
                        res.status(500).send({ error: 'Unknown internal server error' });
                    }
                
                else {
                    console.log(results)
                    res.send({ dishId: dishId });
                   // res.end("table updated")
                
                }
            })
        }

        else {
            console.log("i am here")
            dishId = uuidv4();
            const query = "INSERT INTO dishes(DishId, RestaurantId, DishDesc, DishCategory, Price,DishImage, DishName, DishType) VALUES(?,?,?,?,?,?,?,?)";
            con.query(query, [dishId, restaurantId, dishdesc, category, price, imageUrl, name, type], async (err, results, fields) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        res.status(400).send({ error: "Dish already exists" });
                    } else {
                        res.status(500).send({ error: 'Unknown internal server error' });
                    }
                }
                else {
                    console.log(results)
                    res.send({ dishId: dishId });
                }
            })
        }

    // })
})


router.get("/dishes/:id", function (req, res) {
    const dishId = req.params.id;
    const query = "SELECT * FROM dishes where DishId = ?";
    con.query(query, [dishId], (err, results, fields) => {
        if (err) {
            res.status(500).send({ message: "Entry does not exist" })
        }
        else {
            console.log(results)
            res.status(200).send(results[0]);
        }
    })

});


router.get("/Alldishes", function (req, res) {
    const dishId = req.params.id;
    const query = "Select * FROM restaurant as r INNER JOIN dishes as d on r.restaurantId = d.restaurantId ";
    con.query(query, (err, results, fields) => {
        if (err) {
            res.status(500).send({ message: "Entry does not exist" })
        }
        else {
            console.log(results)
            res.status(200).send(results);
        }
    })

});
module.exports = router;
