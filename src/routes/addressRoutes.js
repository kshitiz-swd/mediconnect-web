const express = require('express')
const {authenticate} = require('../middleware/authMiddleware')
const { getAllAddresses , addAddress} = require('../controllers/addressController')

const router =  express.Router()

router.get('/addresses', authenticate, getAllAddresses)

router.post('/addresses', authenticate, addAddress)


module.exports = router