const router = require("express").Router();
const con = require("../connections/Dbconnection")

router.get("/UserProfile/User", (req, res) => {
  const email = req.query.email;
  console.log("my email", req)
  var userquery = "SELECT * from Customer1 where EmailId=?";
  con.query(userquery, [email], (err, result, fields) => {
    if (err) throw err;
    res.send(result);  //   res.status(200).json({
    //     email: result[0].EmailId,
    //     fullname: result[0].CustomerName,
    //     phonenumber: result[0].PhoneNumber,

    // })
  })
})


router.post("/UserProfile", function (req, res) {
  // console.l("In profile update");
  console.log(req);
  const emailId = req.body.email;
  const emailUpdate = req.body.emailUpdate;
  const fullnameUpdate = req.body.fullnameUpdate;
  const phonenumberUpdate = req.body.phonenumberUpdate;
  const cityUpdate = req.body.cityUpdate;
  const state = req.body.stateUpdate;
  const zipcodeUpdate = req.body.zipcodeUpdate;
  const imageURL = req.body.imageUrl;
  const country = req.body.countryUpdate
  // if (emailUpdate !== "") {
  //   if (emailUpdate !== emailId) {
  //     const updateAlias = "update Customer1 set  EmailId=?";
  //     con.query(updateAlias, [emailUpdate], (err, result) => {
  //       if (err) throw err;
  //       // console.l(result);
  //     });
  //   }
  // }
  console.log("URL", imageURL)

  //console.log(emailUpdate);
  //console.log(fullnameUpdate);


  con.query("update Customer1 set image=? where EmailId=?", [imageURL, emailId], (err, result) => {
    if (err) throw console.err;
  });

  console.log(cityUpdate, phonenumberUpdate)
  if (fullnameUpdate !== "") {
    const updateAlias = "update Customer1 set CustomerName=? where EmailId=?";
    con.query(updateAlias, [fullnameUpdate, emailId], (err, result) => {
      if (err) throw err;
      //console.log(result);

    });
  }

  if (phonenumberUpdate !== "") {
    const updateAlias = "update Customer1 set PhoneNumber=? where EmailId=?";
    con.query(updateAlias, [phonenumberUpdate, emailId], (err, result) => {
      if (err) throw err;

      // console.l(result);
    });
  }
  if (cityUpdate !== "") {
    console.log("i am in city")
    const getCustomerId = "update Customer1 set City=? where EmailId=?";
    var result1 = con.query(getCustomerId, [cityUpdate, emailId], (err, result) => {
        console.log(err)
        
      })
    }



    if (country !== "") {
      const updateAlias = "update Customer1 set Country=? where EmailId=?";
      con.query(updateAlias, [country, emailId], (err, result) => {
        if (err) throw err;
        // console.l(result);
      });
    }
    // if (zipcodeUpdate !== "") {
    //   const updateAlias = "update customer set state=? where EmailId=?";
    //   con.query(updateAlias, [state, emailId], (err, result) => {
    //     if (err) throw err;
    //     // console.l(result);
    //   });
    // }
    res.status(200).json({ message: "Updation Successful" });
  });



module.exports = router;