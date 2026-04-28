import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, Cookie, FlaskConical, ChevronLeft, Zap, ArrowLeft, Filter, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const COURSES = [
  {
    id: 'third-secondary',
    title: 'الصف الثالث الثانوي',
    titleEn: 'Third Secondary',
    description: 'رحلة الثانوية العامة نحو الدرجة النهائية في الكيمياء مع أقوى نظام متابعة وامتحانات.',
    descriptionEn: 'Your journey to full marks in chemistry for the general secondary',
    icon: '🧪',
    color: 'from-blue-600 to-indigo-700',
    students: '15,000+',
    videos: 80,
    duration: '120 ساعة',
    rating: 4.9,
    price: 500,
    tags: ['الأكثر طلباً', 'متابعة 24/7'],
    features: ['شرح شامل للمنهج كاملاً', 'امتحانات تجريبية (بوكليت)', 'مذكرات وملخصات PDF', 'متابعة لحظية للأداء'],
  },
  {
    id: 'second-secondary',
    title: 'الصف الثاني الثانوي',
    titleEn: 'Second Secondary',
    description: 'التعمق في الكيمياء العضوية وغير العضوية وتأسيس متين للمرحلة النهائية.',
    descriptionEn: 'Deep dive into organic and inorganic chemistry',
    icon: '🧫',
    color: 'from-emerald-600 to-teal-700',
    students: '12,000+',
    videos: 60,
    duration: '90 ساعة',
    rating: 4.8,
    price: 400,
    tags: ['تأسيس عضوي'],
    features: ['أساسيات الكيمياء العضوية', 'التفاعلات الكيميائية', 'تمارين محلولة مكثفة', 'اختبارات تفاعلية'],
  },
  {
    id: 'first-secondary',
    title: 'الصف الأول الثانوي',
    titleEn: 'First Secondary',
    description: 'تأسيس قوي في الكيمياء من الصفر مع تجارب عملية مبسطة وشرح ممتع.',
    descriptionEn: 'Strong foundation in chemistry with interactive exercises',
    icon: '🧬',
    color: 'from-purple-600 to-pink-600',
    students: '10,000+',
    videos: 50,
    duration: '80 ساعة',
    rating: 4.7,
    price: 350,
    tags: ['تأسيس من الصفر'],
    features: ['تأسيس متين في الكيمياء', 'تجارب عملية بالفيديو', 'تدريبات محلولة خطوة بخطوة', 'متابعة دورية'],
  },
];

export default function CoursesListPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-mesh to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-blue-300 font-black text-xs uppercase tracking-widest mb-8">
              <Zap size={14} className="fill-blue-300" />
              مستقبلك يبدأ من هنا
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              استكشف <span className="text-gradient from-blue-400 to-cyan-300 bg-clip-text">كورساتنا التعليمية</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto font-medium leading-relaxed">
              اختر المرحلة الدراسية المناسبة لك وابدأ رحلة التفوق مع مستر إسلام غنيم بأسلوب "الكيمياء بسكوته".
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter Bar */}
          <div className="mb-12 flex flex-wrap items-center justify-between gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                  <Filter size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900">تصفية النتائج</h3>
                  <p className="text-xs text-slate-500 font-bold">اعرض الكورسات حسب المرحلة</p>
                </div>
             </div>
             <div className="flex gap-2">
                {['الكل', 'أولى ثانوي', 'تانية ثانوي', 'تالتة ثانوي'].map((cat, i) => (
                  <button key={i} className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                    {cat}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col bg-white rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-blue-200/50 overflow-hidden transition-all hover:translate-y-[-10px] cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {/* Visual Header */}
                <div className={`h-48 bg-gradient-to-br ${course.color} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-pattern opacity-10" />
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-8xl relative z-10 drop-shadow-2xl"
                  >
                    {course.icon}
                  </motion.div>
                  <div className="absolute top-6 right-6 flex flex-wrap gap-2 justify-end max-w-[200px]">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] text-white font-black uppercase tracking-wider border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                     <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 5 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                        ))}
                     </div>
                     <span className="text-xs font-black text-slate-400">({course.rating})</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed mb-6 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
                    <div className="text-center">
                       <p className="text-lg font-black text-slate-900">{course.videos}</p>
                       <p className="text-[10px] text-slate-400 font-black uppercase">فيديو</p>
                    </div>
                    <div className="text-center border-x border-slate-200">
                       <p className="text-lg font-black text-slate-900">{course.students}</p>
                       <p className="text-[10px] text-slate-400 font-black uppercase">طالب</p>
                    </div>
                    <div className="text-center">
                       <p className="text-lg font-black text-slate-900">{course.duration.split(' ')[0]}</p>
                       <p className="text-[10px] text-slate-400 font-black uppercase">ساعة</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-1">
                    {course.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-xs font-black text-slate-600">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                       <p className="text-xs text-slate-400 font-black uppercase">سعر الكورس</p>
                       <p className="text-2xl font-black text-slate-900">{course.price} <span className="text-sm">ج.م</span></p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} text-white flex items-center justify-center shadow-xl shadow-blue-100 transition-all`}
                    >
                      <ArrowLeft className={isRTL ? '' : 'rotate-180'} size={24} strokeWidth={3} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-slate-900 rounded-[56px] p-16 text-center text-white relative shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2" />
          <h2 className="text-3xl md:text-5xl font-black mb-8">محتار تختار إيه؟</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">تواصل معنا الآن وسنساعدك في اختيار الكورس الأنسب لمستواك الدراسي.</p>
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-10 py-4 rounded-2xl bg-white text-slate-900 font-black text-lg shadow-xl flex items-center gap-3 mx-auto"
          >
            تواصل مع الدعم الفني
            <Phone size={20} className="text-blue-600" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}