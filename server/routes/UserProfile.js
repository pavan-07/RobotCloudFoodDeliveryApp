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


  router.get("/restaurant/:id",(req,resp)=>{
    
    const restaurantId = req.params.id;
    let query = "SELECT * from restaurant where RestaurantId = ?";
    con.query(query,[restaurantId],function(err,results, fields){
        if(err){
            resp.status(500).send({error:'Unknow internal server error'});
        }else{
            resp.status(200).send(results[0]);
        }
    });
});

router.post("/restaurant/:id",async(req,resp)=>{
  restaurantId = req.params.id;
  restaurantName = req.body.name;
  restaurantId = req.params.id;
  country = req.body.country;
  state = req.body.state;
  city = req.body.city;
  pincode = req.body.pincode;
  fromHrs = req.body.fromHrs;
  toHrs = req.body.toHrs;
  phone = req.body.phone;
  desc = req.body.desc;
  imageUrl = req.body.imageUrl;

  let query = "UPDATE restaurant SET RestaurantName = ?, RestaurantDesc = ?, Country = ?, City = ?, State = ?, PhoneNumber = ?,Pincode = ?, WorkHrsFrom = ? , WorkHrsTo = ?, Image = ? where RestaurantId = ?";
  con.query(query,[restaurantName,desc,country,city,state,phone,pincode,fromHrs,toHrs,imageUrl,restaurantId],function(err,results, fields){
      if(err){
        console.log(err)
          resp.status(500).send({error:'Unknow internal server error'});

      }else{
          resp.send({message : "updated"});
      }
  });
});


module.exports = router;