const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")

router.post("/LandingPage", (req, res) => {

    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    //console.log(useremail, userpassword)

    con.query("SELECT * FROM Customer1 where EmailId = ? ", [useremail], async (err, result, fields) => {
        const salt = await bcrypt.genSalt(15)
       if(result.length == 0){
           res.status(400).send({message: "User does not Exist"})
       }
       else{
        const isValid = await bcrypt.compare(userpassword, result[0]["CustomerPassword"])
        if (isValid) {
            //console.log("valid")
            res.status(200).send(result)
        }
        else {
            //console.log("Invalid")
            res.status(400).send({ message: "Invalid Credentials" })
        }
    }
    })
})
    router.post("/RestaurantUser",  (req, res) => {

        const useremail = req.body.useremail;
        const userpassword = req.body.userpassword;
         //console.log(useremail, userpassword)

        con.query("SELECT * FROM restaurant where RestaurantEmail = ? ", [useremail], async (err, result, fields) => {

           // console.log(result);
           // console.log("hi 123 ", userpassword);
           // const salt = await bcrypt.genSalt(15)
            //const newHashedPassword = bcrypt.hash(result[0].RestaurantPassword, salt)
            //console.log( result[0].RestaurantPassword)
            //console.log("hahaha");
            const isValid = await bcrypt.compare(userpassword, result[0]["RestaurantPassword"])
            
            if (isValid) {
                let results = {
                    id: result[0].RestaurantId,
                    email: result[0].RestaurantEmail,
                    name: result[0].RestaurantName,
                    desc: result[0].RestaurantDesc,
                    phone: result[0].PhoneNumber,
                    fromHrs: result[0].WorkHrsFrom,
                    toHrs: result[0].WorkHrsTo,
                    image: result[0].Image,
                    addressId: result[0].AddressId
                }
                //console.log("suceeesss");
                res.status(200).send(result)
            }
            else {
                //console.log("Invalid")
                res.status(400).send({ message: "Invalid Credentials" })
            }

        })


    })



    module.exports = router;