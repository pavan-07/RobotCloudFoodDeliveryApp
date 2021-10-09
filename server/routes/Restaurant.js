const router = require("express").Router();
//const dbpool = require();
//const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")

router.get("/Restaurants", (req, res) => {

    const country = req.query.country;
    const city = req.query.city;
    console.log(req.query, typeof(country));
    let queryCondition='';
    if(country!='null' && country.length)
      queryCondition = queryCondition + " where Country = ? ";
    if(city!='null' && city.length)
      queryCondition = queryCondition + "and City = ?";
    const query = "Select * FROM restaurant" + queryCondition;

    console.log(query)

    con.query(query,[country,city], (err, result, fields) => {
        console.log(err);
        console.log(result, fields)
        res.send(result);
    })
  
})

router.get("/Restaurant",function(req,resp){
    const query = "select * from restaurant";
    con.query(query, (err,results,fields)=>{
        resp.status(200).send(results);
    });
});

router.get("/dishes", (req, res) =>{
    const name = req.query.name;
    const query = "select * from dishes where RestaurantId = ?";
    con.query(query, [RestaurantId], (err, result, fields) =>{
        res.status(200).send(result);
    })
})

module.exports = router;