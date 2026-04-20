const History = require('../models/History');

const analyzeSymptoms = (text) => {
  const t = text.toLowerCase();
  const conditions = [
    { keywords: ['chest pain', 'heart'], condition: 'Possible Cardiac Issue', severity: 'critical', recommendation: 'Seek emergency care immediately', specialistType: 'Cardiologist', urgency: 'Emergency' },
    { keywords: ['fever', 'chills'], condition: 'Fever / Infection', severity: 'moderate', recommendation: 'Rest and hydrate. See doctor if persists', specialistType: 'General Physician', urgency: 'Within 24-48 hours' },
    { keywords: ['headache', 'migraine'], condition: 'Headache / Migraine', severity: 'low', recommendation: 'Rest in dark room. OTC pain relief', specialistType: 'Neurologist', urgency: 'Within a week if persistent' },
    { keywords: ['cough', 'cold', 'sore throat'], condition: 'Upper Respiratory Infection', severity: 'low', recommendation: 'Rest, fluids, OTC medications', specialistType: 'General Physician', urgency: 'Few days if not improving' },
    { keywords: ['stomach', 'nausea', 'vomiting'], condition: 'Gastrointestinal Issue', severity: 'moderate', recommendation: 'Stay hydrated. Seek care if severe', specialistType: 'Gastroenterologist', urgency: 'Within 24 hours if severe' }
  ];
  let best = null, max = 0;
  for (const c of conditions) {
    const matches = c.keywords.filter(k => t.includes(k)).length;
    if (matches > max) { max = matches; best = c; }
  }
  return best || { condition: 'General Health Concern', severity: 'low', recommendation: 'Consult a general physician', specialistType: 'General Physician', urgency: 'Routine appointment' };
};

const analyze = async (req, res) => {
  try {
    const { symptoms, symptomsText } = req.body;
    if (!symptomsText) return res.status(400).json({ message: 'Describe your symptoms' });
    const result = analyzeSymptoms(symptomsText);
    if (req.user) await History.create({ userId: req.user._id, symptoms: symptoms || [symptomsText], symptomsText, result });
    res.json({ message: 'Analysis complete', result, disclaimer: 'This is NOT a medical diagnosis. Consult a healthcare professional.' });
  } catch { res.status(500).json({ message: 'Error analyzing symptoms' }); }
};

module.exports = { analyze };
