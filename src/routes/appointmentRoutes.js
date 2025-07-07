const{authenticate} = require('../middleware/authMiddleware')
const{bookAppointment, getAppointments } = require('../controllers/appointmentController')

const express = require('express')

const router = express.Router()

router.post('/appointment', authenticate, bookAppointment)

router.get('/appointment', authenticate, getAppointments)

module.exports = router