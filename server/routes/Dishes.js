const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');

router.get("/Restaurant/:id/dishes", function (req, res) {
    const restaurantId = req.params.id;
    const query = "SELECT * FROM dishes where RestaurantId = ?";
    con.query(query, [restaurantId], (err, results, fields) => {
        res.status(200).send(results);

    });
});

router.post("/restaurant/dishes/:id", (req, res) => {
    let { name, dishdesc, restaurantId, category, price, imageUrl } = req.body;
    const dishid = req.params.id;
    console.log("res", req)
    dishId = uuidv4();
    
    const getdata = "select * from dishes where DishId=?";
    con.query(getdata, [dishid], async (err, results, fields) => {
        console.log("dish id", dishid)
        console.log("dish id1", results[0].DishId)

        if (results[0].DishId == dishid) {
            console.log("dish id is equal")
            const updatedish = "UPDATE dishes SET DishName = ?, DishDesc = ?, Price = ?, DishCategory = ? WHERE DishId = ?"
            con.query(updatedish, [name, dishdesc, price, category, dishid], async (err, results, fields) => {
                if (err)  {
                        res.status(500).send({ error: 'Unknown internal server error' });
                    }
                
                else {
                    res.send({ dishId: dishId });
                   // res.end("table updated")
                
                }
            })
        }

        else {
            console.log("i am here")
            const query = "INSERT INTO dishes(DishId, RestaurantId, DishDesc, DishCategory, Price,DishImage, DishName) VALUES(?,?,?,?,?,?,?)";
            con.query(query, [dishId, restaurantId, dishdesc, category, price, imageUrl, name], async (err, results, fields) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        res.status(400).send({ error: "Dish already exists" });
                    } else {
                        res.status(500).send({ error: 'Unknown internal server error' });
                    }
                }
                else {
                    res.send({ dishId: dishId });
                }
            })
        }

    })
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

module.exports = router;
