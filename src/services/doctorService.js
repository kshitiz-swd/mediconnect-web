const Doctor = require("../models/doctorModel")


const fetchDoctors = async(specialists)=>{

  if (specialists) {
    return await Doctor.find({ specialization: specialists });
  }
  return await Doctor.find({});
}


const createDoctor = async ({ name, specialization, ratings, availability, city, emailId, totalExperience, mobile, dateOfBirth }) => {
  

    const existingDoctor = await Doctor.findOne({
      name: name.trim(),
      specialization: specialization.trim()
    });
  
    if (existingDoctor) {
       throw new Error("Doctor with the same name and specialization already exists");
    }
  
    const doctor = new Doctor({
      name: name.trim(),
      specialization: specialization.trim(),
      availability,
      ratings,
      city,
      emailId,
      totalExperience,
      mobile,
      dateOfBirth
    });
  
    await doctor.save();
  
    return doctor;
  };


const editDoctor = async(req)=>{
    const {name, specialization, ratings, availability} = req.body
    const doctorId = req.params.doctorId
    const updateDoctor = await Doctor.findOneAndUpdate({_id:doctorId}, {name:name, specialization: specialization, ratings: ratings, availability: availability},{ new: true, runValidators: true })

    return updateDoctor
}  


const fetchDoctorSlotsByDate = async (doctorId, date) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new Error("Doctor not found");

  const dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);

  const availableDate = doctor.availability.find(slot => {
    const slotDate = new Date(slot.date); 
  
    return slotDate.toDateString() === dateObj.toDateString();
  });

  return availableDate?.slots.filter(s => !s.isBooked) || [];
};
  
module.exports = {fetchDoctors, createDoctor, editDoctor, fetchDoctorSlotsByDate}


