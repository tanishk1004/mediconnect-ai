import { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const commonSymptoms = ['Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Chest pain', 'Shortness of breath', 'Dizziness', 'Back pain', 'Sore throat', 'Runny nose', 'Joint pain', 'Stomach pain', 'Rash'];

const severityColors = {
  low: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-700', icon: '✅', text: 'text-emerald-700 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
  moderate: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-700', icon: '⚠️', text: 'text-amber-700 dark:text-amber-400', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
  high: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-700', icon: '🚨', text: 'text-red-700 dark:text-red-400', badge: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  critical: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-300 dark:border-red-600', icon: '🚨', text: 'text-red-700 dark:text-red-400', badge: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
};

const SymptomChecker = () => {
  const [symptomsText, setSymptomsText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toggleTag = (tag) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullText = [symptomsText.trim(), selectedTags.join(', ')].filter(Boolean).join('. ');
    if (!fullText) return toast.error('Please describe your symptoms');
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post('/symptoms/analyze', { symptoms: selectedTags, symptomsText: fullText });
      setResult(data.result);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setSymptomsText(''); setSelectedTags([]); setResult(null); };
  const sev = result ? (severityColors[result.severity] || severityColors.low) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-xl shadow-md">🔬</div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">AI Symptom Checker</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">Describe your symptoms and get instant AI-powered health insights.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Describe your symptoms</label>
              <textarea value={symptomsText} onChange={(e) => setSymptomsText(e.target.value)} placeholder="e.g., I have a severe headache, mild fever, and feel very tired since yesterday..." rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <p className="text-xs text-slate-400 mt-1">{symptomsText.length}/500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Or select common symptoms</label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button key={symptom} type="button" onClick={() => toggleTag(symptom)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedTags.includes(symptom) ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400'}`}>
                    {selectedTags.includes(symptom) && '✓ '}{symptom}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">{selectedTags.length} symptom{selectedTags.length > 1 ? 's' : ''} selected</p>}
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
              <p className="text-xs text-amber-700 dark:text-amber-400">⚠️ This tool provides preliminary insights only and is NOT a substitute for professional medical advice.</p>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <LoadingSpinner size="sm" /> : <span>🧠</span>}
                {loading ? 'Analyzing...' : 'Analyze Symptoms'}
              </button>
              {(symptomsText || selectedTags.length > 0 || result) && (
                <button type="button" onClick={handleReset} className="px-4 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg border border-slate-300 dark:border-slate-600 transition-all">Reset</button>
              )}
            </div>
          </form>
        </div>

        <div className="md:col-span-2">
          {loading && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col items-center justify-center py-12 gap-4">
              <LoadingSpinner size="lg" />
              <div className="text-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">Analyzing symptoms...</p>
                <p className="text-slate-400 text-sm mt-1">AI is processing your input</p>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col items-center justify-center py-12 text-center">
              <div className="text-5xl mb-4">🩺</div>
              <p className="font-medium text-slate-700 dark:text-slate-300">Results will appear here</p>
              <p className="text-slate-400 text-sm mt-2">Describe your symptoms and click Analyze</p>
            </div>
          )}

          {!loading && result && sev && (
            <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 ${sev.border} ${sev.bg} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{sev.icon}</span>
                <h3 className="font-bold text-slate-900 dark:text-white">Analysis Result</h3>
                <span className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${sev.badge}`}>{result.severity}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Possible Condition</p>
                  <p className={`font-semibold text-base ${sev.text}`}>{result.condition}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Recommendation</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{result.recommendation}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Specialist</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{result.specialistType}</p>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Urgency</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{result.urgency}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
