const mongoose = require('mongoose');
const moduleSchema = new mongoose.Schema({
  moduleNumber: {
    type: Number,
    required: false
  },
  moduleName: {
    type: String,
    required: false
  },
  sessionCompleted: {
    type: Boolean,
    required: false
  }
});

const menteeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return value.trim().length > 0;
      },
      message: 'Username cannot be empty'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value.length >= 6;
      },
      message: 'Password must be at least 6 characters long'
    }
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  areasOfInterest: {
    type: String,
    required: false
  },
  ageCategory: {
    type: String,
    enum: ['18-25', '26-35', '36-45', '46+'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  languagesSpoken: {
    type: [String],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  educationStatus: {
    type: String,
    required: true
  },
  educationProgram: {
    type: String,
    required: true
  },
  plansAfter5Years: {
    type: String,
    required: true
  },
  availableDays: {
    type: [String],
    required: true
  },
  availableTimingSlots: {
    type: [String],
    required: true
  },
  otherComments: {
    type: String
  },
  mentorAssigned: {
    type: Boolean,
    default: false
  },
  mentorIdAssigned: {
    type: String,
    required: false
  },
  module: {
    type: [moduleSchema]
  },
  areasOfInterest: {
    type: String,
    required: false,
    default: null,
  },
  sessionDuration:{
    type: Number,
    required: false
  }
});

const Mentee = mongoose.model('Mentee', menteeSchema);
module.exports = Mentee;
