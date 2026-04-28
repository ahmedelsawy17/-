import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, TrendingUp, Clock, Cookie, FlaskConical, ChevronRight, Lock, CheckCircle, Zap, ShieldCheck, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const MY_COURSES = [
  {
    id: 'third-secondary',
    title: 'الصف الثالث الثانوي',
    titleEn: 'Third Secondary',
    description: 'رحلة الثانوية العامة نحو الدرجة النهائية في الكيمياء.',
    icon: '🧪',
    color: 'from-blue-600 to-indigo-700',
    progress: 65,
    totalVideos: 80,
    watchedVideos: 52,
    lastWatched: 'قانون هس والدالة H',
    lastWatchedTime: 'منذ ساعتين',
  },
  {
    id: 'second-secondary',
    title: 'الصف الثاني الثانوي',
    titleEn: 'Second Secondary',
    description: 'التعمق في الكيمياء العضوية وغير العضوية.',
    icon: '🧫',
    color: 'from-emerald-600 to-teal-700',
    progress: 30,
    totalVideos: 60,
    watchedVideos: 18,
    lastWatched: 'مقدمة في الكيمياء العضوية',
    lastWatchedTime: 'أمس',
  },
];

export default function MyCoursesPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  if (!user) {
    navigate('/login');
    return null;
  }

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
                 <BookOpen size={40} />
               </div>
               <div>
                 <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">كورساتي التعليمية</h1>
                 <p className="text-blue-200 font-bold flex items-center gap-2">
                   استكمل رحلة تفوقك اليوم
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                 </p>
               </div>
            </div>

            <div className="flex gap-4">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => navigate('/courses')}
                 className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white font-black text-sm flex items-center gap-2"
               >
                 <Zap size={18} className="text-amber-400 fill-amber-400" />
                 استكشف الجديد
               </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10 pb-32">
        {MY_COURSES.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 glass rounded-[56px] border-white/50"
          >
            <div className="w-32 h-32 rounded-[48px] bg-slate-50 flex items-center justify-center mx-auto mb-10 shadow-inner">
               <BookOpen size={64} className="text-slate-300" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">لم تشترك في أي كورس بعد</h2>
            <p className="text-slate-500 font-bold text-lg mb-12 max-w-md mx-auto">ابدأ رحلتك التعليمية الآن واكتشف أفضل الكورسات في مادة الكيمياء.</p>
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses')}
              className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-2xl shadow-blue-200 flex items-center gap-3 mx-auto"
            >
              تصفح الكورسات المتاحة
              <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {MY_COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col bg-white rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-blue-200/50 overflow-hidden transition-all hover:translate-y-[-10px] cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {/* Visual Header */}
                <div className={`h-48 bg-gradient-to-br ${course.color} relative overflow-hidden flex items-center justify-between px-10`}>
                  <div className="absolute inset-0 bg-pattern opacity-10" />
                  <div className="relative z-10">
                     <h2 className="text-3xl font-black text-white mb-2">{course.title}</h2>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] text-white font-black uppercase tracking-widest border border-white/20">
                        <TrendingUp size={12} />
                        قيد الدراسة
                     </div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-7xl relative z-10 drop-shadow-2xl"
                  >
                    {course.icon}
                  </motion.div>
                </div>

                {/* Progress & Content */}
                <div className="p-10">
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-black text-slate-400 uppercase tracking-widest">إجمالي التقدم الدراسي</span>
                      <span className="text-3xl font-black text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner p-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${course.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${course.color} rounded-full shadow-lg`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-4 group/item">
                       <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover/item:scale-110 transition-transform">
                          <PlayCircle size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase mb-1">المحاضرات</p>
                          <p className="font-black text-slate-800">{course.watchedVideos}/{course.totalVideos}</p>
                       </div>
                    </div>
                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-4 group/item">
                       <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover/item:scale-110 transition-transform">
                          <Clock size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase mb-1">آخر نشاط</p>
                          <p className="font-black text-slate-800 text-sm">{course.lastWatchedTime}</p>
                       </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 mb-10 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                           <Play size={18} fill="currentColor" />
                        </div>
                        <div>
                           <p className="text-[10px] text-blue-600 font-black uppercase">استكمل من حيث توقفت</p>
                           <p className="font-black text-slate-900">{course.lastWatched}</p>
                        </div>
                     </div>
                     <ChevronRight className={`text-blue-300 group-hover:text-blue-600 transition-all ${isRTL ? 'rotate-180' : ''}`} />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 rounded-[24px] bg-slate-900 text-white font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all`}
                  >
                    <PlayCircle size={24} />
                    فتح المحاضرة الآن
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}