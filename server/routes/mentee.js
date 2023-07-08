const router = require("express").Router();
const Mentee = require("../db/models/Mentee")
const Mentor = require("../db/models/Mentor")
const jwt = require('jsonwebtoken')
router.post("/register", async (req, res) => {
    const newUser = new Mentee({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        ageCategory: req.body.ageCategory,
        dateOfBirth: req.body.dateOfBirth,
        languagesSpoken: req.body.languagesSpoken,
        address: req.body.address,
        educationStatus: req.body.educationStatus,
        educationProgram: req.body.educationProgram,
        plansAfter5Years: req.body.plansAfter5Years,
        availableDays: req.body.availableDays,
        availableTimingSlots: req.body.availableTimingSlots,
        otherComments: req.body.otherComments,
        areasOfInterest: null,
    });
    console.log(newUser)
    try {
        const saveuser = await newUser.save();
        console.log(saveuser)
        res.status(201).json(saveuser);

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
        console.log(err);
    }
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { sessionDuration } = req.body;
  
    try {
      const mentee = await Mentee.findById(id);
      if (!mentee) {
        return res.status(404).json({ message: "Mentee not found" });
      }
  
      mentee.sessionDuration = sessionDuration;
      const updatedMentee = await mentee.save();
      res.json(updatedMentee);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update Mentee" });
    }
})
router.put("/assign-module", async (req, res) => {
    // const cookieHeader = req.headers.cookie;
    // const cookies = cookie.parse(cookieHeader);
    // const data = cookies.jsonData ? JSON.parse(decodeURIComponent(cookies.jsonData)) : null;
    let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
    let id = "64a08f74c71416175b1574de"
    const data = id
    const filter = { _id: data };
    const update = { $set: { areasOfInterest: req.body.areasOfInterest } };
    const result = await Mentee.findOneAndUpdate(filter, update, { returnOriginal: false });

    if (result) {
        try {
            const menteeId = data
            const mentee = await Mentee.findOne({ _id: menteeId });
            const menteeLanguages = mentee.languagesSpoken
            const menteeareaOfInterests = mentee.areasOfInterest
            const menteeAvailability = mentee.availableDays
            const mentors = await Mentor.find({ menteeAssigned: false });
            // console.log(menteeId)
            // console.log(mentors)
            mentors.forEach((mentor) => {
                // const mentorLanguages = mentor.languagesSpoken.map((lang) => lang.trim());
                const mentorareaOfInterests = mentor.areasOfInterest
                // const mentorAvailability = mentor.availableDays.map((day) => day.trim());
                const commonLanguages = mentor.languagesSpoken.filter((language) => menteeLanguages.includes(language));
                const commonQualifications = mentorareaOfInterests
                const commonAvailability = mentor.availableDays.filter((day) => menteeAvailability.includes(day));
                if (commonLanguages.length > 0 && commonQualifications===menteeareaOfInterests && commonAvailability.length > 0) {
                    mentor.menteeIdAssigned = menteeId
                    mentee.mentorIdAssigned = mentor._id
                    mentor.menteeAssigned = true;
                    mentee.mentorAssigned = true;
                    mentor.save();
                    mentee.save();
                    console.log(`Mentor ${mentor.username} matched with Mentee ${mentee.username}`);
                    throw new Error('BreakLoop');                      
                }
            });
            if(!mentee.mentorAssigned){
                res.sendStatus(404).json("Not found")
            }
        } catch (error) {
            if (error.message === 'BreakLoop') {
                // Handle the exception (optional)
                res.sendStatus(200)
            } else {
                throw error;
            }
        }
        // res.sendStatus(200)          
    } else {
        res.status(500)
    }
})

router.get('/details',async(req,res) => {
    let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
    let id = decodedtoken.id
    const data = await Mentee.findById(id);
    console.log(decodedtoken)
    console.log(data)
    res.status(200).json(data)
})
module.exports = router;