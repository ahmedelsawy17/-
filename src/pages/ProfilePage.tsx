import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, BookOpen, TrendingUp, Cookie, FlaskConical, ChevronRight, LogOut, Edit2, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const ENROLLED_COURSES = [
  { id: 'third-secondary', title: 'الصف الثالث الثانوي', progress: 65, totalVideos: 80, watchedVideos: 52, color: 'from-blue-600 to-blue-800' },
  { id: 'second-secondary', title: 'الصف الثاني الثانوي', progress: 30, totalVideos: 60, watchedVideos: 18, color: 'from-emerald-600 to-emerald-800' },
];

const RECENT_ACTIVITY = [
  { action: 'شاهد فيديو', title: 'قانون هس والدالة H', time: 'منذ ساعتين' },
  { action: 'أكمل اختبار', title: 'اختبار الوحدة الأولى', time: 'أمس' },
  { action: 'شاهد فيديو', title: 'مقدمة في الكيمياء الحرارية', time: 'منذ يومين' },
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
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6]">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-4xl md:text-5xl font-black shadow-xl border-4 border-white/20">
              {user.fullName.charAt(0)}
            </div>

            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl md:text-4xl font-black mb-2">{user.fullName}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Mail size={16} />
                <span className="font-bold text-blue-200">{user.email}</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-bold flex items-center gap-2">
                  <User size={14} />
                  {user.role === 'ADMIN' ? 'مدير' : user.role === 'INSTRUCTOR' ? 'مدرس' : 'طالب'}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-bold flex items-center gap-2">
                  <BookOpen size={14} />
                  {ENROLLED_COURSES.length} كورس مشترك
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-colors"
              >
                <Edit2 size={16} />
                تعديل الملف
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 font-bold text-sm flex items-center gap-2 hover:bg-red-500/30 transition-colors"
              >
                <LogOut size={16} />
                تسجيل خروج
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-800">كورساتي</h2>
                <button
                  onClick={() => navigate('/courses')}
                  className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1"
                >
                  تصفح المزيد
                  <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                </button>
              </div>

              <div className="space-y-4">
                {ENROLLED_COURSES.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-2 border-slate-100 rounded-2xl p-5 hover:border-blue-200 transition-colors cursor-pointer"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-slate-800 mb-2">{course.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Play size={14} />
                            {course.watchedVideos}/{course.totalVideos} فيديو
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            آخر نشاط: منذ ساعتين
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-black text-slate-800">{course.progress}%</p>
                          <p className="text-xs text-slate-500 font-bold">التقدم</p>
                        </div>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-black text-sm`}>
                            {course.progress}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-6">النشاط الأخير</h2>
              <div className="space-y-4">
                {RECENT_ACTIVITY.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{activity.action}</p>
                      <p className="text-sm text-slate-500 font-bold">{activity.title}</p>
                    </div>
                    <span className="text-xs text-slate-400 font-bold">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
            >
              <h3 className="text-xl font-black text-slate-800 mb-4">إحصائياتي</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-600" />
                    <span className="font-bold text-slate-600">الكورسات</span>
                  </div>
                  <span className="font-black text-2xl text-slate-800">{ENROLLED_COURSES.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play size={18} className="text-emerald-600" />
                    <span className="font-bold text-slate-600">فيديوهات تمت مشاهدتها</span>
                  </div>
                  <span className="font-black text-2xl text-slate-800">
                    {ENROLLED_COURSES.reduce((acc, c) => acc + c.watchedVideos, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-purple-600" />
                    <span className="font-bold text-slate-600">متوسط التقدم</span>
                  </div>
                  <span className="font-black text-2xl text-slate-800">
                    {Math.round(ENROLLED_COURSES.reduce((acc, c) => acc + c.progress, 0) / ENROLLED_COURSES.length)}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
            >
              <h3 className="text-xl font-black text-slate-800 mb-4">روابط سريعة</h3>
              <div className="space-y-2">
                {[
                  { label: 'كورساتي', path: '/my-courses', icon: BookOpen },
                  { label: 'الإعدادات', path: '#', icon: Edit2 },
                  { label: 'المساعدة', path: '/contact', icon: Cookie },
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(link.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-right"
                  >
                    <link.icon size={18} className="text-slate-400" />
                    <span className="font-bold text-slate-600 flex-1">{link.label}</span>
                    <ChevronRight size={16} className={`text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Play(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}