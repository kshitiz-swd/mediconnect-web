const express = require('express')
const { authenticate } = require('../middleware/authMiddleware')
const { getDoctors, addDoctor, updateDoctor, getDoctorSlotsForDate} = require('../controllers/doctorController')
const Doctor = require('../models/doctorModel')

const router = express.Router()


router.get('/doctors/:specialists?', getDoctors)

router.post('/admin/doctors', addDoctor)

router.patch('/admin/doctors/:doctorId', updateDoctor)

router.get('/doctors/:doctorId/slots', getDoctorSlotsForDate);


module.exports = router