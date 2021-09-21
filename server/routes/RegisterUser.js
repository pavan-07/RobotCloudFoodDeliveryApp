const router = require("express").Router();
const uuid = require("uuid");
const con = require("../connections/Dbconnection")


router.post("/RegisterUser", (req, res) => {
    const username = req.body.username;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    const Customerid = uuid.v1();
    console.log(Customerid, username, useremail, userpassword)

    var users = {"Customerid": Customerid,
    "username": req.body.username,
"useremail": req.body.useremail,
"userpassword": req.body.userpassword}
 const query1 = "INSERT INTO Customer1(CustomerId, EmailId, CustomerName, CustomerPassword) VALUES ( ?, ?, ?, ?)";
    con.query(query1, [Customerid, useremail,username, userpassword
    ], (err, result, fields) => {
        console.log(err);
        res.send(result);
        console.log(result, fields)
    })
    console.log("hello")
    // const AddressId = uuid();
    // con.query("INSERT INTO address(AddressId) values(?)", [AddressId], (err, result) =>{
    //     console.log(err)
    //     res.send(result)
    // }
    // )
}
)

router.post("/RegisterUser/Restaurant", (req, res) => {
    const username = req.body.RestaurantName;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    const Restaurantid = uuid.v1();
    console.log(Restaurantid, username, useremail, userpassword)

//     var users = {"Restaurantid": Restaurantid,
//     "username": req.body.username,
// "useremail": req.body.useremail,
// "userpassword": req.body.userpassword}
 const query1 = "insert INTO restaurant(RestaurantId, RestaurantName,RestaurantEmail, RestaurantPassword) VALUES ( ?, ?, ?, ?)";
    con.query(query1, [Restaurantid, username, useremail, userpassword], (err, result, fields) => {
        if(err){
            console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send({error:"Email Id is already registered"});
            }else{
                res.status(500).send({error:'Unknow internal server error'});
            }
        }else{
            res.send(result);
    }
   
}
)
})

module.exports = router;