const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")

router.post("/LandingPage", (req, res) => {


    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    console.log(useremail, userpassword)

    con.query("SELECT * FROM Customer1 where EmailId = ? ", [useremail], async (err, result, fields) => {
        // console.log(err);
        // console.log("hi", userpassword);


        //  console.log(result);
        // console.log("hi", userpassword);
        const salt = await bcrypt.genSalt(15)
        const newHashedPassword = bcrypt.hash(result[0].CustomerPassword, salt)
        const isValid = bcrypt.compare(userpassword, newHashedPassword)
        if (isValid) {
            res.status(200).send({ message: "Login success" })
        }
        else {
            res.status(400).send({ message: "Invalid Credentials" })
        }
    })

    router.post("/RestaurantUser", (req, res) => {

        const useremail = req.body.useremail;
        const userpassword = req.body.userpassword;
        //  console.log(useremail, userpassword)

        con.query("SELECT * FROM restaurant where RestaurantEmail = ? ", [useremail], async (err, result, fields) => {

            console.log(result);
            console.log("hi", userpassword);
            const salt = await bcrypt.genSalt(10)
            const newHashedPassword = bcrypt.hash(result[0].RestaurantPassword, salt)
            console.log(newHashedPassword)
            const isValid = await bcrypt.compare(userpassword, newHashedPassword)
            if (isValid) {
                res.status(200).send({ message: "Login success" })
            }
            else {
                res.status(400).send({ message: "Invalid Credentials" })
            }

        })


    })
})


    module.exports = router;