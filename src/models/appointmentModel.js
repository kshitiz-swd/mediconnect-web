const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator')

const appointmentSchema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  appointmentDate: {
    type: Date,
    required: true,
    validate(value){
        if(!validator.isAfter(value.toISOString())){
            throw new Error("Enter a future date")
        }
    }
  },
  symptoms:{
    type : String
  },
  medicalHistory:{
    type : String
  },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
