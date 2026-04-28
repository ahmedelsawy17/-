import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, BookOpen, TrendingUp, Cookie, FlaskConical, ChevronRight, LogOut, Edit2, Clock, CheckCircle, Shield, Zap, Bell, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ENROLLED_COURSES = [
  { id: 'third-secondary', title: 'الصف الثالث الثانوي', progress: 65, totalVideos: 80, watchedVideos: 52, color: 'from-blue-600 to-indigo-700' },
  { id: 'second-secondary', title: 'الصف الثاني الثانوي', progress: 30, totalVideos: 60, watchedVideos: 18, color: 'from-emerald-600 to-teal-700' },
];

const RECENT_ACTIVITY = [
  { action: 'شاهد فيديو', title: 'قانون هس والدالة H', time: 'منذ ساعتين', type: 'video' },
  { action: 'أكمل اختبار', title: 'اختبار الوحدة الأولى', time: 'أمس', type: 'test' },
  { action: 'شاهد فيديو', title: 'مقدمة في الكيمياء الحرارية', time: 'منذ يومين', type: 'video' },
];

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isRTL = i18n.language === 'ar';

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      {/* Premium Profile Header */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-mesh to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-10"
          >
            {/* Avatar with Glow Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-800 flex items-center justify-center text-5xl md:text-6xl font-black text-white shadow-2xl border-4 border-slate-700">
                {user.fullName.charAt(0)}
              </div>
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center text-white">
                <CheckCircle size={20} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-right">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-4">
                 <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{user.fullName}</h1>
                 <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 font-black text-xs uppercase tracking-widest border border-blue-500/20 mb-1">
                    {user.role === 'ADMIN' ? 'مدير المنصة' : 'طالب مجتهد'}
                 </span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-blue-100/60 font-bold mb-8">
                 <div className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-400" />
                    <span>{user.email}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-400" />
                    <span>عضو منذ {new Date().getFullYear()}</span>
                 </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                 <QuickStat icon={<BookOpen size={18} />} label="كورس" value={ENROLLED_COURSES.length} />
                 <QuickStat icon={<Zap size={18} />} label="نقاط التفوق" value="1,250" />
                 <QuickStat icon={<Shield size={18} />} label="الرتبة" value="#12" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-black text-sm flex items-center justify-center gap-2 shadow-xl"
               >
                 <Edit2 size={18} />
                 تعديل الحساب
               </motion.button>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={logout}
                 className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-red-500/20 hover:text-red-400 transition-all"
               >
                 <LogOut size={18} />
                 خروج آمن
               </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 pb-32">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* My Courses Section */}
            <section className="glass p-10 rounded-[56px] border-white/50 shadow-2xl">
               <div className="flex items-center justify-between mb-10">
                  <div>
                     <h2 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">متابعة الكورسات</h2>
                     <p className="text-sm text-slate-500 font-bold">استكمل رحلتك التعليمية الآن</p>
                  </div>
                  <motion.button 
                    whileHover={{ rotate: 90 }}
                    onClick={() => navigate('/my-courses')}
                    className="p-4 rounded-2xl bg-blue-50 text-blue-600"
                  >
                     <Settings size={24} />
                  </motion.button>
               </div>

               <div className="space-y-6">
                 {ENROLLED_COURSES.map((course, i) => (
                   <motion.div
                     key={course.id}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     onClick={() => navigate(`/courses/${course.id}`)}
                     className="p-8 rounded-[40px] bg-white border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group"
                   >
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                           <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shadow-lg`}>
                              <BookOpen size={28} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                              <p className="text-xs text-slate-400 font-bold flex items-center gap-2">
                                 <Clock size={14} />
                                 تمت مشاهدة {course.watchedVideos} فيديو من أصل {course.totalVideos}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-3xl font-black text-slate-900 leading-none">{course.progress}%</p>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">التقدم</p>
                           </div>
                           <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <ChevronRight className={isRTL ? 'rotate-180' : ''} size={20} />
                           </div>
                        </div>
                     </div>
                     <div className="mt-8 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                           initial={{ width: 0 }}
                           whileInView={{ width: `${course.progress}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1, ease: "easeOut" }}
                           className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                        />
                     </div>
                   </motion.div>
                 ))}
               </div>
            </section>

            {/* Recent Activity Log */}
            <section className="glass p-10 rounded-[56px] border-white/50 shadow-2xl">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">سجل النشاطات</h2>
                  <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                     <Bell size={24} />
                  </div>
               </div>

               <div className="space-y-4">
                 {RECENT_ACTIVITY.map((act, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-slate-50 hover:bg-slate-50/50 transition-all"
                   >
                     <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${act.type === 'video' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                           {act.type === 'video' ? <Play size={20} fill="currentColor" /> : <Shield size={20} />}
                        </div>
                        <div>
                           <p className="font-black text-slate-800">{act.action}</p>
                           <p className="text-sm text-slate-500 font-bold">{act.title}</p>
                        </div>
                     </div>
                     <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{act.time}</span>
                   </motion.div>
                 ))}
               </div>
            </section>
          </div>

          {/* Sidebar Stats & Links */}
          <div className="space-y-8">
             <div className="glass p-10 rounded-[48px] border-white/50 shadow-2xl">
                <h3 className="text-xl font-black text-slate-900 mb-8">إحصائيات التعلم</h3>
                <div className="space-y-8">
                   <SidebarStat 
                     icon={<BookOpen size={20} />} 
                     label="إجمالي الكورسات" 
                     value={ENROLLED_COURSES.length} 
                     color="blue"
                   />
                   <SidebarStat 
                     icon={<PlayCircle size={20} />} 
                     label="دروس مكتملة" 
                     value={ENROLLED_COURSES.reduce((a, c) => a + c.watchedVideos, 0)} 
                     color="emerald"
                   />
                   <SidebarStat 
                     icon={<TrendingUp size={20} />} 
                     label="معدل الإنجاز" 
                     value={`${Math.round(ENROLLED_COURSES.reduce((a, c) => a + c.progress, 0) / ENROLLED_COURSES.length)}%`} 
                     color="purple"
                   />
                </div>
             </div>

             <div className="glass p-10 rounded-[48px] border-white/50 shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-black mb-6 relative z-10">تحتاج مساعدة؟</h3>
                <p className="text-blue-100/70 text-sm font-medium mb-8 leading-relaxed relative z-10">
                   إذا واجهت أي مشكلة في تشغيل الفيديوهات أو الوصول لمحتوى الكورسات، فريقنا جاهز لمساعدتك.
                </p>
                <button 
                   onClick={() => navigate('/contact')}
                   className="w-full py-4 rounded-2xl bg-white text-blue-700 font-black text-sm shadow-xl flex items-center justify-center gap-2 relative z-10"
                >
                   <MessageCircle size={18} />
                   الدعم الفني
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ icon, label, value }: any) {
  return (
    <div className="flex flex-col items-center md:items-start">
       <div className="flex items-center gap-2 text-blue-400 mb-1">
          {icon}
          <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-2xl font-black text-white leading-none">{value}</span>
    </div>
  );
}

function SidebarStat({ icon, label, value, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
  }
  return (
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl ${colors[color]} flex items-center justify-center`}>
             {icon}
          </div>
          <span className="text-sm font-bold text-slate-500">{label}</span>
       </div>
       <span className="text-2xl font-black text-slate-900">{value}</span>
    </div>
  );
}

function Play({ size, fill }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
}

function MessageCircle({ size }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.4 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
    </svg>
  );
}

function PlayCircle({ size }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
  );
}