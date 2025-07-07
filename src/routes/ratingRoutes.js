const express = require('express')
const {  addRating } = require('../controllers/ratingController')
const { authenticate } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/ratings/:doctorId', authenticate, addRating)

module.exports = router