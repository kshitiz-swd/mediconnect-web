const express = require("express")
const {registerUser, loginUser, getUserProfile, getAllUsers, logoutUser} = require('../controllers/userController')
const router = express.Router()
const {authenticate, isAdmin} = require('../middleware/authMiddleware')

router.post('/auth/signup', registerUser)

router.post('/auth/login', loginUser)

router.post('/auth/logout', logoutUser)

router.get('/auth/profile', authenticate, getUserProfile)

router.get("/users", authenticate, isAdmin, getAllUsers);


module.exports = router