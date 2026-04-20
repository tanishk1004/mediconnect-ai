import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const severityConfig = {
  low: { cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400', label: 'Low Risk' },
  moderate: { cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', label: 'Moderate' },
  high: { cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', label: 'High Risk' },
  critical: { cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', label: 'Critical' }
};

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchHistory = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/history?page=${page}&limit=10`);
      setHistory(data.history || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
    } catch {
      toast.error('Failed to load medical history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this history entry?')) return;
    setDeleting(id);
    try {
      await api.delete(`/history/${id}`);
      setHistory(prev => prev.filter(h => h._id !== id));
      toast.success('Entry deleted');
    } catch {
      toast.error('Failed to delete entry');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = filter === 'all' ? history : history.filter(h => h.result?.severity === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-xl shadow-md">📋</div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Medical History</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{pagination.total} total record{pagination.total !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/symptom-checker" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-all shadow-md text-sm">
          + New Check
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { value: 'all', label: 'All' },
          { value: 'low', label: 'Low Risk' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'high', label: 'High Risk' },
          { value: 'critical', label: 'Critical' }
        ].map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${filter === f.value ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><LoadingSpinner size="lg" text="Loading your medical history..." /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 text-center py-16">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">{filter === 'all' ? 'No records yet' : `No ${filter} risk records`}</p>
          <p className="text-slate-400 text-sm mt-2 mb-6">{filter === 'all' ? 'Start by checking your symptoms' : 'Try a different filter'}</p>
          {filter === 'all' && (
            <Link to="/symptom-checker" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm">
              Check Symptoms Now
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(entry => {
            const sev = severityConfig[entry.result?.severity] || severityConfig.low;
            const isExpanded = expanded === entry._id;
            return (
              <div key={entry._id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : entry._id)}>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg flex-shrink-0">🔬</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900 dark:text-white">{entry.result?.condition || 'General Health Check'}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sev.cls}`}>{sev.label}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5 truncate">{entry.symptomsText}</p>
                    <p className="text-slate-400 text-xs mt-1">
                      {new Date(entry.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(entry._id); }}
                      disabled={deleting === entry._id}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      {deleting === entry._id ? <LoadingSpinner size="sm" /> : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && entry.result && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Recommendation</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{entry.result.recommendation}</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Specialist</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{entry.result.specialistType}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Urgency</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{entry.result.urgency}</p>
                      </div>
                    </div>
                    {entry.symptoms?.length > 0 && (
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Symptoms Reported</p>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.symptoms.map((s, i) => (
                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => fetchHistory(page)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${pagination.page === page ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-400'}`}>
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
