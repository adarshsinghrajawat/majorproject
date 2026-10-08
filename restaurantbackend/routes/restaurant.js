var express = require('express');
var router = express.Router();
var pool= require('./pool');
var upload=require('./multer');

/* GET home page. */
router.post('/restaurant_submit',upload.any(), function(req, res, next) {
    pool.query("insert into restaurants (restaurantname, ownername, phonenumber, emailid, mobileno, url, fssai, gstno, gsttype, filefssai,fileshopact, filelogo, address, stateid, cityid, createdat, updatedat) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
         [req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fssai, req.body.gstno, req.body.gsttype, req.files[0].filename, req.files[1].filename,req.files[2].filename, 
         req.body.address, req.body.stateid, req.body.cityid, req.body.createdat, req.body.updatedat],function(error,result){

            if(error)
            {
                console.log(error)
                res.status(200).json({status:false,message:'server error'})
            }
            else
            {
                res.status(200).json({status:true,message:'Restaurant Added Successfully'})
            }
         }   
        )
  
});

module.exports = router;
