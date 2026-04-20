const express = require('express');
const router = express.Router();
const { analyze } = require('../controllers/symptomsController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      req.user = await User.findById(decoded.id).select('-password');
    } catch {}
  }
  next();
};

router.post('/analyze', optionalAuth, analyze);
module.exports = router;
