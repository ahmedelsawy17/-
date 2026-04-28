import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, Star, Cookie, FlaskConical, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const COURSES = [
  {
    id: 'third-secondary',
    title: 'الصف الثالث الثانوي',
    titleEn: 'Third Secondary',
    description: 'رحلة الثانوية العامة نحو الدرجة النهائية في الكيمياء',
    descriptionEn: 'Your journey to full marks in chemistry for the general secondary',
    icon: '🧪',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    students: 15000,
    videos: 80,
    duration: '120 ساعة',
    rating: 4.9,
    price: 500,
    features: ['شرح شامل للمنهج كاملاً', 'امتحانات دورية', 'مذكرات وملخصات', 'متابعة لحظية للمستوى'],
  },
  {
    id: 'second-secondary',
    title: 'الصف الثاني الثانوي',
    titleEn: 'Second Secondary',
    description: 'التعمق في الكيمياء العضوية وغير العضوية',
    descriptionEn: 'Deep dive into organic and inorganic chemistry',
    icon: '🧫',
    color: 'from-emerald-600 to-emerald-800',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    students: 12000,
    videos: 60,
    duration: '90 ساعة',
    rating: 4.8,
    price: 400,
    features: ['أساسيات الكيمياء العضوية', 'التفاعلات الكيميائية', 'تمارين محلولة', 'اختبارات تفاعلية'],
  },
  {
    id: 'first-secondary',
    title: 'الصف الأول الثانوي',
    titleEn: 'First Secondary',
    description: 'تأسيس قوي في الكيمياء مع تدريبات تفاعلية واختبارات دورية',
    descriptionEn: 'Strong foundation in chemistry with interactive exercises',
    icon: '🧬',
    color: 'from-purple-600 to-purple-800',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    students: 10000,
    videos: 50,
    duration: '80 ساعة',
    rating: 4.7,
    price: 350,
    features: ['تأسيس متين في الكيمياء', 'تجارب عملية', 'تدريبات محلولة', 'متابعة مستمرة'],
  },
];

export default function CoursesListPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6]">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Cookie size={18} className="text-amber-400" />
              <span className="font-bold text-sm">الكيمياء بسكوته</span>
              <FlaskConical size={18} className="text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              كورسات المنصة
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
              اختر صفك الدراسي وابدأ رحلتك نحو التفوق في الكيمياء
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`${course.bgColor} rounded-3xl border-2 ${course.borderColor} overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {/* Course Header */}
                <div className={`bg-gradient-to-br ${course.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 text-5xl">{course.icon}</div>
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black mb-2">{course.title}</h3>
                    <p className="text-sm md:text-base opacity-90 font-bold">{isRTL ? course.description : course.descriptionEn}</p>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />
                </div>

                {/* Course Body */}
                <div className="p-6 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                        <Users size={14} />
                        <span className="text-xs font-bold">طلاب</span>
                      </div>
                      <p className={`font-black ${course.textColor}`}>{(course.students / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                        <BookOpen size={14} />
                        <span className="text-xs font-bold">فيديو</span>
                      </div>
                      <p className={`font-black ${course.textColor}`}>{course.videos}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                        <Clock size={14} />
                        <span className="text-xs font-bold">مدة</span>
                      </div>
                      <p className={`font-black ${course.textColor}`}>{course.duration}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className={star <= Math.floor(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
                      ))}
                    </div>
                    <span className="font-black text-slate-700">{course.rating}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${course.textColor.replace('text', 'bg')}`} />
                        <span className="text-sm font-bold text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-slate-800">{course.price}</span>
                      <span className="text-sm font-bold text-slate-500 mr-1">جنيه</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2.5 rounded-xl bg-gradient-to-r ${course.color} text-white font-black text-sm shadow-lg`}
                    >
                      اشترك الآن
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            ليس متأكداً من الصف المناسب لك؟
          </h2>
          <p className="text-lg text-slate-500 mb-8">
            تواصل معنا وسنساعدك في اختيار المسار الأنسب لمستواك
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-200 inline-flex items-center gap-2"
          >
            تواصل معنا
            <ChevronLeft size={20} className={isRTL ? '' : 'rotate-180'} />
          </motion.button>
        </div>
      </section>
    </div>
  );
}