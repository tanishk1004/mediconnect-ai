const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: { type: [String], default: [] },
  symptomsText: { type: String, required: true },
  result: {
    condition: { type: String, default: '' },
    severity: { type: String, enum: ['low', 'moderate', 'high', 'critical'], default: 'low' },
    recommendation: { type: String, default: '' },
    specialistType: { type: String, default: '' },
    urgency: { type: String, default: '' }
  },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
