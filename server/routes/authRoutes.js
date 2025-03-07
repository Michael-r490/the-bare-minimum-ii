const express = require('express');
const router = express.Router();
const cors = require('cors');
const{test, registerUser, loginUser, getProfile, markSlideCompleted}=require('../controllers/authController')
const API_URL = process.env.VITE_API_URL;
 

router.use(
    cors({
        credentials: true,
        origin: API_URL
    })
)

router.get('/',test)
router.post('/register',registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/mark-slide-completed', markSlideCompleted);

module.exports = router