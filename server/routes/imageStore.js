const {upload} = require("../services/file-upload");

const router = require("express").Router();

router.post("/image/:entity", upload.single('image'),(req,res,next)=>{
    console.log(req);
    res.send({imageUrl:req.file.location});
});

module.exports = router;