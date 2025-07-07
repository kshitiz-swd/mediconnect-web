const mongoose = require('mongoose')
const validator = require('validator');


const {Schema} = mongoose

const doctorSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    totalExperience: {
        type: Number,
        required: true,
        min: 0,
        validate: {
          validator: function (value) {
            if (!this.dateOfBirth) return true; 
            const currentAge = new Date().getFullYear() - this.dateOfBirth.getFullYear();
            return value < currentAge;
          },
          message: "Experience cannot be more than doctor's age"
        }
      },
      dateOfBirth: {
        type: Date,
        required: true
      },
      city: {
    type: String,
    required: true,
    trim: true
    },
    specialization:{
        type: String,
        required: true,
        trim: true
    },
    ratings:{
        type: Number,
        min:0,
        max:5,
        default:0,
        ref:"ratings"
    },
availability: [
  {
    date: { type: Date, required: true },
    slots: [
      {
        time: { type: Date, required: true },
        isBooked: { type: Boolean, default: false }
      }
    ]
  }
],
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
}, {timestamps: true})


const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor