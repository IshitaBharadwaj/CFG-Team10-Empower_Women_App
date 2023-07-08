const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require("dotenv").config({ path: "./config.env" });
// const record= require("./routes/record");
const menteeroute = require("./routes/mentee");
const mentorroute = require("./routes/mentor");

const port = process.env.PORT || 5000;
const url = process.env.ATLAS_URI;
const Mentee = require("./db/models/Mentee")
const Mentor = require("./db/models/Mentor")
const Admin = require("./db/models/Admin")

mongoose.connect(url, (err) => {
  if (err) throw err;
  console.log("Database created!");
});
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/mentee", menteeroute)
app.use("/mentor", mentorroute)
app.get("/",(req,res) => {
    let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
    console.log(decodedtoken)
    res.status(200).json({"Hello":"Alien"})
})
app.post("/login", async (req, res) => {
  try {
    const mentee = await Mentee.findOne({ username: req.body.username });
    if (mentee && req.body.password === mentee.password) {
      const payload = { id: mentee._id }; // Example payload
      const options = { expiresIn: '1h' }; // Example options
      const token = jwt.sign(payload, process.env.SECRET, options);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, 
        maxAge: 3600000 
      });
      return res.status(200).json({
        message: "Login Successful",
        email: mentee.email,
        role: "mentee",
      });
    }

    const mentor = await Mentor.findOne({ username: req.body.username });
    if (mentor && req.body.password === mentor.password) {
      const payload = { id: mentor._id }; // Example payload
      const options = { expiresIn: '1h' }; // Example options
      const token = jwt.sign(payload, process.env.SECRET, options);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, 
        maxAge: 3600000 
      });
      return res.status(200).json({
        message: "Login Successful",
        email: mentor.email,
        role: "mentor",
      });
    }

    const admin = await Admin.findOne({ username: req.body.username });
    if (admin && req.body.password === "admin123") {
      // const payload = { id: admin._id }; // Example payload
      // const options = { expiresIn: '1h' }; // Example options
      // const token = jwt.sign(payload, process.env.SECRET, options);
      // res.cookie('jwt', token, {
      //   httpOnly: true,
      //   secure: true, 
      //   maxAge: 3600000 
      // });
      return res.status(200).json({
        message: "Login Successful",
        email: admin.email,
        role: "admin",
      });
    }

    return res.status(400).json({
      message: "Invalid username or password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
});

app.get('/dashboard-mentee',async(req,res) => {
  let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
    let id = decodedtoken.id
    const mentee_data = await Mentee.findById(id);
    if(mentee_data){
      const response = {
        mentee_data: mentee_data
      }
      res.status(200).json(response)
    } 
    res.status(404) 
})
app.post('/pic-register',async(req,res)=>{
  const newUser = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  try{
    const saveuser = await newUser.save();
    res.status(201).json(saveuser);
}catch(err){
    res.status(500).json(err);
}
})
app.get('/pic-dashboard',async(req,res) => {
    // let decodedtoken = jwt.verify(req.cookies.jwt,process.env.SECRET)
    // let id = decodedtoken.id
    // const mentee_data = await Mentee.findById(id);
    // if(mentee_data){
    //   if(mentee_data.mentorAssigned){
    //     const mentor_data = await Mentor.findById(mentee_data.mentorIdAssigned);
    //     const response = {
    //       mentee_data: mentee_data,
    //       mentor_data: mentor_data
    //     }
    //     res.status(200).json(response)
    //   }
    //   const response = {
    //     mentee_data: mentee_data,
    //     mentor_data: null
    //   }
    //   res.status(200).json(response)
    // } else {
    //   const mentor_data = await Mentor.findById(id);
    //   if(mentee_data.mentorAssigned){
    //     const mentee_data = await Mentee.findById(mentor_data.menteeIdAssigned);
    //     const response = {
    //       mentee_data: mentee_data,
    //       mentor_data: mentor_data
    //     }
    //     res.status(200).json(response)
    //   }
    //   const response = {
    //     mentee_data: null,
    //     mentor_data: mentor_data
    //   }
    //   res.status(200).json(response)
    // }
    const mentee_list = await Mentee.find();
const data = [];

for (const mentee of mentee_list) {
  const mentor_data = await Mentor.findOne({ _id: mentee.mentorIdAssigned });

  if (mentor_data) {
    console.log(mentor_data.username);
  }

  const response = {
    mentee_data: {
      username: mentee.username,
      email: mentee.email,
      phoneNumber: mentee.phoneNumber,
      areasOfInterest: mentee.areasOfInterest,
    },
    mentor_data: {
      email: mentor_data ? mentor_data.email : '',
      phoneNumber: mentor_data ? mentor_data.phoneNumber : '',
    },
  };

  data.push(response);
}

return res.status(200).send(data);

})



// //routes to test1
// app.use('/',testroute);


// const dbo = require("./db/connection/connection");

app.listen(port, () => {
  // perform a database connection when server starts
  // dbo.connectToServer(function (err) {
  //   if (err) console.error(err);

  // });
  console.log(`Server is running on port: ${port}`);
});