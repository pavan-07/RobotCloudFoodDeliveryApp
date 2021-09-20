const router = require("express").Router();
const con = require("../connections/Dbconnection")

router.get("/UserProfile/User", (req, res) =>{
  const email = req.query.email;
  console.log("my email", req)
  var userquery = "SELECT * from Customer1 where EmailId=?";
  con.query(userquery, [email], (err, result, fields) =>{
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

  console.log(emailUpdate);
  console.log(fullnameUpdate);


    con.query("update Customer1 set image=? where EmailId=?", [imageURL, emailId], (err, result) =>{
      if(err) throw console.err;
    });

  console.log(emailId, emailUpdate, fullnameUpdate, phonenumberUpdate)
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
//     if (cityUpdate !== "") {
//     const getCustomerId = "select CustomerID from customer where EmailId=?";
//     var result1 = 
//      con.query(getCustomerId, [emailId], (err, result) => {
        
//         if(err) throw err;
//       //  console.log(result)
//     }) 
  

//     const addId ="select AddressId from customer where EmailId='demo@gmai.com'";
    
//    var result2= con.query(addId, [emailId], (err, result2) => {
//         if(err) throw err;
        
//     }) 
//     console.log(result2[0].Customerid)
    

//       const updateAlias = "update address set city=? where AddressId=?";
//       con.query(updateAlias, [cityUpdate, addId], (err, result) => {
//         if (err) throw err;
//         // console.l(result);
//       });
//     }
  
    // if (state !== "") {
    //   const updateAlias = "update customer set state=? where EmailId=?";
    //   con.query(updateAlias, [state, emailId], (err, result) => {
    //     if (err) throw err;
    //     // console.l(result);
    //   });
    // }
    // if (zipcodeUpdate !== "") {
    //     const updateAlias = "update customer set state=? where EmailId=?";
    //     con.query(updateAlias, [state, emailId], (err, result) => {
    //       if (err) throw err;
    //       // console.l(result);
    //     });
    //   }
    res.status(200).json({ message: "Updation Successful" });
  });

//   router.post(
//     "/UserProfile/1"
//     //,
//    // upload.single("file"),
//     //,async 
//     ,function (req, res) {
//       // console.l(req.params.email);
//     //   const {
//     //     file,
//     //     body: { name },
//     //   } = req;
//     //   // console.l(file.detectedFileExtension);
//     //   Math.floor(Math.random * 1000);
//     //   const fileName = Math.floor(Math.random(100000) * 100000) + ".jpg";
//     //   await pipeline(
//     //     file.stream,
//     //     fs.createWriteStream(`${__dirname}/public/${fileName}`)
//     //   );
  
//       // console.l(fileName);
  
//       con.query(
//         "update customer set image=? where EmailId=1",
//         [req.file.filename],
//         (err, result) => {
//           if (err != null || err != undefined) {
//             res.status(400).json({ error: "failed to upload image" });
//           } else {
//             res.status(200).json({ message: "success", imagepath: fileName });
//           }
//         }
//       );
//     }
//   );

  module.exports = router;