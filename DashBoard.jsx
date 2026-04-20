import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ChatBot from '../components/ChatBot';

const severityConfig = {
  low: { cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400', label: 'Low' },
  moderate: { cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', label: 'Moderate' },
  high: { cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', label: 'High' },
  critical: { cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', label: 'Critical' }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/history?limit=5')
      .then(({ data }) => setHistory(data.history || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    { to: '/symptom-checker', icon: '🔬', label: 'Check Symptoms', desc: 'AI analysis', color: 'from-blue-500 to-cyan-500' },
    { to: '/doctors', icon: '👨‍⚕️', label: 'Find Doctors', desc: 'Browse specialists', color: 'from-emerald-500 to-teal-500' },
    { to: '/medical-history', icon: '📋', label: 'Medical History', desc: 'View records', color: 'from-violet-500 to-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          {greeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here's your health overview for today.</p>
      </div>

      {/* Health tip */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-5 mb-8 text-white flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💡</div>
        <div>
          <p className="font-semibold">Daily Health Tip</p>
          <p className="text-blue-100 text-sm mt-0.5">Staying hydrated improves cognitive function by up to 30%. Aim for 8 glasses of water daily.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link key={action.to} to={action.to} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-4 group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{action.label}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">{action.desc}</p>
            </div>
            <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 ml-auto group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Checks', value: history.length, icon: '🔬', color: 'text-blue-600' },
          { label: 'This Month', value: history.filter(h => new Date(h.createdAt).getMonth() === new Date().getMonth()).length, icon: '📅', color: 'text-emerald-600' },
          { label: 'High Severity', value: history.filter(h => ['high', 'critical'].includes(h.result?.severity)).length, icon: '⚠️', color: 'text-red-600' },
          { label: 'Doctors Available', value: 8, icon: '👨‍⚕️', color: 'text-violet-600' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent History */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Symptom Checks</h2>
          <Link to="/medical-history" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View all →</Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8"><LoadingSpinner text="Loading history..." /></div>
        ) : history.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">🩺</div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No symptom checks yet</p>
            <p className="text-slate-400 text-sm mt-1">Use the Symptom Checker to get started</p>
            <Link to="/symptom-checker" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm">
              Check Symptoms Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => {
              const sev = severityConfig[entry.result?.severity] || severityConfig.low;
              return (
                <div key={entry._id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg flex-shrink-0">🔬</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{entry.result?.condition || 'General Health Check'}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sev.cls}`}>{sev.label}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 truncate">{entry.symptomsText}</p>
                  </div>
                  <p className="text-slate-400 text-xs flex-shrink-0">{new Date(entry.createdAt).toLocaleDateString()}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ChatBot />
    </div>
  );
};

export default Dashboard;
