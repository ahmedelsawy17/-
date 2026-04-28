import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Video, TrendingUp, Cookie, FlaskConical, ChevronRight, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAdminStats, type AdminStatsResponse } from '../lib/api';

export default function AdminDashboardPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  const [stats, setStats] = React.useState<AdminStatsResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (user?.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    const loadStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    void loadStats();
  }, [user, navigate]);

  const bars = stats ? Object.entries(stats.enrollmentByDay).slice(-7) : [];
  const maxBar = Math.max(1, ...bars.map(([, count]) => count));

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6]">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <BarChart3 size={32} className="text-blue-400" />
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-3xl md:text-4xl font-black">لوحة التحكم</h1>
              <p className="text-blue-200 font-bold mt-1">مرحباً بك في لوحة تحكم الأدمن</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {error ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl font-bold">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
            <p className="mt-4 text-slate-500 font-bold">جاري تحميل البيانات...</p>
          </div>
        ) : null}

        {stats ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard icon={<Users size={24} />} label="الطلاب" value={stats.counters.studentsCount} color="blue" />
              <StatCard icon={<Users size={24} />} label="المدرسين" value={stats.counters.instructorsCount} color="emerald" />
              <StatCard icon={<Users size={24} />} label="الأدمن" value={stats.counters.adminsCount} color="purple" />
              <StatCard icon={<BookOpen size={24} />} label="الكورسات" value={stats.counters.coursesCount} color="amber" />
              <StatCard icon={<Video size={24} />} label="الفيديوهات" value={stats.counters.videosCount} color="rose" />
            </div>

            {/* Enrollment Chart */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-6">إحصائية التسجيلات (آخر 7 أيام)</h2>
              <div className="grid grid-cols-7 gap-2 items-end h-40">
                {bars.length === 0 ? (
                  <p className="col-span-7 text-slate-500 text-center py-10">لا توجد بيانات تسجيل بعد.</p>
                ) : (
                  bars.map(([day, count]) => (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-blue-100 rounded-t-md relative group hover:bg-blue-200 transition-colors"
                        style={{ height: `${(count / maxBar) * 130}px` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          {count}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">{day.slice(5)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => navigate('/admin/students')}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 cursor-pointer hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Users size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">إدارة الطلاب</h3>
                    <p className="text-sm text-slate-500 font-bold">عرض وإدارة بيانات الطلاب المسجلين</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-blue-600">{stats.counters.studentsCount}</span>
                  <ChevronRight size={20} className={`text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => navigate('/admin/videos')}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 cursor-pointer hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <Video size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">إدارة الفيديوهات</h3>
                    <p className="text-sm text-slate-500 font-bold">رفع وإدارة فيديوهات الكورسات</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-emerald-600">{stats.counters.videosCount}</span>
                  <ChevronRight size={20} className={`text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
    </motion.div>
  );
}