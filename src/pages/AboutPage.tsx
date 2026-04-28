import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Cookie, 
  FlaskConical, 
  Users, 
  BookOpen, 
  Star, 
  ChevronRight, 
  GraduationCap, 
  Target, 
  Lightbulb,
  Award,
  Zap,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900" />
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex p-4 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-2xl">
              <FlaskConical size={48} className="text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              عن <span className="text-gradient from-blue-400 to-cyan-300 bg-clip-text">الكيمياء بسكوته</span>
            </h1>
            <p className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mx-auto font-medium leading-relaxed">
              قصة شغف بدأت بتبسيط أصعب المفاهيم الكيميائية لتصبح تجربة ممتعة وفريدة لكل طالب مصري.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[48px] shadow-2xl hover:shadow-blue-100 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 italic">رؤيتنا</h2>
              <p className="text-slate-600 font-bold text-lg leading-relaxed">
                أن نكون المنصة التعليمية الرقمية الأولى في العالم العربي، ونغير النظرة التقليدية لمادة الكيمياء من مادة "معقدة" إلى مادة "ممتعة وتأسيسية" تبني عقول المستقبل.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[48px] shadow-2xl hover:shadow-emerald-100 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                <Lightbulb size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 italic">رسالتنا</h2>
              <p className="text-slate-600 font-bold text-lg leading-relaxed">
                تقديم محتوى تعليمي فائق الجودة يجمع بين الدقة العلمية والبساطة في الطرح، مع توفير بيئة تفاعلية تدعم الطالب في كل خطوة نحو التفوق الدراسي.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teacher Profile */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-[60px] rotate-6 opacity-10" />
              <div className="relative bg-slate-100 rounded-[60px] p-4 border-8 border-white shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                 <div className="text-9xl font-black text-blue-600/20 absolute inset-0 flex items-center justify-center pointer-events-none">
                    ISLAM
                 </div>
                 <img src="/eslam.png" alt="أ. إسلام غنيم" className="relative z-10 w-full h-full object-cover rounded-[48px]" />
              </div>
            </motion.div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-black text-xs border border-blue-100 mb-6">
                  مؤسس المنصة
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">أ. إسلام غنيم</h2>
                <p className="text-xl text-blue-600 font-black mb-8">خبير تدريس الكيمياء للثانوية العامة</p>
                <p className="text-slate-600 font-bold text-lg leading-relaxed mb-10">
                  بخبرة تتجاوز الـ 15 عاماً، استطاع الأستاذ إسلام غنيم أن يضع بصمة فريدة في تعليم الكيمياء. من خلال أسلوبه المبتكر "الكيمياء بسكوته"، تمكن آلاف الطلاب من تجاوز عقبات المادة وتحقيق الدرجات النهائية بفضل التبسيط المستمر والمتابعة الدقيقة.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: <Award className="text-blue-600" size={24} />, label: 'خبرة تدريسية', value: '15+ سنة' },
                    { icon: <Users className="text-blue-600" size={24} />, label: 'طالب وطالبة', value: '50K+' },
                    { icon: <BookOpen className="text-blue-600" size={24} />, label: 'فيديو تعليمي', value: '200+' },
                    { icon: <Zap className="text-amber-500" size={24} />, label: 'تغطية المنهج', value: '100%' },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        <p className="text-xs text-slate-500 font-bold">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16">قيمنا الأساسية</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'التميز الأكاديمي', description: 'لا نرضى بأقل من الكمال في المحتوى العلمي الذي نقدمه لطلابنا.', icon: '🏆', color: 'bg-blue-50' },
              { title: 'الابتكار التقني', description: 'نستخدم أحدث منصات البث والاختبارات التفاعلية لضمان أفضل تجربة.', icon: '💡', color: 'bg-amber-50' },
              { title: 'دعم الطالب', description: 'الطالب هو محور اهتمامنا، وفريقنا متاح دائماً للإجابة على التساؤلات.', icon: '🤝', color: 'bg-emerald-50' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-10 rounded-[48px] hover:shadow-2xl transition-all"
              >
                <div className={`text-6xl mb-8 w-20 h-20 ${value.color} rounded-[32px] flex items-center justify-center mx-auto shadow-sm`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 font-bold leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[56px] p-16 text-center text-white relative shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2" />
          <h2 className="text-3xl md:text-5xl font-black mb-8">كن جزءاً من عائلة البسكوتات</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">ابدأ الآن رحلة التميز الدراسي واضمن الدرجة النهائية في الكيمياء مع مستر إسلام غنيم.</p>
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/courses')}
            className="px-12 py-5 rounded-2xl bg-white text-blue-700 font-black text-xl shadow-xl flex items-center gap-3 mx-auto transition-shadow hover:shadow-white/20"
          >
            تصفح الكورسات المتاحة
            <ChevronRight className={isRTL ? 'rotate-180' : ''} size={24} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}