import React from 'react';
import { motion } from 'motion/react';
import { 
  Cookie, 
  FlaskConical, 
  Globe, 
  PlayCircle, 
  User, 
  CheckCircle2, 
  Zap, 
  Target, 
  ShieldCheck,
  MessageCircle,
  ChevronDown,
  Star,
  Quote,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const HERO_IMAGE = '/eslam.png';
const LOGO_IMAGE = '/logo-eslam.png';

const THIRD_YEAR_VIDEOS = [
  { id: 'v1', title: 'أساسيات الكيمياء العضوية - الجزء الأول', videoId: 'ilsiFVellfQ' },
  { id: 'v2', title: 'الروابط الكيميائية وتفسيرها', videoId: 'es91tSF9HXE' },
  { id: 'v3', title: 'حل أسئلة بنك المعرفة - تالتة ثانوي', videoId: 'vQqGcpL2DGo' },
];

const FEATURES = [
  {
    title: 'شرح مبسط وشامل',
    description: 'تحويل أصعب المفاهيم الكيميائية إلى "بسكوتة" سهلة الهضم.',
    icon: <Zap className="text-amber-500" size={24} />,
    color: 'bg-amber-50',
  },
  {
    title: 'امتحانات دورية',
    description: 'اختبارات بعد كل حصة لتقييم مستواك وضمان الفهم التام.',
    icon: <Target className="text-red-500" size={24} />,
    color: 'bg-red-50',
  },
  {
    title: 'متابعة لحظية',
    description: 'تواصل مباشر مع المستر وفريق الدعم الفني للإجابة على استفساراتك.',
    icon: <MessageCircle className="text-blue-500" size={24} />,
    color: 'bg-blue-50',
  },
  {
    title: 'محتوى آمن',
    description: 'منصة مشفرة بالكامل تضمن خصوصية بياناتك وسهولة الوصول للمحتوى.',
    icon: <ShieldCheck className="text-emerald-500" size={24} />,
    color: 'bg-emerald-50',
  },
];

const TESTIMONIALS = [
  {
    name: 'أحمد محمد',
    text: 'بجد الكيمياء كانت عقدتي، بس مع مستر إسلام بقت أسهل مادة عندي. شرح خرافى!',
    school: 'مدرسة المتفوقين',
    stars: 5,
  },
  {
    name: 'سارة خالد',
    text: 'المنصة سهلة جداً والامتحانات بتساعدني أعرف غلطاتي أول بأول. شكراً جداً.',
    school: 'الثانوية بنات',
    stars: 5,
  },
  {
    name: 'ياسين علي',
    text: 'أفضل مدرس كيمياء بلا منازع، المذكرات منظمة جداً والفيديوهات جودتها عالية.',
    school: 'المنارة الرسمية',
    stars: 5,
  },
];

function BrandInline({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="text-gradient">الكيمياء بسكوته</span>
      <Cookie size={18} className="text-amber-500 animate-bounce" />
      <FlaskConical size={18} className="text-blue-500" />
    </span>
  );
}

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      
      <MainSite t={t} isRTL={i18n.language === 'ar'} />
    </div>
  );
}

function MainSite({ t, isRTL }: { t: (key: string) => string; isRTL: boolean }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full max-w-[550px] mx-auto group">
                <div className="absolute inset-0 bg-blue-600 rounded-[60px] rotate-6 group-hover:rotate-3 transition-transform duration-700 blur-2xl opacity-20" />
                <div className="relative bg-slate-800 rounded-[60px] p-3 shadow-2xl border-4 border-white/10 overflow-hidden">
                  <img src={HERO_IMAGE} alt="أ. إسلام غنيم" className="w-full h-auto object-contain rounded-[48px]" />
                  
                  {/* Floating Stats Card */}
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-12 -right-8 glass p-6 rounded-[32px] shadow-2xl flex items-center gap-4 border-l-8 border-blue-500"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Users size={28} />
                    </div>
                    <div>
                      <p className="text-lg font-black text-slate-900">+50,000</p>
                      <p className="text-xs text-slate-500 font-bold tracking-tight">طالب مشترك</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                    className="absolute bottom-24 -left-10 glass p-6 rounded-[32px] shadow-2xl flex items-center gap-4 border-r-8 border-amber-500"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg">
                      <Star size={28} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-slate-900">4.9/5.0</p>
                      <p className="text-xs text-slate-500 font-bold tracking-tight">تقييم المحاضرات</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 backdrop-blur-xl text-blue-400 font-black text-xs border border-blue-500/20 mb-8 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                المنصة التعليمية الأولى في مصر
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1]">
                خلى الكيمياء...
                <br />
                <span className="text-gradient from-blue-400 to-cyan-300 bg-clip-text">بسكوته في جيبك!</span>
              </h2>
              <p className="text-lg lg:text-2xl text-blue-100/70 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                حوّل المادة "البعبع" لأسهل مادة في جدولك. مع مستر إسلام غنيم، بنبسط المعقد وبنأسس للتفوق.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-5 mb-16">
                <motion.button 
                  whileHover={{ y: -5, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  onClick={() => navigate('/login')}
                  className="px-10 py-5 rounded-[24px] bg-blue-600 text-white font-black text-xl shadow-2xl shadow-blue-500/25 flex items-center gap-3"
                >
                  سجل مجاناً الآن
                  <ArrowRight className="rotate-180" size={24} />
                </motion.button>
                <motion.button 
                  whileHover={{ y: -5, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  onClick={() => {
                    const el = document.getElementById('third-videos');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-10 py-5 rounded-[24px] bg-white/10 backdrop-blur-xl text-white font-black text-xl border border-white/10 hover:bg-white/20 transition-all flex items-center gap-3"
                >
                  <PlayCircle size={24} />
                  حصص مجانية
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
                <StatItem value="+٥٠ ألف" label="طالب مشترك" dark />
                <StatItem value="+٢٠٠" label="فيديو تعليمي" dark />
                <StatItem value="١٠٠٪" label="تغطية المنهج" dark />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-24">
            <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">ليه تذاكر كيمياء معانا؟</h3>
            <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto">نجمع بين التكنولوجيا الحديثة وأسلوب الشرح المبتكر لضمان وصول المعلومة بأسهل طريقة.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                className="p-10 rounded-[48px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-200 transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-[24px] ${feature.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-black mb-4">{feature.title}</h4>
                <p className="text-slate-500 font-bold leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-32 bg-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">رحلتك الدراسية</h3>
              <p className="text-slate-500 font-bold text-lg">اختر صفك الدراسي وابدأ رحلة التأسيس والتفوق مع أقوى المناهج التعليمية المحدثة.</p>
            </div>
            <Link to="/courses" className="flex items-center gap-3 text-blue-600 font-black text-lg hover:gap-5 transition-all">
              عرض كل الكورسات
              <ArrowRight className="rotate-180" size={24} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <CourseCard
              icon="🧪"
              title="الصف الثالث الثانوي"
              description="رحلة الثانوية العامة نحو الدرجة النهائية بأقوى شرح ومراجعات شاملة."
              button="عرض التفاصيل"
              href="/courses/third-secondary"
              accent="blue"
            />
            <CourseCard
              icon="🧫"
              title="الصف الثاني الثانوي"
              description="تأسيس عميق في الكيمياء العضوية وغير العضوية بمنهج حديث ومبسط."
              button="عرض التفاصيل"
              href="/courses/second-secondary"
              accent="indigo"
            />
            <CourseCard
              icon="🧬"
              title="الصف الأول الثانوي"
              description="تأسيس قوي في مبادئ الكيمياء مع تدريبات تفاعلية دورية ومتابعة."
              button="عرض التفاصيل"
              href="/courses/first-secondary"
              accent="emerald"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-24">
            <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">آراء البسكوتات</h3>
            <p className="text-slate-500 font-bold text-lg">قصص نجاح طلابنا هي أكبر دليل على قوة المنصة وأسلوب المستر.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-12 rounded-[48px] relative group border-slate-100 shadow-2xl hover:shadow-blue-100 transition-all duration-500"
              >
                <Quote className="absolute top-10 right-10 text-blue-100 group-hover:text-blue-200 transition-colors" size={64} />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 font-bold text-xl mb-10 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                      {t.name[0]}
                    </div>
                    <div>
                      <h5 className="font-black text-xl text-slate-800">{t.name}</h5>
                      <p className="text-sm text-slate-500 font-bold">{t.school}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="third-videos" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-24">
             <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-6">
                <PlayCircle size={40} />
             </div>
            <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">حصص مجانية</h3>
            <p className="text-slate-500 font-bold text-lg max-w-xl mx-auto">عينة من شرح المستر لطلاب تالتة ثانوي عشان تقتنع إن الكيمياء فعلاً بسكوته.</p>
          </div>
          <div className="grid gap-12 max-w-5xl mx-auto">
            {THIRD_YEAR_VIDEOS.map((video, idx) => (
              <VideoPreviewCard key={video.id} title={video.title} videoId={video.videoId} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto glass-dark rounded-[60px] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(30,58,138,0.3)]"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] translate-y-1/2" />
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-7xl font-black mb-8 leading-tight">جاهز تبدأ رحلة التفوق؟</h3>
            <p className="text-blue-100 text-xl lg:text-2xl mb-14 max-w-3xl mx-auto font-medium">انضم لآلاف الطلاب اللي وثقوا في "مستر إسلام غنيم" وحققوا حلمهم.</p>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 rounded-[28px] bg-white text-blue-900 font-black text-2xl shadow-2xl flex items-center gap-4 mx-auto"
              >
                سجل حسابك مجاناً
                <ArrowRight className="rotate-180" size={28} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Modern Footer */}
      <footer id="contact" className="bg-[#0f172a] text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-blue-600">
                  <FlaskConical size={32} />
                </div>
                <div>
                  <h4 className="text-3xl font-black">الكيمياء بسكوته</h4>
                  <p className="text-blue-400 font-black tracking-widest uppercase text-xs mt-1">المكان الأول للتميز التعليمي</p>
                </div>
              </div>
              <p className="text-slate-400 font-bold text-lg leading-relaxed max-w-md">
                المنصة الرائدة في تبسيط مادة الكيمياء لطلاب المرحلة الثانوية في مصر، بنحول الصعب لسهل وبنخليك تحب المادة.
              </p>
            </div>
            <div>
              <h5 className="text-xl font-black mb-8">روابط تهمك</h5>
              <ul className="space-y-4 text-slate-400 font-bold text-lg">
                <li><Link to="/courses" className="hover:text-blue-400 transition-colors">قائمة الكورسات</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">باقات الأسعار</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">قصة المنصة</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">تواصل معنا</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-black mb-8">تواصل مباشر</h5>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <MessageCircle size={22} />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 font-black uppercase">واتساب</p>
                       <p className="text-lg font-black">01234567890</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <Phone size={22} />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 font-black uppercase">الدعم الفني</p>
                       <p className="text-lg font-black">01234567891</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 font-bold flex items-center gap-2">
              جميع الحقوق محفوظة © {new Date().getFullYear()} - أ. إسلام غنيم
              <Cookie size={16} className="text-amber-500" />
            </p>
            <div className="flex gap-6 text-slate-400 font-bold text-sm">
               <a href="#" className="hover:text-white">سياسة الخصوصية</a>
               <a href="#" className="hover:text-white">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function CourseCard({
  icon,
  title,
  description,
  button,
  href,
  accent = 'blue',
}: {
  icon: string;
  title: string;
  description: string;
  button: string;
  href: string;
  accent?: 'blue' | 'indigo' | 'emerald';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white',
    indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-12 rounded-[56px] shadow-2xl border border-slate-100 hover:border-blue-100 transition-all duration-500 flex flex-col items-center text-center group"
    >
      <div className="w-28 h-28 rounded-[32px] bg-slate-50 flex items-center justify-center text-6xl mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-inner">
        {icon}
      </div>
      <h4 className="text-3xl font-black mb-6 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-lg font-bold mb-10 leading-relaxed">{description}</p>
      <Link 
        to={href} 
        className={`w-full py-5 rounded-[24px] font-black text-xl transition-all shadow-xl ${colors[accent]}`}
      >
        {button}
      </Link>
    </motion.div>
  );
}

function VideoPreviewCard({ title, videoId, index }: { title: string; videoId: string; index: number }) {
  const getYouTubeEmbedUrl = (id: string) =>
    `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden grid lg:grid-cols-2 gap-0 group"
    >
      <div className="aspect-video bg-black relative lg:h-full">
        <iframe
          src={getYouTubeEmbedUrl(videoId)}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="p-10 md:p-16 flex flex-col justify-center items-start">
        <div className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-black mb-6 uppercase tracking-[0.2em]">
          عرض مجاني
        </div>
        <h4 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-blue-600 transition-colors leading-tight">{title}</h4>
        <p className="text-slate-500 font-bold text-lg mb-10 leading-relaxed">جرب بنفسك أسلوب الشرح وشوف ليه آلاف الطلاب بيعشقوا مادة الكيمياء مع مستر إسلام.</p>
        <motion.button
          whileHover={{ x: 15 }}
          className="flex items-center gap-3 text-blue-600 font-black text-xl group"
        >
          شاهد المحتوى الكامل
          <ArrowRight className="rotate-180" size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function StatItem({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-2xl sm:text-4xl font-black mb-1 ${dark ? 'text-blue-400' : 'text-blue-600'}`}>{value}</p>
      <p className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${dark ? 'text-blue-100/50' : 'text-slate-400'}`}>{label}</p>
    </div>
  );
}