import React from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Play, Cookie, FlaskConical, ChevronRight, BookOpen, CheckCircle, Download, MessageCircle, Zap, ShieldCheck, ArrowLeft, ArrowRight, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const COURSES_DATA: Record<string, any> = {
  'third-secondary': {
    id: 'third-secondary',
    title: 'الصف الثالث الثانوي',
    titleEn: 'Third Secondary',
    description: 'رحلة الثانوية العامة نحو الدرجة النهائية في الكيمياء مع أقوى نظام متابعة وامتحانات.',
    descriptionEn: 'Your journey to full marks in chemistry for the general secondary',
    icon: '🧪',
    color: 'from-blue-600 to-indigo-700',
    students: '15,000+',
    videosCount: 80,
    duration: '120 ساعة',
    rating: 4.9,
    price: 500,
    priceDisplay: '500 ج.م',
    features: ['شرح شامل للمنهج كاملاً', 'امتحانات تجريبية (بوكليت)', 'مذكرات وملخصات PDF', 'متابعة لحظية للأداء'],
    curriculum: [
      { title: 'الوحدة الأولى: الكيمياء الحرارية', lessons: 12, duration: '18 ساعة' },
      { title: 'الوحدة الثانية: الاتزان الكيميائي', lessons: 10, duration: '15 ساعة' },
      { title: 'الوحدة الثالثة: الأحماض والقواعد', lessons: 8, duration: '12 ساعة' },
      { title: 'الوحدة الرابعة: الكيمياء العضوية', lessons: 25, duration: '35 ساعة' },
      { title: 'الوحدة الخامسة: التحليل الكيميائي', lessons: 15, duration: '20 ساعة' },
    ],
    videos: [
      { id: 'v1', title: 'مقدمة في الكيمياء الحرارية', duration: '45:30', isFree: true },
      { id: 'v2', title: 'قانون هس والدالة H', duration: '52:15', isFree: false },
      { id: 'v3', title: 'حساب التغير في المحتوى الحراري', duration: '48:00', isFree: false },
      { id: 'v4', title: 'مفهوم الاتزان الكيميائي', duration: '55:20', isFree: true },
    ],
  },
  'second-secondary': {
    id: 'second-secondary',
    title: 'الصف الثاني الثانوي',
    titleEn: 'Second Secondary',
    description: 'التعمق في الكيمياء العضوية وغير العضوية وتأسيس متين للمرحلة النهائية.',
    descriptionEn: 'Deep dive into organic and inorganic chemistry',
    icon: '🧫',
    color: 'from-emerald-600 to-teal-700',
    students: '12,000+',
    videosCount: 60,
    duration: '90 ساعة',
    rating: 4.8,
    price: 400,
    priceDisplay: '400 ج.م',
    features: ['أساسيات الكيمياء العضوية', 'التفاعلات الكيميائية', 'تمارين محلولة مكثفة', 'اختبارات تفاعلية'],
    curriculum: [
      { title: 'الوحدة الأولى: الكيمياء العضوية', lessons: 20, duration: '30 ساعة' },
      { title: 'الوحدة الثانية: الهيدروكربونات', lessons: 15, duration: '22 ساعة' },
      { title: 'الوحدة الثالثة: الكحولات والإيثرات', lessons: 12, duration: '18 ساعة' },
    ],
    videos: [
      { id: 'v1', title: 'مقدمة في الكيمياء العضوية', duration: '40:00', isFree: true },
      { id: 'v2', title: 'تصنيف الهيدروكربونات', duration: '45:30', isFree: false },
    ],
  },
  'first-secondary': {
    id: 'first-secondary',
    title: 'الصف الأول الثانوي',
    titleEn: 'First Secondary',
    description: 'تأسيس قوي في الكيمياء من الصفر مع تجارب عملية مبسطة وشرح ممتع.',
    descriptionEn: 'Strong foundation in chemistry with interactive exercises',
    icon: '🧬',
    color: 'from-purple-600 to-pink-600',
    students: '10,000+',
    videosCount: 50,
    duration: '80 ساعة',
    rating: 4.7,
    price: 350,
    priceDisplay: '350 ج.م',
    features: ['تأسيس متين في الكيمياء', 'تجارب عملية بالفيديو', 'تدريبات محلولة خطوة بخطوة', 'متابعة دورية'],
    curriculum: [
      { title: 'الوحدة الأولى: المادة وتحولاتها', lessons: 15, duration: '20 ساعة' },
      { title: 'الوحدة الثانية: الذرة وتركيبها', lessons: 12, duration: '18 ساعة' },
    ],
    videos: [
      { id: 'v1', title: 'مقدمة في علم الكيمياء', duration: '35:00', isFree: true },
      { id: 'v2', title: 'تركيب الذرة الحديث', duration: '42:30', isFree: false },
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
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-6">الكورس غير موجود</h1>
          <button 
            onClick={() => navigate('/courses')} 
            className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
          >
            العودة لقائمة الكورسات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      {/* Premium Hero Section */}
      <section className={`relative pt-32 pb-32 overflow-hidden bg-slate-900`}>
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className={`absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-mesh to-transparent`} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-16 items-start"
          >
            <div className="flex-1">
              <motion.button
                whileHover={{ x: -10 }}
                onClick={() => navigate('/courses')}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full mb-10 hover:bg-white/20 transition-all text-blue-300 font-black text-sm border border-white/10"
              >
                <ArrowRight size={18} className={isRTL ? '' : 'rotate-180'} />
                العودة للكورسات
              </motion.button>

              <div className="flex items-center gap-6 mb-8">
                <div className={`w-24 h-24 rounded-[32px] bg-gradient-to-br ${course.color} flex items-center justify-center text-6xl shadow-2xl`}>
                  {course.icon}
                </div>
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-black text-[10px] uppercase tracking-widest mb-2 border border-blue-500/20">
                      <Zap size={12} className="fill-blue-400" />
                      محتوى محدث 2024
                   </div>
                   <h1 className="text-4xl md:text-6xl font-black text-white">{course.title}</h1>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-3xl font-medium leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <HeroStat icon={<Users size={20} />} label="طالب مشترك" value={course.students} />
                <HeroStat icon={<PlayCircle size={20} />} label="محاضرة مرئية" value={course.videosCount} />
                <HeroStat icon={<Clock size={20} />} label="ساعة تعليمية" value={course.duration.split(' ')[0]} />
                <HeroStat icon={<Star size={20} className="text-amber-400 fill-amber-400" />} label="تقييم الكورس" value={course.rating} />
              </div>
            </div>

            {/* Premium Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full lg:w-[400px] bg-white rounded-[56px] p-10 shadow-[0_40px_100px_-20px_rgba(30,58,138,0.2)] border border-slate-100 sticky top-32"
            >
              <div className="text-center mb-10">
                 <p className="text-sm text-slate-400 font-black uppercase tracking-widest mb-2">سعر الاشتراك السنوي</p>
                 <div className="flex items-center justify-center gap-2">
                    <span className="text-6xl font-black text-slate-900 tracking-tighter">{course.price}</span>
                    <span className="text-2xl font-black text-blue-600">ج.م</span>
                 </div>
              </div>

              <div className="space-y-4 mb-10">
                {course.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100 transition-colors group">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle size={18} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-black text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>

              {user ? (
                <motion.button 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-6 rounded-[28px] bg-gradient-to-br ${course.color} text-white font-black text-xl shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3`}
                >
                  <Zap size={24} />
                  اشترك الآن
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/login')}
                  className={`w-full py-6 rounded-[28px] bg-slate-900 text-white font-black text-xl shadow-2xl flex items-center justify-center gap-3`}
                >
                  <User size={24} />
                  سجل دخول للاشتراك
                </motion.button>
              )}

              <div className="mt-8 flex items-center justify-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                 <ShieldCheck size={16} className="text-emerald-500" />
                 ضمان استرداد الأموال خلال 7 أيام
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-10 pb-32">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Curriculum column */}
          <div className="lg:col-span-2 space-y-12">
            <section className="glass p-10 rounded-[56px] border-white/50 shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">منهج الكورس</h2>
                  <p className="text-slate-500 font-bold">خطة دراسية متكاملة مقسمة لوحدات</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
                   <BookOpen size={28} />
                </div>
              </div>

              <div className="space-y-6">
                {course.curriculum.map((unit: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[32px] bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-6">
                         <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl font-black text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {i + 1}
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{unit.title}</h3>
                            <div className="flex items-center gap-4">
                               <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                  <PlayCircle size={14} />
                                  {unit.lessons} درس
                               </span>
                               <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                  <Clock size={14} />
                                  {unit.duration}
                               </span>
                            </div>
                         </div>
                      </div>
                      <ChevronRight className={`text-slate-200 group-hover:text-blue-600 transition-all ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                    {/* Progress bar placeholder */}
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                       <div className="h-full w-0 bg-blue-600 rounded-full group-hover:w-full transition-all duration-1000" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Video Previews */}
            <section className="glass p-10 rounded-[56px] border-white/50 shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">معاينة الدروس</h2>
                  <p className="text-slate-500 font-bold">ابدأ بمشاهدة عينة من الشرح الآن</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 text-amber-600">
                   <Play size={28} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-4">
                {course.videos.map((vid: any, i: number) => (
                  <motion.div
                    key={vid.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-5">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${vid.isFree ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-300'}`}>
                          {vid.isFree ? <Play size={24} fill="currentColor" /> : <ShieldCheck size={24} />}
                       </div>
                       <div>
                          <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{vid.title}</p>
                          <p className="text-xs text-slate-400 font-bold tracking-tight">{vid.duration}</p>
                       </div>
                    </div>
                    {vid.isFree ? (
                      <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        متاح مجاناً
                      </span>
                    ) : (
                      <div className="p-3 rounded-xl bg-slate-50 text-slate-400">
                        <Lock size={18} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar info */}
          <div className="space-y-8">
             <div className="glass p-8 rounded-[48px] border-white/50 shadow-xl">
                <h3 className="text-xl font-black text-slate-900 mb-6">عن المحاضر</h3>
                <div className="flex items-center gap-4 mb-6">
                   <img src="/eslam.png" className="w-16 h-16 rounded-2xl object-cover bg-slate-100" />
                   <div>
                      <p className="font-black text-slate-900 text-lg">أ. إسلام غنيم</p>
                      <p className="text-xs text-blue-600 font-bold">خبير الكيمياء للثانوية العامة</p>
                   </div>
                </div>
                <p className="text-sm text-slate-500 font-bold leading-relaxed mb-6">
                   خبرة 15 عاماً في تبسيط منهج الكيمياء وصاحب أقوى نظام متابعة للطلاب في مصر.
                </p>
                <button 
                  onClick={() => navigate('/about')}
                  className="w-full py-4 rounded-2xl bg-slate-50 text-slate-600 font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                   عرض الملف الشخصي
                   <ArrowRight className="rotate-180" size={16} />
                </button>
             </div>

             <div className="glass p-8 rounded-[48px] border-white/50 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <h3 className="text-xl font-black mb-6">هل لديك استفسار؟</h3>
                <p className="text-blue-100/70 text-sm font-medium mb-8 leading-relaxed">
                   فريق الدعم الفني متواجد لمساعدتك في عملية الاشتراك وتفعيل الحساب.
                </p>
                <button 
                   onClick={() => navigate('/contact')}
                   className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                   <MessageCircle size={18} />
                   تواصل معنا الآن
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: any }) {
  return (
    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-[32px] border border-white/10">
       <div className="text-blue-400">{icon}</div>
       <div>
          <p className="text-lg font-black text-white leading-none mb-1">{value}</p>
          <p className="text-[10px] text-blue-100/50 font-black uppercase tracking-widest">{label}</p>
       </div>
    </div>
  );
}

function Lock({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}