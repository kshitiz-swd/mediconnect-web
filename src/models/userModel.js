const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 3,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 3,
    trim: true
  },
  dob: {
    type: Date,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Invalid phone number entered");
      }
    }
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("weak password");
      }
    }
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  salt: {
    type: String,
  },
  role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
