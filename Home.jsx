import { Link } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const Home = () => {
  const services = [
    { icon: '🔬', title: 'AI Symptom Checker', desc: 'Get instant AI-powered health insights', color: 'from-blue-500 to-cyan-500' },
    { icon: '👨‍⚕️', title: 'Doctor Connect', desc: 'Browse certified specialists', color: 'from-emerald-500 to-teal-500' },
    { icon: '📋', title: 'Medical History', desc: 'Keep all your health records', color: 'from-violet-500 to-purple-500' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Enterprise-grade security', color: 'from-orange-500 to-amber-500' }
  ];

  const stats = [
    { value: '50K+', label: 'Active Patients' },
    { value: '500+', label: 'Certified Doctors' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                AI-Powered Healthcare Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Health, <span className="text-cyan-300">Intelligently</span> Managed
              </h1>
              <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                Get instant AI-powered symptom analysis, connect with top doctors, and manage your complete medical history — all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="text-center text-base py-3 px-8 bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                  Get Started Free
                </Link>
                <Link to="/login" className="text-center text-base py-3 px-8 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-xl transition-all">
                  Sign In
                </Link>
              </div>
              <p className="text-blue-200 text-sm mt-4">No credit card required • Free forever plan available</p>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-400 rounded-xl flex items-center justify-center text-xl">🤖</div>
                    <div>
                      <p className="font-semibold text-sm">AI Analysis</p>
                      <p className="text-blue-200 text-xs">Symptom detected</p>
                    </div>
                    <span className="ml-auto bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-medium">Complete</span>
                  </div>
                  <div className="space-y-3">
                    {['Headache', 'Fatigue', 'Mild fever'].map((s, i) => (
                      <div key={s} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                        <div className="w-2 h-2 bg-cyan-300 rounded-full" />
                        <span className="text-sm">{s}</span>
                        <div className="ml-auto w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-300 rounded-full" style={{ width: `${[70, 45, 60][i]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl">
                    <p className="text-emerald-300 text-xs font-medium">💡 Recommendation</p>
                    <p className="text-white text-sm mt-1">Consult a General Physician within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Everything You Need for Better Health</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            Our comprehensive platform brings together AI technology and medical expertise.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-4 shadow-md`}>{s.icon}</div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-blue-100 text-lg mb-8">Join thousands of users who trust MediConnect AI.</p>
          <Link to="/signup" className="inline-block bg-white text-blue-600 font-bold py-3 px-10 rounded-xl hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
            Start for Free Today
          </Link>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};

export default Home;
