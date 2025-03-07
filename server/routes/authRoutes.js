const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, markSlideCompleted } = require('../controllers/authController');
const API_URL = process.env.VITE_API_URL;

console.log("Allowed API URL for CORS:", API_URL);

router.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            if (!origin || origin === API_URL) {
                callback(null, true);
            } else {
                console.log("Blocked by CORS. Origin:", origin);
                callback(new Error('Not allowed by CORS'));
            }
        }
    })
);

router.get('/', test);
router.post('/Register', registerUser);
router.post('/Login', loginUser);
router.get('/profile', getProfile);
router.post('/mark-slide-completed', markSlideCompleted);

module.exports = router;
