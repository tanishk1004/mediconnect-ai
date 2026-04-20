const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: String, enum: ['available', 'busy', 'offline'], default: 'available' },
  experience: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  hospital: { type: String, default: '' },
  consultationFee: { type: Number, default: 100 },
  languages: { type: [String], default: ['English'] },
  about: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
