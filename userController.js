const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch { res.status(500).json({ message: 'Server error' }); }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
    res.json({ message: 'Profile updated', user });
  } catch { res.status(500).json({ message: 'Server error' }); }
};

module.exports = { getProfile, updateProfile };
