const router = require("express").Router();
const Mentor = require("../db/models/Mentor")
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

router.post("/register",async (req,res)=>{
    const newUser = new Mentor({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,
        qualification:req.body.qualification,
        languagesSpoken:req.body.languagesSpoken,
        availableDays:req.body.availableDays,
        availableTimingSlots:req.body.availableTimingSlots,
        areasOfInterest:req.body.areasOfInterest,
    });
   try{
       const saveuser = await newUser.save();
       res.status(201).json(saveuser);
   }catch(err){
       res.status(500).json(err);
   }  
});

router.get("/details",async(req,res)=>{




























































    
})
module.exports = router;