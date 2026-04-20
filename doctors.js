const express = require('express');
const router = express.Router();
const { getDoctors, getDoctor } = require('../controllers/doctorsController');
const { protect } = require('../middleware/auth');
router.get('/', protect, getDoctors);
router.get('/:id', protect, getDoctor);
module.exports = router;
