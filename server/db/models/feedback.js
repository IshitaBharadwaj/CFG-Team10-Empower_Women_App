const mongoose = require('mongoose');

const feedback = new mongoose.Schema({
  mentorID: {
    type: String,
    required: true
  },
  menteeID: {
    type: String,
    required: true
  },
  sessionduration: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: false
  }
});

const Feedback = mongoose.model('Feedback', feedback);
module.exports = Feedback;