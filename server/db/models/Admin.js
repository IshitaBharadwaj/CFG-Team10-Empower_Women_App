const mongoose = require('mongoose')

const adminSchema =  new mongoose.Schema({
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
      }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
  