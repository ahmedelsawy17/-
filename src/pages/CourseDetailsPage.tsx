import React from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Play, Cookie, FlaskConical, ChevronRight, BookOpen, CheckCircle, Download, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const COURSES_DATA: Record<string, any> = {
  'third-secondary': {
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
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    students: 15000,
    videosCount: 80,
    duration: '120 ساعة',
    rating: 4.9,
    price: 500,
    priceDisplay: '500 جنيه',
    features: ['شرح شامل للمنهج كاملاً', 'امتحانات دورية', 'مذكرات وملخصات', 'متابعة لحظية للمستوى'],
    curriculum: [
      { title: 'الوحدة الأولى: الكيمياء الحرارية', lessons: 12, duration: '18 ساعة' },
      { title: 'الوحدة الثانية: الاتزان الكيميائي', lessons: 10, duration: '15 ساعة' },
      { title: 'الوحدة الثالثة: الأحماض والقواعد', lessons: 8, duration: '12 ساعة' },
      { title: 'الوحدة الرابعة: الكيمياء العضوية', lessons: 25, duration: '35 ساعة' },
      { title: 'الوحدة الخامسة: التحليل الكيميائي', lessons: 15, duration: '20 ساعة' },
      { title: 'الوحدة السادسة: المراجعة النهائية', lessons: 10, duration: '20 ساعة' },
    ],
    videos: [
      { id: 'v1', title: 'مقدمة في الكيمياء الحرارية', duration: '45:30', isFree: true },
      { id: 'v2', title: 'قانون هس والدالة H', duration: '52:15', isFree: false },
      { id: 'v3', title: 'حساب التغير في المحتوى الحراري', duration: '48:00', isFree: false },
      { id: 'v4', title: 'مفهوم الاتزان الكيميائي', duration: '55:20', isFree: true },
      { id: 'v5', title: 'ثابت الاتزان Kc و Kp', duration: '50:10', isFree: false },
    ],
  },
  'second-secondary': {
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
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
    students: 12000,
    videosCount: 60,
    duration: '90 ساعة',
    rating: 4.8,
    price: 400,
    priceDisplay: '400 جنيه',
    features: ['أساسيات الكيمياء العضوية', 'التفاعلات الكيميائية', 'تمارين محلولة', 'اختبارات تفاعلية'],
    curriculum: [
      { title: 'الوحدة الأولى: الكيمياء العضوية', lessons: 20, duration: '30 ساعة' },
      { title: 'الوحدة الثانية: الهيدروكربونات', lessons: 15, duration: '22 ساعة' },
      { title: 'الوحدة الثالثة: الكحولات والإيثرات', lessons: 12, duration: '18 ساعة' },
      { title: 'الوحدة الرابعة: الأحماض الكربوكسيلية', lessons: 10, duration: '15 ساعة' },
      { title: 'الوحدة الخامسة: المراجعة الشاملة', lessons: 8, duration: '15 ساعة' },
    ],
    videos: [
      { id: 'v1', title: 'مقدمة في الكيمياء العضوية', duration: '40:00', isFree: true },
      { id: 'v2', title: 'تصنيف الهيدروكربونات', duration: '45:30', isFree: false },
      { id: 'v3', title: 'الألكانات وخواصها', duration: '50:00', isFree: false },
    ],
  },
  'first-secondary': {
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
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    students: 10000,
    videosCount: 50,
    duration: '80 ساعة',
    rating: 4.7,
    price: 350,
    priceDisplay: '350 جنيه',
    features: ['تأسيس متين في الكيمياء', 'تجارب عملية', 'تدريبات محلولة', 'متابعة مستمرة'],
    curriculum: [
      { title: 'الوحدة الأولى: المادة وتحولاتها', lessons: 15, duration: '20 ساعة' },
      { title: 'الوحدة الثانية: الذرة وتركيبها', lessons: 12, duration: '18 ساعة' },
      { title: 'الوحدة الثالثة: الجدول الدوري', lessons: 10, duration: '15 ساعة' },
      { title: 'الوحدة الرابعة: الروابط الكيميائية', lessons: 15, duration: '20 ساعة' },
      { title: 'الوحدة الخامسة: المراجعة النهائية', lessons: 8, duration: '12 ساعة' },
    ],
    videos: [
      { id: 'v1', title: 'مقدمة في علم الكيمياء', duration: '35:00', isFree: true },
      { id: 'v2', title: 'تركيب الذرة الحديث', duration: '42:30', isFree: false },
      { id: 'v3', title: 'نموذج بور للذرة', duration: '38:00', isFree: false },
    ],
  },
};

export default function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  const course = courseId ? COURSES_DATA[courseId] : null;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-4">الكورس غير موجود</h1>
          <button onClick={() => navigate('/courses')} className="text-blue-600 font-bold hover:underline">
            العودة لقائمة الكورسات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6]">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${course.color} text-white py-12 md:py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={16} className={`${isRTL ? 'rotate-180' : ''}`} />
              <span className="font-bold text-sm">العودة للكورسات</span>
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="text-6xl mb-4">{course.icon}</div>
                <h1 className="text-4xl md:text-5xl font-black mb-4">{course.title}</h1>
                <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl">
                  {isRTL ? course.description : course.descriptionEn}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                    <Users size={18} />
                    <span className="font-bold">{(course.students / 1000).toFixed(0)}K طالب</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                    <BookOpen size={18} />
                    <span className="font-bold">{course.videosCount} فيديو</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                    <Clock size={18} />
                    <span className="font-bold">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                    <Star size={18} className="text-amber-400 fill-amber-400" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                </div>
              </div>

              {/* Enrollment Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-2xl w-full lg:w-80 text-slate-800"
              >
                <div className="text-center mb-6">
                  <p className="text-4xl font-black text-slate-800">{course.priceDisplay}</p>
                  <p className="text-sm text-slate-500 font-bold">الاشتراك لمدة سنة كاملة</p>
                </div>

                <div className="space-y-3 mb-6">
                  {course.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle size={18} className={course.textColor} />
                      <span className="text-sm font-bold text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {user ? (
                  <button className={`w-full py-3 rounded-xl text-white font-black text-lg ${course.buttonColor} shadow-lg transition-colors`}>
                    اشترك الآن
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className={`w-full py-3 rounded-xl text-white font-black text-lg ${course.buttonColor} shadow-lg transition-colors`}
                  >
                    سجل دخول للاشتراك
                  </button>
                )}

                <p className="text-center text-xs text-slate-400 mt-4 font-bold">
                  يمكنك إلغاء الاشتراك في أي وقت
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 text-center">محتوى الكورس</h2>
          <p className="text-slate-500 text-center mb-12">منهج شامل ومفصل لضمان أفضل تجهيز</p>

          <div className="grid lg:grid-cols-2 gap-6">
            {course.curriculum.map((unit: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-2 border-slate-100 rounded-2xl p-6 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-slate-800">{unit.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${course.bgColor} ${course.textColor}`}>
                    {unit.lessons} درس
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={16} />
                  <span className="text-sm font-bold">{unit.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Preview */}
      <section className="py-12 md:py-20 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 text-center">معاينة الفيديوهات</h2>
          <p className="text-slate-500 text-center mb-12">ابدأ بمشاهدة بعض الدروس المجانية</p>

          <div className="max-w-3xl mx-auto space-y-3">
            {course.videos.map((video: any, index: number) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${course.bgColor}`}>
                  {video.isFree ? (
                    <Play size={20} className={course.textColor} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-black text-slate-800">{video.title}</p>
                  <p className="text-sm text-slate-500 font-bold">{video.duration}</p>
                </div>
                {video.isFree ? (
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    مجاني
                  </span>
                ) : (
                  <span className="text-xs font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    مشترك
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 bg-gradient-to-br ${course.color} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">ابدأ رحلتك الآن</h2>
          <p className="text-lg opacity-90 mb-8">
            انضم لآلاف الطلاب واستعد للتفوق في الكيمياء
          </p>
          {user ? (
            <button className="px-8 py-3 rounded-2xl bg-white text-slate-800 font-black text-lg shadow-xl inline-flex items-center gap-2 hover:bg-slate-100 transition-colors">
              <Cookie size={20} className="text-amber-500" />
              اشترك الآن
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 rounded-2xl bg-white text-slate-800 font-black text-lg shadow-xl inline-flex items-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <Cookie size={20} className="text-amber-500" />
              سجل دخول للاشتراك
            </button>
          )}
        </div>
      </section>
    </div>
  );
}