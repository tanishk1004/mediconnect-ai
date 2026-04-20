const availabilityConfig = {
  available: { label: 'Available', cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
  busy: { label: 'Busy', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
  offline: { label: 'Offline', cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
};

const DoctorCard = ({ doctor, onBook }) => {
  const avail = availabilityConfig[doctor.availability] || availabilityConfig.offline;
  const initials = doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-tight">{doctor.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-0.5">{doctor.specialization}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${avail.cls}`}>
              {avail.label}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 flex items-center gap-1">
            🏥 {doctor.hospital}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-1">
          <span className="text-amber-400">⭐</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{doctor.rating}</span>
          <span className="text-xs text-slate-400">({doctor.reviewCount})</span>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{doctor.experience} yrs exp</div>
        <div className="ml-auto text-sm font-semibold text-slate-700 dark:text-slate-300">${doctor.consultationFee}</div>
      </div>

      {doctor.about && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">{doctor.about}</p>
      )}

      <div className="flex flex-wrap gap-1 mt-3">
        {doctor.languages?.map((lang) => (
          <span key={lang} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {lang}
          </span>
        ))}
      </div>

      <button
        onClick={() => onBook && onBook(doctor)}
        disabled={doctor.availability === 'offline'}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {doctor.availability === 'offline' ? 'Currently Unavailable' : 'Book Appointment'}
      </button>
    </div>
  );
};

export default DoctorCard;
