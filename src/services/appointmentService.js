// A method for booking appointments. This could involve validating the appointment data, 
// ensuring the doctor is available for the specified date and time, and saving the
//  appointment details to the database.

const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");

  
const createAppointment = async (req) => {
  const { doctorId, appointmentDate, status, symptoms, medicalHistory } = req.body;
  const userId = req.user.id;

  if (!doctorId || !appointmentDate) {
    throw new Error("Missing doctorId or appointmentDate");
  }

  const appointmentTime = new Date(appointmentDate);
  appointmentTime.setSeconds(0, 0);

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  if (!doctor.availability) {
    throw new Error("Doctor is currently unavailable");
  }

  const existingBooking = await Appointment.findOne({
    doctorId: doctorId,
    appointmentDate: appointmentTime
  });

  if (existingBooking) {
    throw new Error("Selected time slot is already booked");
  }

  const newBooking = new Appointment({
    doctorId: doctorId,
    userId: userId,
    appointmentDate: appointmentTime,
    status: status || "scheduled",
    symptoms,
    medicalHistory,
  });

  await newBooking.save();
  return newBooking;
};


const allAppointment = async (req) => {
  const userId = req.user.id;

  const appointments = await Appointment.find({ userId: userId })
    .populate('doctorId', 'name');

  return appointments;
};


module.exports  = {createAppointment, allAppointment}
