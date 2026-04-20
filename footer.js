import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MediConnect AI</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Your intelligent healthcare companion. Get AI-powered symptom analysis, connect with doctors, and manage your health journey.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              ⚠️ For informational purposes only. Not a substitute for professional medical advice.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/symptom-checker', label: 'Symptom Checker' },
                { to: '/doctors', label: 'Find Doctors' }
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Emergency</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-red-400">🚨</span>
                <span>Emergency: <strong className="text-white">911</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>Health Line: <strong className="text-white">811</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <span>Crisis Line: <strong className="text-white">988</strong></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 MediConnect AI. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
