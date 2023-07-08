const router = require("express").Router();
const Mentee = require("../db/models/Mentee");
const Mentor = require("../db/models/Mentor")
const Feedback=require("../db/models/feedback");
const jwt = require('jsonwebtoken')
let c = 1;
let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
let id = decodedtoken.id
const menteeID = "", mentorID = "";
const mentor_data = await Mentor.findById(id);
if(mentor_data){
    mentorID = id;
    menteeID = mentor_data.menteeIdAssigned
} else {
    const mentee_data = await Mentee.findById(id)
    menteeID = id
    mentorID = mentee_data.mentorIdAssigned
}
router.post("/feedback",async (req,res)=>{
    const newFeedback = new Feedback({
        mentorID: mentorID,
        menteeID: menteeID,
        sessionduration:req.body.sessionduration,
        rating:req.body.rating,
        comments:req.body.comments,
    });
    console.log(newFeedback)
   try{
       const savefeedback = await newFeedback.save();
       console.log(savefeedback)
       res.status(201).json(savefeedback);

   }catch(err){
      console.log(err)
       res.status(500).json(err);
       console.log(err);
   }  
});

module.exports = router;
