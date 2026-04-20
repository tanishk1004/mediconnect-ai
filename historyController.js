const History = require('../models/History');

const addHistory = async (req, res) => {
  try {
    const { symptoms, symptomsText, result, notes } = req.body;
    if (!symptomsText) return res.status(400).json({ message: 'Symptoms text required' });
    const entry = await History.create({ userId: req.user._id, symptoms: symptoms || [symptomsText], symptomsText, result: result || {}, notes: notes || '' });
    res.status(201).json({ message: 'History entry added', entry });
  } catch { res.status(500).json({ message: 'Error adding history' }); }
};

const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || 10;
    const total = await History.countDocuments({ userId: req.user._id });
    const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    res.json({ history, pagination: { total, page, pages: Math.ceil(total / limit) } });
  } catch { res.status(500).json({ message: 'Error fetching history' }); }
};

const deleteHistory = async (req, res) => {
  try {
    const entry = await History.findOne({ _id: req.params.id, userId: req.user._id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    await entry.deleteOne();
    res.json({ message: 'Entry deleted' });
  } catch { res.status(500).json({ message: 'Error deleting entry' }); }
};

module.exports = { addHistory, getHistory, deleteHistory };
