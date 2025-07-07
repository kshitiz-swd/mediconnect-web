
const {fetchDoctors, createDoctor, editDoctor, fetchDoctorSlotsByDate } = require('../services/doctorService')

const Doctor = require("../models/doctorModel")

const getDoctors = async(req, res)=>{
  const { specialists } = req.params;

  try{
    const doctors = await fetchDoctors(specialists)
    console.log(doctors)

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.status(200).json({ "doctors": doctors });

  }catch(err){
    res.status(500).json({ message: "Internal server error" });

  }   
}

    
const addDoctor = async (req, res) => {
    try {
      const doctor = await createDoctor(req.body);
      res.status(201).json({ message: "Doctor created successfully", doctor });
    } catch (err) {

        res.status(400).json({ error: err.message });
    }
  };
  

const updateDoctor = async(req, res)=>{
    const doctorId = req.params.doctorId
    try {

        const findDoctor = await Doctor.findById(doctorId)
        if(!findDoctor){
            return res.status(400).send("Doctor profile not found")
        }
        const doctor = await editDoctor(req);
        res.status(201).json({ message: "Doctor details updated successfully", doctor });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

const getDoctorSlotsForDate = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;  


    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const slots = await fetchDoctorSlotsByDate(doctorId, date);
    console.log(slots)

    res.status(200).json({ slots });
  } catch (err) {
    const status = err.message === "Doctor not found" ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
};

module.exports = {getDoctors, addDoctor, updateDoctor, getDoctorSlotsForDate}