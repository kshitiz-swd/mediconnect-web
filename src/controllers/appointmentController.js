
const{createAppointment, allAppointment} = require('../services/appointmentService')

const bookAppointment = async (req, res) => {
  try {
    const appointment = await createAppointment(req);
    return res.status(200).json({ message: "Booking created successfully", appointment });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

const getAppointments = async(req, res)=>{
    const allAppointments = await allAppointment(req, res)

    res.status(200).json({allAppointments})
}

module.exports= {bookAppointment, getAppointments}
