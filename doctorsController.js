const Doctor = require('../models/Doctor');

const mockDoctors = [
  { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', availability: 'available', experience: 15, rating: 4.9, reviewCount: 312, hospital: 'City Heart Institute', consultationFee: 200, languages: ['English', 'Spanish'], about: 'Board-certified cardiologist with 15 years of experience.' },
  { name: 'Dr. Michael Chen', specialization: 'Neurologist', availability: 'available', experience: 12, rating: 4.8, reviewCount: 245, hospital: 'Metro Neurology Center', consultationFee: 180, languages: ['English', 'Mandarin'], about: 'Specialist in neurological disorders including migraines and epilepsy.' },
  { name: 'Dr. Emily Rodriguez', specialization: 'General Physician', availability: 'available', experience: 8, rating: 4.7, reviewCount: 189, hospital: 'Community Health Clinic', consultationFee: 100, languages: ['English', 'Spanish'], about: 'Dedicated family medicine physician for patients of all ages.' },
  { name: 'Dr. James Wilson', specialization: 'Orthopedist', availability: 'busy', experience: 20, rating: 4.9, reviewCount: 421, hospital: 'Advanced Orthopedic Hospital', consultationFee: 220, languages: ['English'], about: 'Expert in joint replacement and sports injuries.' },
  { name: 'Dr. Priya Patel', specialization: 'Dermatologist', availability: 'available', experience: 10, rating: 4.8, reviewCount: 278, hospital: 'Skin & Wellness Center', consultationFee: 150, languages: ['English', 'Hindi'], about: 'Specializes in medical and cosmetic dermatology.' },
  { name: 'Dr. Robert Kim', specialization: 'Gastroenterologist', availability: 'available', experience: 14, rating: 4.7, reviewCount: 203, hospital: 'Digestive Health Institute', consultationFee: 190, languages: ['English', 'Korean'], about: 'Expert in digestive disorders and endoscopy.' },
  { name: 'Dr. Lisa Thompson', specialization: 'Psychiatrist', availability: 'available', experience: 11, rating: 4.9, reviewCount: 156, hospital: 'Mind & Wellness Clinic', consultationFee: 175, languages: ['English'], about: 'Compassionate psychiatrist specializing in anxiety and depression.' },
  { name: 'Dr. Ahmed Hassan', specialization: 'Ophthalmologist', availability: 'offline', experience: 16, rating: 4.8, reviewCount: 334, hospital: 'Vision Care Center', consultationFee: 160, languages: ['English', 'Arabic'], about: 'Specialist in eye diseases and cataract surgery.' }
];

const getDoctors = async (req, res) => {
  try {
    let query = {};
    if (req.query.specialization) query.specialization = { $regex: req.query.specialization, $options: 'i' };
    if (req.query.availability) query.availability = req.query.availability;
    if (req.query.search) query.$or = [{ name: { $regex: req.query.search, $options: 'i' } }, { specialization: { $regex: req.query.search, $options: 'i' } }, { hospital: { $regex: req.query.search, $options: 'i' } }];
    let doctors = await Doctor.find(query).sort({ rating: -1 });
    if (doctors.length === 0 && !req.query.search && !req.query.specialization && !req.query.availability) {
      await Doctor.insertMany(mockDoctors);
      doctors = await Doctor.find(query).sort({ rating: -1 });
    }
    res.json({ doctors, total: doctors.length });
  } catch { res.status(500).json({ message: 'Error fetching doctors' }); }
};

const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ doctor });
  } catch { res.status(500).json({ message: 'Error fetching doctor' }); }
};

module.exports = { getDoctors, getDoctor };
