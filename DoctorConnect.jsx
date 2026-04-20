import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import DoctorCard from '../components/DoctorCard';
import LoadingSpinner from '../components/LoadingSpinner';

const specializations = ['All', 'General Physician', 'Cardiologist', 'Neurologist', 'Dermatologist', 'Orthopedist', 'Gastroenterologist', 'Psychiatrist', 'Ophthalmologist'];

const DoctorConnect = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [availFilter, setAvailFilter] = useState('all');
  const [bookingDoctor, setBookingDoctor] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedSpec !== 'All') params.append('specialization', selectedSpec);
      if (availFilter !== 'all') params.append('availability', availFilter);
      const { data } = await api.get(`/doctors?${params.toString()}`);
      setDoctors(data.doctors || []);
    } catch {
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDoctors(); }, [selectedSpec, availFilter]);

  const handleSearch = (e) => { e.preventDefault(); fetchDoctors(); };
  const handleBook = (doctor) => setBookingDoctor(doctor);
  const confirmBooking = () => {
    toast.success(`Appointment request sent to ${bookingDoctor.name}!`);
    setBookingDoctor(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-xl shadow-md">👨‍⚕️</div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Find Doctors</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">Connect with certified specialists across all medical fields.</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 mb-6 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, specialization, or hospital..." className="w-full pl-10 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md">Search</button>
        </form>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2">
            {[{ value: 'all', label: 'All' }, { value: 'available', label: '🟢 Available' }, { value: 'busy', label: '🟡 Busy' }].map(f => (
              <button key={f.value} onClick={() => setAvailFilter(f.value)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${availFilter === f.value ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400'}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="text-slate-300 dark:text-slate-600 hidden sm:block">|</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-auto">{doctors.length} doctor{doctors.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      {/* Specialization tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {specializations.map(spec => (
          <button key={spec} onClick={() => setSelectedSpec(spec)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border flex-shrink-0 ${selectedSpec === spec ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400'}`}>
            {spec}
          </button>
        ))}
      </div>

      {/* Doctors grid */}
      {loading ? (
        <div className="flex justify-center py-16"><LoadingSpinner size="lg" text="Loading doctors..." /></div>
      ) : doctors.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">No doctors found</p>
          <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
          <button onClick={() => { setSearch(''); setSelectedSpec('All'); setAvailFilter('all'); fetchDoctors(); }} className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {doctors.map(doctor => <DoctorCard key={doctor._id} doctor={doctor} onBook={handleBook} />)}
        </div>
      )}

      {/* Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {bookingDoctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{bookingDoctor.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm">{bookingDoctor.specialization}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Hospital</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{bookingDoctor.hospital}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Consultation Fee</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">${bookingDoctor.consultationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Experience</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{bookingDoctor.experience} years</span>
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
              Your appointment request will be sent to {bookingDoctor.name}. They will confirm the time slot shortly.
            </p>

            <div className="flex gap-3">
              <button onClick={() => setBookingDoctor(null)} className="flex-1 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2.5 px-6 rounded-xl border border-slate-300 dark:border-slate-600 transition-all">
                Cancel
              </button>
              <button onClick={confirmBooking} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorConnect;
