import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, TrendingUp, Clock, Cookie, FlaskConical, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const MY_COURSES = [
  {
    id: 'third-secondary',
    title: 'الصف الثالث الثانوي',
    titleEn: 'Third Secondary',
    description: 'رحلة الثانوية العامة نحو الدرجة النهائية',
    icon: '🧪',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
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
    description: 'التعمق في الكيمياء العضوية وغير العضوية',
    icon: '🧫',
    color: 'from-emerald-600 to-emerald-800',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
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
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6]">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <BookOpen size={32} className="text-blue-400" />
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-3xl md:text-4xl font-black">كورساتي</h1>
              <p className="text-blue-200 font-bold mt-1">جميع الكورسات التي اشتركت بها</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {MY_COURSES.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">لم تشترك في أي كورس بعد</h2>
            <p className="text-slate-500 mb-6">استعرض الكورسات المتاحة وابدأ رحلتك</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses')}
              className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-200 inline-flex items-center gap-2"
            >
              تصفح الكورسات
              <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
            </motion.button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {MY_COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${course.bgColor} rounded-3xl border-2 ${course.borderColor} overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className={`bg-gradient-to-br ${course.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 text-4xl">{course.icon}</div>
                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black mb-2">{course.title}</h2>
                    <p className="text-sm md:text-base opacity-90 font-bold">{isRTL ? course.description : course.titleEn}</p>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />
                </div>

                <div className="p-6 space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-600">التقدم</span>
                      <span className={`text-2xl font-black ${course.textColor}`}>{course.progress}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${course.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Play size={16} className={course.textColor} />
                      <div>
                        <p className="text-xs text-slate-500 font-bold">الفيديوهات</p>
                        <p className="font-black text-slate-800">{course.watchedVideos}/{course.totalVideos}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={course.textColor} />
                      <div>
                        <p className="text-xs text-slate-500 font-bold">آخر مشاهدة</p>
                        <p className="font-black text-slate-800 text-sm">{course.lastWatchedTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Last Watched */}
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-slate-500 font-bold mb-1">آخر فيديو شوهد</p>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-500" />
                      {course.lastWatched}
                    </p>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/videos/v1`);
                    }}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r ${course.color} text-white font-black text-sm shadow-lg flex items-center justify-center gap-2`}
                  >
                    <Play size={18} />
                    استكمال المشاهدة
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Recommended Section */}
        {MY_COURSES.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
          >
            <h2 className="text-2xl font-black text-slate-800 mb-6">كورسات مقترحة</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'الصف الأول الثانوي', id: 'first-secondary', icon: '🧬', color: 'from-purple-600 to-purple-800' },
              ].map((course, idx) => (
                <div
                  key={idx}
                  className="border-2 border-slate-100 rounded-2xl p-4 hover:border-purple-200 transition-colors cursor-pointer flex items-center gap-4"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="text-3xl">{course.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-black text-slate-800">{course.title}</h3>
                    <p className="text-sm text-slate-500 font-bold">لم تشترك بعد</p>
                  </div>
                  <ChevronRight size={20} className={`text-slate-400 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}