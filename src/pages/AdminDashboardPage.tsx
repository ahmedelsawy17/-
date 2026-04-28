import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Video, TrendingUp, Cookie, FlaskConical, ChevronRight, BarChart3, Settings, Shield, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAdminStats, type AdminStatsResponse } from '../lib/api';
import Navbar from '../components/Navbar';

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
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      {/* Premium Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-mesh to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-[32px] bg-blue-600 shadow-2xl shadow-blue-500/50 flex items-center justify-center text-white">
                 <Shield size={40} />
               </div>
               <div>
                 <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">لوحة التحكم</h1>
                 <p className="text-blue-200 font-bold flex items-center gap-2">
                   إدارة المنصة والطلاب
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                 </p>
               </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white font-black text-sm flex items-center gap-2"
            >
              <ArrowLeft className={isRTL ? '' : 'rotate-180'} size={18} />
              العودة للمنصة
            </motion.button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        {error ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-3xl font-black mb-8 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="text-center py-32">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="inline-block"
            >
              <FlaskConical size={64} className="text-blue-600" />
            </motion.div>
            <p className="mt-8 text-slate-500 font-black text-xl">جاري تحميل البيانات الذكية...</p>
          </div>
        ) : null}

        {stats ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* High-Impact Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <StatCard icon={<Users size={24} />} label="إجمالي الطلاب" value={stats.counters.studentsCount} color="blue" />
              <StatCard icon={<Shield size={24} />} label="المشرفين" value={stats.counters.adminsCount} color="purple" />
              <StatCard icon={<BookOpen size={24} />} label="الكورسات" value={stats.counters.coursesCount} color="emerald" />
              <StatCard icon={<Video size={24} />} label="المحاضرات" value={stats.counters.videosCount} color="rose" />
              <StatCard icon={<TrendingUp size={24} />} label="النمو" value={"+12%"} color="amber" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Enrollment Analysis */}
              <div className="lg:col-span-2 glass p-10 rounded-[48px] border-white/50 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                   <div>
                     <h2 className="text-2xl font-black text-slate-900 mb-1">تحليل التسجيلات</h2>
                     <p className="text-sm text-slate-500 font-bold">نمو الطلاب خلال آخر 7 أيام</p>
                   </div>
                   <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                     <TrendingUp size={20} />
                   </div>
                </div>
                
                <div className="flex items-end justify-between gap-4 h-64 px-4">
                  {bars.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                       <BarChart3 size={48} className="opacity-20" />
                       <p className="font-bold">لا توجد بيانات كافية للتحليل</p>
                    </div>
                  ) : (
                    bars.map(([day, count]) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="relative w-full flex items-end justify-center">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(count / maxBar) * 180}px` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-2xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform cursor-help"
                          />
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl">
                            {count} طالب
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{day.split('-').slice(1).join('/')}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Settings & Info */}
              <div className="space-y-8">
                 <div className="glass p-10 rounded-[48px] border-white/50 shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-xl font-black mb-6 relative z-10">إجراءات سريعة</h3>
                    <div className="space-y-4 relative z-10">
                       <button onClick={() => navigate('/admin/students')} className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between font-black text-sm">
                          إضافة طالب جديد
                          <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                       </button>
                       <button onClick={() => navigate('/admin/videos')} className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between font-black text-sm">
                          رفع فيديو جديد
                          <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                       </button>
                       <button className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between font-black text-sm">
                          إعدادات المنصة
                          <Settings size={16} />
                       </button>
                    </div>
                 </div>

                 <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl">
                    <h3 className="font-black text-slate-900 mb-6">حالة الخادم</h3>
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-500">قاعدة البيانات</span>
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">متصل</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-500">تخزين الفيديوهات</span>
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">مستقر</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-500">الأمان (SSL)</span>
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">نشط</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Management Hub */}
            <div className="grid md:grid-cols-2 gap-8">
              <ManagementCard 
                title="إدارة الطلاب" 
                desc="عرض، تعديل، وحظر حسابات الطلاب ومتابعة تقدمهم الدراسي."
                icon={<Users size={32} />}
                count={stats.counters.studentsCount}
                onClick={() => navigate('/admin/students')}
                color="blue"
              />
              <ManagementCard 
                title="مكتبة الفيديوهات" 
                desc="إدارة الدروس، رفع فيديوهات جديدة، وتحديد الكورسات التابعة لها."
                icon={<Video size={32} />}
                count={stats.counters.videosCount}
                onClick={() => navigate('/admin/videos')}
                color="emerald"
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    rose: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-xl shadow-slate-100/50 transition-all flex flex-col items-center text-center group"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
      <p className="text-3xl font-black text-slate-900">{value}</p>
    </motion.div>
  );
}

function ManagementCard({ title, desc, icon, count, onClick, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 hover:border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-600 hover:border-emerald-200',
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={`bg-white rounded-[48px] p-10 shadow-2xl border border-slate-50 cursor-pointer transition-all ${colors[color]}`}
    >
       <div className="flex items-center gap-6 mb-8">
          <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center shadow-inner ${colors[color].split(' ')[0]}`}>
             {icon}
          </div>
          <div>
             <h3 className="text-2xl font-black text-slate-900 mb-2">{title}</h3>
             <p className="text-slate-500 font-bold text-sm leading-relaxed">{desc}</p>
          </div>
       </div>
       <div className="flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3">
             <span className="text-4xl font-black text-slate-900">{count}</span>
             <span className="text-xs text-slate-400 font-black uppercase">عنصر مسجل</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl">
             <ChevronRight className={true ? 'rotate-180' : ''} size={20} />
          </div>
       </div>
    </motion.div>
  )
}